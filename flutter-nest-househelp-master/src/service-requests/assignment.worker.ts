import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRequest } from './entities/service-request.entity';
import { SlotsService } from '../slots/slots.service';
import { Worker } from '../workers/entities/worker.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';
import { ServiceProfilesService } from '../service-profiles/service-profiles.service';
import { ServiceType } from '../service-profiles/entities/service-profile.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { calculateDistance, toRadians } from '../common/geospatial.utils';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class AssignmentWorker {
  private readonly logger = new Logger(AssignmentWorker.name);

  constructor(
    private slotsService: SlotsService,
    @InjectRepository(ServiceRequest)
    private serviceRequestsRepository: Repository<ServiceRequest>,
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private serviceProfilesService: ServiceProfilesService,
    private notificationsService: NotificationsService,
    private configService: ConfigService,
  ) {}

  async processAssignment(requestId: string): Promise<void> {
    try {
      const request = await this.serviceRequestsRepository.findOne({
        where: { id: requestId },
      });

      // CRITICAL: Ensure idempotent markAsFailed
      if (!request || request.assignmentStatus !== 'REQUESTED') {
        this.logger.log(
          `Request ${requestId} already processed or not found, skipping`,
        );
        return; // Already processed
      }

      this.logger.log(`Processing assignment for request ${requestId}`);

      const location = request.metadata?.location;

      // Use location from request or fallback to default coordinates
      const userLat = location?.lat ?? this.configService.get<number>('defaultLocation.lat', 28.5804579);
      const userLng = location?.lng ?? this.configService.get<number>('defaultLocation.lng', 77.4392951);

      // Parse time window to get start and end times
      const { startTime, endTime } = this.parseTimeWindow(
        request.date,
        request.timeWindow,
      );

      // Find best worker using service request-specific logic
      let serviceId = request.serviceId;

      if (!serviceId && request.serviceProfileId) {
        // Map service profile to service using service type
        const serviceProfile = await this.serviceProfilesService.getProfileById(
          request.serviceProfileId,
        );
        if (serviceProfile) {
          // Map service type to service category
          const categoryMap: { [key in ServiceType]: string } = {
            [ServiceType.COOK]: 'Cooking',
            [ServiceType.MAID]: 'Maid',
            [ServiceType.CLEANING]: 'Cleaning',
          };

          const category = categoryMap[serviceProfile.serviceType];
          if (category) {
            // Find first service matching the category
            const services = await this.servicesRepository.find({
              where: { category },
              take: 1,
            });

            if (services.length > 0) {
              serviceId = services[0].id;
              this.logger.log(
                `Mapped service profile ${request.serviceProfileId} (${serviceProfile.serviceType}) to service ${serviceId}`,
              );
            }
          }
        }
      }

      // If no serviceId and no valid mapping from serviceProfileId, this is an error
      // Do NOT default to Cleaning - this causes workers to get wrong service assignments
      if (!serviceId || serviceId === 0) {
        this.logger.error(`No valid serviceId found for request ${requestId}. serviceId: ${serviceId}, serviceProfileId: ${request.serviceProfileId}`);
        await this.serviceRequestsRepository.update(requestId, {
          assignmentStatus: 'FAILED_TO_ASSIGN',
          failureReason: 'No valid service specified for assignment',
          assignedWorkerId: null,
          assignedSlotId: null,
        });
        return; // Stop processing - don't default to Cleaning
      }

      const isGranularSlot =
        request.timeWindow.toLowerCase().includes('am') ||
        request.timeWindow.toLowerCase().includes('pm');

      const bestWorker = await this.findBestWorker(
        serviceId,
        userLat,
        userLng,
        startTime,
        endTime,
        isGranularSlot,
      );

      if (!bestWorker) {
        await this.serviceRequestsRepository.update(requestId, {
          assignmentStatus: 'FAILED_TO_ASSIGN',
          failureReason: 'No professional available',
          assignedWorkerId: null,
          assignedSlotId: null,
        });
        this.logger.log(
          `Failed to assign worker to request ${requestId}: No professional available`,
        );
        return;
      }

      // Mark as assigned
      await this.serviceRequestsRepository.update(requestId, {
        assignmentStatus: 'ASSIGNED',
        assignedWorkerId: bestWorker.worker.id,
        assignedSlotId: bestWorker.slot.id,
        failureReason: null,
      });

      this.logger.log(
        `Successfully assigned worker ${bestWorker.worker.id} to request ${requestId}`,
      );

      // NOTE: Worker notification is intentionally NOT sent here.
      // The notification will be sent after payment is confirmed in payments.service.ts
      // This ensures workers only get notified about paid bookings.
    } catch (error) {
      this.logger.error(
        `Error processing assignment for request ${requestId}: ${error.message}`,
      );
      await this.serviceRequestsRepository.update(requestId, {
        assignmentStatus: 'FAILED_TO_ASSIGN',
        failureReason: error.message,
        assignedWorkerId: null,
        assignedSlotId: null,
      });
    }
  }

  /**
   * Send push notification to worker about new booking assignment
   */
  private async _notifyWorkerOfAssignment(
    worker: Worker,
    request: ServiceRequest,
  ): Promise<void> {
    if (!worker.fcmToken) {
      this.logger.warn(
        `Worker ${worker.id} has no FCM token, skipping notification`,
      );
      return;
    }

    const service = await this.servicesRepository.findOne({
      where: { id: request.serviceId as number },
    });
    const serviceName = service?.name || 'Service';
    const requestDate = new Date(request.date).toLocaleDateString('en-IN');

    const title = 'नई बुकिंग मिली! 🎉';
    const body = `${serviceName} - ${requestDate} को। ग्राहक का पता और विवरण देखने के लिए ऐप खोलें।`;

    try {
      await this.notificationsService.sendPushNotification(
        worker.fcmToken,
        title,
        body,
      );
      this.logger.log(
        `Sent push notification to worker ${worker.id} for request ${request.id}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send push notification to worker ${worker.id}: ${error.message}`,
      );
    }
  }

  private parseTimeWindow(
    date: Date,
    timeWindow: string,
  ): { startTime: Date; endTime: Date } {
    let startHour = 8;
    let startMinute = 0;
    let endHour = 12;
    let endMinute = 0;

    const timeWindowClean = timeWindow.trim().toLowerCase();

    if (timeWindowClean.includes('am') || timeWindowClean.includes('pm')) {
      const parts = timeWindowClean.split('-');
      const startStr = parts[0].trim();
      const endStr = parts[1] ? parts[1].trim() : null;

      const parseTimeStr = (str: string) => {
        const isPM = str.includes('pm');
        const cleanStr = str.replace('am', '').replace('pm', '').trim();
        const timeParts = cleanStr.split(':');
        let hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1] || '0', 10);

        if (isPM && hours < 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        return { hours, minutes };
      };

      try {
        const start = parseTimeStr(startStr);
        startHour = start.hours;
        startMinute = start.minutes;

        if (endStr) {
          const end = parseTimeStr(endStr);
          endHour = end.hours;
          endMinute = end.minutes;
        } else {
          endHour = startHour + 1;
          endMinute = startMinute;
        }
      } catch (err) {
        this.logger.warn(`Failed to parse granular timeWindow: ${timeWindow}, defaulting.`);
      }
    } else {
      switch (timeWindowClean) {
        case 'morning':
          startHour = 8;
          endHour = 12;
          break;
        case 'afternoon':
          startHour = 12;
          endHour = 17;
          break;
        case 'evening':
          startHour = 17;
          endHour = 21;
          break;
        case 'early-morning':
          startHour = 2;
          endHour = 11;
          break;
        default:
          startHour = 8;
          endHour = 12;
      }
    }

    const startTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startHour,
      startMinute,
      0,
      0,
    );

    const endTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      endHour,
      endMinute,
      0,
      0,
    );

    return { startTime, endTime };
  }

  // Enhanced worker matching logic with REAL booking overlap detection
  private async findBestWorker(
    serviceId: number,
    userLat: number,
    userLng: number,
    startTime: Date,
    endTime: Date,
    isGranularSlot: boolean = false,
  ) {
    this.logger.log('🔍 Starting worker search for service:', serviceId);
    this.logger.log('📍 User location:', { lat: userLat, lng: userLng });
    this.logger.log('⏰ Requested time:', { start: startTime, end: endTime });

    // Find all workers who offer this service
    const workers = await this.workersRepository.find({
      where: {
        services: { id: serviceId },
        isActive: true,
        isAvailable: true,
      },
      relations: ['user', 'services'],
    });

    this.logger.log('👷 Found workers for service:', workers.length);

    if (workers.length === 0) {
      this.logger.log('❌ No workers found for service');
      return null;
    }

    // ✅ FIX: Batch-load all active bookings for ALL candidate workers on the target date
    // in a SINGLE query to avoid N+1 queries and apply real overlap detection.
    const dateStr = startTime.toISOString().split('T')[0];
    const workerIds = workers.map((w) => w.id);

    // Fetch all active bookings for these workers on this date
    // ✅ FIX: Use imported Entity class 'Booking' instead of string 'bookings' to prevent TypeORM metadata lookup error.
    const activeBookings = await this.serviceRequestsRepository.manager
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .where('booking.workerId IN (:...workerIds)', { workerIds })
      .andWhere('booking.date = :dateStr', { dateStr })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: ['REQUESTED', 'CONFIRMED', 'IN_PROGRESS'],
      })
      .getMany();

    // Build a map: workerId -> active bookings
    const bookingsByWorker = new Map<number, any[]>();
    for (const booking of activeBookings) {
      const wid = booking.workerId;
      if (!bookingsByWorker.has(wid)) bookingsByWorker.set(wid, []);
      bookingsByWorker.get(wid)!.push(booking);
    }

    // Helper: parse "HH:MM:SS" or ISO string or Date to fractional hours
    // ✅ FIX: Use local time (getHours/getMinutes) instead of getUTCHours/getUTCMinutes.
    // The previous implementation used UTC, causing a mismatch with existing bookings and incorrect rejections.
    const parseToHours = (t: string | Date): number => {
      if (t instanceof Date) {
        return t.getHours() + t.getMinutes() / 60;
      }
      if (typeof t === 'string' && t.includes('T')) {
        const d = new Date(t);
        return d.getHours() + d.getMinutes() / 60;
      }
      const parts = String(t).split(':');
      return parseInt(parts[0] || '0', 10) + parseInt(parts[1] || '0', 10) / 60;
    };

    // ✅ Requested window in fractional hours
    const reqStart = parseToHours(startTime);
    const reqEnd = parseToHours(endTime);

    // Score each worker
    const scoredWorkers = await Promise.all(
      workers.map(async (worker) => {
        const user = worker.user;
        if (!user) {
          this.logger.log(`⚠️ Worker ${worker.id} has no associated user`);
          return null;
        }

        // Enhanced location fallback logic
        let workerLat = worker.currentLat;
        let workerLng = worker.currentLng;

        if (!workerLat || !workerLng) {
          workerLat = worker.latitude;
          workerLng = worker.longitude;
        }
        if (!workerLat || !workerLng) {
          workerLat = user.latitude;
          workerLng = user.longitude;
        }
        if (!workerLat || !workerLng) {
          this.logger.log(`❌ Skipping worker ${worker.id} - no location data available`);
          return null;
        }

        // Calculate distance
        const distance = this.calculateDistance(userLat, userLng, workerLat, workerLng);
        this.logger.log(`📏 Worker ${worker.id} distance: ${distance.toFixed(2)}km`);

        const maxRadius = this.configService.get<number>('assignment.maxRadius', 15);
        if (distance > maxRadius) {
          this.logger.log(`❌ Worker ${worker.id} too far (${distance.toFixed(2)}km > ${maxRadius}km)`);
          return null;
        }

        // ✅ CRITICAL FIX: Check for actual booking overlaps using canonical interval formula.
        // existingStart < newEnd  AND  existingEnd > newStart  → CONFLICT
        const workerBookings = bookingsByWorker.get(worker.id) || [];
        for (const existing of workerBookings) {
          const existStart = parseToHours(existing.startTime);
          const existEnd = parseToHours(existing.endTime);

          if (existStart < reqEnd && existEnd > reqStart) {
            this.logger.warn(
              `❌ Worker ${worker.id} rejected: Active booking conflict ` +
              `(${existing.startTime} - ${existing.endTime}) overlaps requested (${reqStart}h - ${reqEnd}h)`
            );
            return null; // Skip this worker immediately
          }
        }

        // Check slot availability for slot-locking purposes
        this.logger.log(
          `🔍 Checking slot for worker ${worker.id} startTime=${startTime.toISOString()}, endTime=${endTime.toISOString()}, exactMatch=${isGranularSlot}`,
        );

        let availableSlot = await this.slotsService.findAvailableSlotFlexible(
          worker.id,
          startTime,
          endTime,
          isGranularSlot,
        );

        if (!availableSlot && !isGranularSlot) {
          this.logger.log(`❌ Worker ${worker.id} not available for requested time, trying same-day fallback...`);

          const requestedDate = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
          const nextDay = new Date(requestedDate);
          nextDay.setDate(requestedDate.getDate() + 1);

          const sameDaySlots = await this.slotsService.getAvailableSlotsForWorker(worker.id, requestedDate, nextDay);

          if (sameDaySlots.length > 0) {
            this.logger.log(`✅ Worker ${worker.id} found with same-day alternative slot`);
            availableSlot = sameDaySlots[0];
          }
        }

        if (!availableSlot) {
          this.logger.log(`❌ Worker ${worker.id} not available with any strategy`);
          return null;
        }

        // Calculate score with adjusted weights
        const distanceScore = distance * 0.3;                              // 30% weight
        const ratingScore = (5 - worker.rating) * 8 * 0.4;               // 40% weight
        const reviewScore = (100 - Math.min(worker.reviewCount, 100)) * 0.3; // 30% weight
        const totalScore = distanceScore + ratingScore + reviewScore;

        this.logger.log(
          `✅ Worker ${worker.id} scored: ${totalScore.toFixed(2)} (distance: ${distance.toFixed(2)}km, rating: ${worker.rating})`,
        );

        return { worker, distance, score: totalScore, slot: availableSlot };
      }),
    );

    // Filter out unavailable workers and sort by score
    const availableWorkers = scoredWorkers
      .filter((w) => w !== null)
      .sort((a, b) => a!.score - b!.score);

    this.logger.log('🏆 Available workers after scoring:', availableWorkers.length);

    if (availableWorkers.length === 0) {
      this.logger.log('❌ No workers available after all filters');
      return null;
    }

    return availableWorkers[0]; // Return best match
  }


  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    return calculateDistance(lat1, lon1, lat2, lon2);
  }

  private deg2rad(deg: number): number {
    return toRadians(deg);
  }
}
