import { Injectable, BadRequestException, NotFoundException, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, Not, IsNull, In, MoreThanOrEqual } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { SlotsService } from '../slots/slots.service';
import { DailySlotGenerationScheduler } from '../slots/daily-slot-generation.scheduler';
import { Worker } from '../workers/entities/worker.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';
import {
  BookingStatus,
  AssignmentState,
  BookingType,
} from './entities/booking.entity';
import { ServiceRequest } from '../service-requests/entities/service-request.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { SubscriptionWorkerSyncService } from '../subscriptions/subscription-worker-sync.service';

@Injectable()
export class BookingsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ServiceRequest)
    private serviceRequestsRepository: Repository<ServiceRequest>,
    private slotsService: SlotsService,
    private notificationsService: NotificationsService,
    private dataSource: DataSource,
    private subscriptionWorkerSyncService: SubscriptionWorkerSyncService,
    private dailySlotGenerationScheduler: DailySlotGenerationScheduler,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Running bootstrap slot generation first...');
    try {
      await this.dailySlotGenerationScheduler.handleHourlySlotGeneration();
    } catch (err: any) {
      this.logger.error(`Bootstrap slot generation failed: ${err.message}`);
    }

    this.logger.log('Running bootstrap check for assigned bookings with missing locked slots...');
    try {
      const todayStr = new Date().toISOString().split('T')[0];

      // 1. Sync future bookings for subscriptions that have assignedWorkerId set
      const subscriptions = await this.dataSource.getRepository(Subscription).find({
        where: {
          assignedWorkerId: Not(IsNull()),
        },
      });

      this.logger.log(`Bootstrap: Found ${subscriptions.length} subscriptions with assigned workers. Syncing worker assignments to all future bookings...`);

      for (const sub of subscriptions) {
        if (!sub.assignedWorkerId) continue;
        const workerId = sub.assignedWorkerId;

        const subBookings = await this.bookingsRepository.find({
          where: {
            subscriptionId: sub.id,
            status: In([BookingStatus.REQUESTED, BookingStatus.CONFIRMED]),
            date: MoreThanOrEqual(todayStr as any),
          },
        });

        const worker = await this.dataSource.getRepository(Worker).findOne({
          where: { id: workerId },
          relations: ['user'],
        });

        if (!worker) continue;

        for (const booking of subBookings) {
          if (!booking.workerId || !booking.slotId) {
            booking.worker = worker;
            booking.assignedWorkerId = workerId;
            booking.assignmentState = AssignmentState.ASSIGNED;

            try {
              if (booking.date && booking.startTime && booking.endTime) {
                const dateObj = new Date(booking.date);
                const parseTimeStr = (timeStr: string) => {
                  const parts = timeStr.split(':');
                  return {
                    hours: parseInt(parts[0], 10),
                    minutes: parseInt(parts[1] || '0', 10),
                  };
                };

                const startParsed = parseTimeStr(String(booking.startTime));
                const endParsed = parseTimeStr(String(booking.endTime));

                const startTimeDate = new Date(
                  dateObj.getFullYear(),
                  dateObj.getMonth(),
                  dateObj.getDate(),
                  startParsed.hours,
                  startParsed.minutes,
                  0,
                  0
                );

                const endTimeDate = new Date(
                  dateObj.getFullYear(),
                  dateObj.getMonth(),
                  dateObj.getDate(),
                  endParsed.hours,
                  endParsed.minutes,
                  0,
                  0
                );

                const slot = await this.slotsService.findAvailableSlotFlexible(
                  workerId,
                  startTimeDate,
                  endTimeDate,
                  true
                );

                if (slot) {
                  booking.slotId = slot.id;
                  booking.slot = slot;
                  await this.slotsService.bookSlotAtomic(slot.id);
                  this.logger.log(`Bootstrap: Locked slot ${slot.id} for subscription booking ${booking.id} under worker ${workerId}`);
                } else {
                  this.logger.warn(`Bootstrap: Could not find matching slot for worker ${workerId} on ${booking.date} at ${booking.startTime}`);
                }
              }
            } catch (slotErr: any) {
              this.logger.error(`Bootstrap: Error locking slot: ${slotErr.message}`);
            }

            await this.bookingsRepository.save(booking);
          }
        }
      }

      // 2. Lock any remaining one-off bookings that have a worker but no slotId
      const bookings = await this.bookingsRepository.find({
        where: {
          workerId: Not(IsNull()),
          slotId: IsNull(),
          status: In([BookingStatus.REQUESTED, BookingStatus.CONFIRMED]),
          date: MoreThanOrEqual(todayStr as any),
        },
      });

      this.logger.log(`Found ${bookings.length} remaining future bookings with assigned workers but missing slotIds.`);

      let lockedCount = 0;
      for (const booking of bookings) {
        if (booking.date && booking.startTime && booking.endTime && booking.workerId) {
          try {
            const dateObj = new Date(booking.date);
            const parseTimeStr = (timeStr: string) => {
              const parts = timeStr.split(':');
              return {
                hours: parseInt(parts[0], 10),
                minutes: parseInt(parts[1] || '0', 10),
              };
            };

            const startParsed = parseTimeStr(String(booking.startTime));
            const endParsed = parseTimeStr(String(booking.endTime));

            const startTimeDate = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              dateObj.getDate(),
              startParsed.hours,
              startParsed.minutes,
              0,
              0
            );

            const endTimeDate = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              dateObj.getDate(),
              endParsed.hours,
              endParsed.minutes,
              0,
              0
            );

            const slot = await this.slotsService.findAvailableSlotFlexible(
              booking.workerId,
              startTimeDate,
              endTimeDate,
              true
            );

            if (slot) {
              await this.bookingsRepository.update(booking.id, {
                slotId: slot.id,
              });
              await this.slotsService.bookSlotAtomic(slot.id);
              lockedCount++;
              this.logger.log(`Bootstrap: Locked slot ${slot.id} for booking ${booking.id} under worker ${booking.workerId}`);
            }
          } catch (err: any) {
            this.logger.error(`Bootstrap: Error processing booking ${booking.id}: ${err.message}`);
          }
        }
      }
      this.logger.log(`Bootstrap check complete: ${lockedCount} slots locked.`);
    } catch (error: any) {
      this.logger.error(`Bootstrap check failed: ${error.message}`);
    }
  }

  async findBestWorker(
    serviceId: string,
    userLat: number,
    userLng: number,
    startTime: Date,
    endTime: Date,
  ) {
    // Optimized query: Fetch workers with their users and services in a single JOIN query
    // This avoids N+1 query problem by loading all necessary data at once
    const workers = await this.workersRepository
      .createQueryBuilder('worker')
      .leftJoinAndSelect('worker.user', 'user')
      .leftJoinAndSelect('worker.services', 'services')
      .where('services.id = :serviceId', { serviceId: serviceId })
      .andWhere('user.latitude IS NOT NULL')
      .andWhere('user.longitude IS NOT NULL')
      .getMany();

    if (workers.length === 0) {
      throw new BadRequestException('No workers available for this service');
    }

    this.logger.log(`[findBestWorker] Checking ${workers.length} workers for service ${serviceId} from ${startTime.toISOString()} to ${endTime.toISOString()}`);

    // ✅ FIX: Check actual booking overlaps using time-range logic instead of only checking slot.isBooked.
    // The slot-based check was unreliable because a slot could be marked free while an active booking
    // already exists for the same worker at an overlapping time.
    const dateStr = startTime.toISOString().split('T')[0];
    const newStartTime = startTime.toTimeString().split(' ')[0]; // HH:mm:ss
    const newEndTime = endTime.toTimeString().split(' ')[0];     // HH:mm:ss

    // Batch check slot availability for all workers in a single query (kept for slot locking)
    const workerIds = workers.map((w) => w.id);
    const availableSlots = await this.slotsService.findAvailableSlotsForWorkers(
      workerIds,
      startTime,
      endTime,
    );
    const slotMap = new Map(availableSlots.map((s) => [s.workerId, s]));

    // Fetch all active bookings on the target date for all candidate workers in ONE query
    const activeBookingsOnDate = await this.bookingsRepository
      .createQueryBuilder('booking')
      .where('booking.workerId IN (:...workerIds)', { workerIds })
      .andWhere('booking.date = :dateStr', { dateStr })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [BookingStatus.REQUESTED, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS],
      })
      .getMany();

    // Build a map: workerId -> list of active bookings
    const bookingsByWorker = new Map<number, typeof activeBookingsOnDate>();
    for (const booking of activeBookingsOnDate) {
      if (!bookingsByWorker.has(booking.workerId)) {
        bookingsByWorker.set(booking.workerId, []);
      }
      bookingsByWorker.get(booking.workerId)!.push(booking);
    }

    // Helper: parse time strings like "17:30:00" to fractional hours for comparison
    const parseTimeToHours = (timeStr: string | Date): number => {
      if (timeStr instanceof Date) {
        return timeStr.getHours() + timeStr.getMinutes() / 60 + timeStr.getSeconds() / 3600;
      }
      if (typeof timeStr === 'string' && timeStr.includes('T')) {
        const d = new Date(timeStr);
        return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
      }
      const parts = String(timeStr).split(':');
      return parseInt(parts[0] || '0', 10) + parseInt(parts[1] || '0', 10) / 60 + parseInt(parts[2] || '0', 10) / 3600;
    };

    const reqStart = parseTimeToHours(newStartTime);
    const reqEnd = parseTimeToHours(newEndTime);

    // Score each worker — skip any with booking overlaps
    const scoredWorkers = workers.map((worker) => {
      const user = worker.user;
      if (!user.latitude || !user.longitude) {
        this.logger.log(`[findBestWorker] Worker ${worker.id} rejected: Missing GPS coordinates`);
        return null;
      }

      // ✅ CRITICAL: Check for real booking overlaps using the canonical interval overlap formula:
      // existingStart < newEnd AND existingEnd > newStart
      const workerBookings = bookingsByWorker.get(worker.id) || [];
      for (const existing of workerBookings) {
        const existStart = parseTimeToHours(existing.startTime);
        const existEnd = parseTimeToHours(existing.endTime);
        // Strict overlap: if existing starts before new ends AND existing ends after new starts
        if (existStart < reqEnd && existEnd > reqStart) {
          this.logger.log(
            `[findBestWorker] Worker ${worker.id} rejected: Overlaps booking #${existing.id} ` +
            `(${existing.startTime} - ${existing.endTime}) with requested (${newStartTime} - ${newEndTime})`
          );
          return null;
        }
      }

      // Also verify a free slot exists for this worker (needed for slot locking)
      const availableSlot = slotMap.get(worker.id);
      if (!availableSlot) {
        this.logger.log(`[findBestWorker] Worker ${worker.id} rejected: No free slot found for this time window`);
        return null;
      }

      // Calculate distance (Haversine formula)
      const distance = this.calculateDistance(
        userLat,
        userLng,
        user.latitude,
        user.longitude,
      );

      // Calculate score (lower is better)
      const distanceScore = distance * 0.4;                              // 40% weight
      const ratingScore = (5 - worker.rating) * 10 * 0.3;              // 30% weight (invert rating)
      const reviewScore = (100 - Math.min(worker.reviewCount, 100)) * 0.3; // 30% weight
      const totalScore = distanceScore + ratingScore + reviewScore;

      this.logger.log(`[findBestWorker] Worker ${worker.id} → Available. Score: ${totalScore.toFixed(2)}, Distance: ${distance.toFixed(2)} km`);

      return {
        worker,
        distance,
        score: totalScore,
        slot: availableSlot,
      };
    });

    // Filter out unavailable workers and sort by score
    const availableWorkers = scoredWorkers
      .filter((w) => w !== null)
      .sort((a, b) => a!.score - b!.score);

    if (availableWorkers.length === 0) {
      this.logger.warn(`[findBestWorker] No available workers for service ${serviceId} at ${newStartTime} - ${newEndTime} on ${dateStr}`);
      throw new BadRequestException(
        'No workers available at the requested time',
      );
    }

    this.logger.log(`[findBestWorker] Selected Worker ID: ${availableWorkers[0]!.worker.id}`);
    return availableWorkers[0]; // Return best match
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async create(createBookingDto: any) {
    try {
      let worker: Worker | null = null;

      // If serviceRequestId is provided, validate it exists and retrieve details
      if (createBookingDto.serviceRequestId) {
        // Check if serviceRequestId is a UUID (publicId) or numeric id
        let serviceRequest;
        if (
          createBookingDto.serviceRequestId.length === 36 &&
          createBookingDto.serviceRequestId.includes('-')
        ) {
          // It's a UUID (publicId)
          serviceRequest = await this.serviceRequestsRepository.findOne({
            where: { publicId: createBookingDto.serviceRequestId },
            relations: ['user', 'service'],
          });
        } else {
          // It's a string id (UUID)
          serviceRequest = await this.serviceRequestsRepository.findOne({
            where: { id: createBookingDto.serviceRequestId },
            relations: ['user', 'service'],
          });
        }

        if (!serviceRequest) {
          throw new BadRequestException('Service request not found');
        }

        // Validate service request is not in FAILED_TO_ASSIGN state before creating booking
        if (serviceRequest.assignmentStatus === 'FAILED_TO_ASSIGN') {
          throw new BadRequestException(
            'Service request failed to assign a worker. Please try again.',
          );
        }

        // Populate booking with service request details
        createBookingDto.serviceRequestId = serviceRequest.id; // Use UUID
        
        // ✅ FIX: Convert numeric user id to UUID publicId
        // serviceRequest.userId is INTEGER (from service_requests table), we need UUID for booking user reference
        const serviceUser = await this.usersRepository.findOne({
          where: { id: serviceRequest.userId }
        });
        
        if (!serviceUser) {
          throw new BadRequestException('User associated with service request not found');
        }
        
        createBookingDto.userId = serviceUser.publicId; // Now using proper UUID publicId
        createBookingDto.serviceId = serviceRequest.serviceId;
        createBookingDto.workerId = serviceRequest.assignedWorkerId || serviceRequest.metadata?.preferredWorkerId;
        createBookingDto.slotId = serviceRequest.assignedSlotId;
        
        // Use priceSnapshot from service request for booking amount
        createBookingDto.amount = serviceRequest.priceSnapshot || createBookingDto.amount;
        
        // Extract just the date portion (YYYY-MM-DD) from the service request date
        if (serviceRequest.date) {
          const serviceReqDate = new Date(serviceRequest.date);
          // Keep as Date object for DTO validation
          createBookingDto.date = new Date(serviceReqDate.toISOString().split('T')[0] + 'T00:00:00.000Z');
        } else {
          createBookingDto.date = serviceRequest.date;
        }

        // Parse time window to get start and end times
        let startHour: number;
        let endHour: number;

        switch (serviceRequest.timeWindow.toLowerCase()) {
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

        // Set default times based on time window
        const date = new Date(serviceRequest.date);
        createBookingDto.startTime = new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            startHour,
            0,
            0,
            0,
          ),
        );
        createBookingDto.endTime = new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            endHour,
            0,
            0,
            0,
          ),
        );
      } else {
        // Validate user exists (using publicId since userId is UUID)
        const user = await this.usersRepository.findOne({
          where: { publicId: createBookingDto.userId },
        });
        if (!user) {
          throw new BadRequestException('User not found');
        }

        // Validate service exists
        const service = await this.servicesRepository.findOne({
          where: { id: createBookingDto.serviceId },
        });
        if (!service) {
          throw new BadRequestException('Service not found');
        }

        // Validate worker exists if workerId is provided
        if (createBookingDto.workerId) {
          worker = await this.workersRepository.findOne({
            where: { id: createBookingDto.workerId },
            relations: ['user', 'services'],
          });
          if (!worker) {
            throw new BadRequestException('Worker not found');
          }
        }

        // Validate time range (handle both Date objects and time strings)
        const parseTimeToCompare = (time: string | Date): number => {
          if (typeof time === 'string') {
            if (time.includes('T')) {
              // ISO datetime string
              return new Date(time).getTime();
            }
            // Time string HH:mm:ss - compare as hours only
            const parts = time.split(':');
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1] || '0', 10);
            return hours * 60 + minutes;
          }
          return time.getTime();
        };

        if (
          parseTimeToCompare(createBookingDto.startTime) >=
          parseTimeToCompare(createBookingDto.endTime)
        ) {
          throw new BadRequestException('Start time must be before end time');
        }

        // Validate time is in future (only for datetime, not time-only)
        const now = new Date();
        if (
          typeof createBookingDto.startTime === 'string' &&
          createBookingDto.startTime.includes('T') &&
          new Date(createBookingDto.startTime) <= now
        ) {
          throw new BadRequestException('Start time must be in the future');
        }
      }

      // Create service request (intent only) - never fail due to worker availability
      let workerToAssign: Worker | null = null;
      if (createBookingDto.workerId) {
        if (worker) {
          // Reuse the worker object fetched during validation
          workerToAssign = worker;
        } else {
          // If worker wasn't fetched during validation (e.g., serviceRequestId was provided), fetch it now
          workerToAssign = await this.workersRepository.findOne({
            where: { id: createBookingDto.workerId },
            relations: ['user', 'services'],
          });
        }
      }

      // Calculate amount if not provided
      let amount = createBookingDto.amount;
      this.logger.debug(`create: Initial amount from DTO = ${amount}`);
      if (!amount) {
        const service = await this.servicesRepository.findOne({
          where: { id: createBookingDto.serviceId },
        });

        this.logger.debug(`create: Service found = ${service ? service.id : 'null'}`);
        this.logger.debug(`create: Service basePrice = ${service?.basePrice}`);

        if (service) {
          const basePrice = parseFloat(service.basePrice.toString());

          // Parse time string to calculate duration
          const parseTimeToHours = (timeStr: string | Date): number => {
            if (typeof timeStr === 'string') {
              if (timeStr.includes('T')) {
                // ISO datetime string
                const date = new Date(timeStr);
                return date.getHours() + date.getMinutes() / 60;
              }
              // Time format is HH:mm:ss or HH:mm
              const parts = timeStr.split(':');
              const hours = parseInt(parts[0], 10);
              const minutes = parseInt(parts[1] || '0', 10);
              return hours + minutes / 60;
            }
            return timeStr.getHours() + timeStr.getMinutes() / 60;
          };

          const startHours = parseTimeToHours(createBookingDto.startTime);
          const endHours = parseTimeToHours(createBookingDto.endTime);
          const durationHours = Math.max(0, endHours - startHours);

          // Flat rate pricing for one-time bookings
          // Time slot is for worker availability, not billing duration
          amount = basePrice;
        } else {
          amount = 0;
        }
      }

      // Parse time string to ensure it's in HH:mm:ss format for PostgreSQL
      const parseTimeForStorage = (time: string | Date): string => {
        if (typeof time === 'string') {
          if (time.includes('T')) {
            // ISO datetime string - extract time portion
            return new Date(time).toTimeString().split(' ')[0];
          }
          // Already a time string (HH:mm:ss)
          return time;
        }
        return time.toTimeString().split(' ')[0];
      };

      // Generate OTP for ON_DEMAND bookings
      let generatedOtp = null;
      const bookingType = createBookingDto.type || BookingType.ON_DEMAND;
      if (bookingType === BookingType.ON_DEMAND) {
        generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
      }

      const bookingData = {
        ...createBookingDto,
        status: BookingStatus.REQUESTED,
        worker: workerToAssign,
        assignedWorkerId: createBookingDto.workerId,
        type: bookingType,
        amount: amount,
        totalAmount: amount, // Set totalAmount to the same as amount
        otp: generatedOtp,
        isOtpVerified: false,
        assignmentState:
          createBookingDto.serviceRequestId || createBookingDto.workerId
            ? AssignmentState.ASSIGNED
            : AssignmentState.PENDING,
        // Parse to time string for PostgreSQL time type
        startTime: parseTimeForStorage(createBookingDto.startTime),
        endTime: parseTimeForStorage(createBookingDto.endTime),
        // FIX: Date handling - require date from service request or explicit date
        // Don't default to today's date silently
        date: (() => {
          // Priority 1: Use explicit date if provided
          if (createBookingDto.date) {
            const dateStr = typeof createBookingDto.date === 'string' 
              ? createBookingDto.date 
              : new Date(createBookingDto.date).toISOString().split('T')[0];
            return dateStr;
          }
          
          // Priority 2: Extract date from startTime if it's an ISO datetime string
          if (typeof createBookingDto.startTime === 'string' &&
              createBookingDto.startTime.includes('T')) {
            const dateStr = new Date(createBookingDto.startTime).toISOString().split('T')[0];
            return dateStr;
          }
          
          // Priority 3: Look up date from service request if serviceRequestId is provided
          if (createBookingDto.serviceRequestId) {
            // The date should have been set from service request earlier in this function (lines 192-199)
            // If we reach here, the service request might not have a valid date
          }
          
          // FIX: Throw error instead of defaulting to today's date
          // This ensures the bug is caught rather than silently showing wrong date
          const errorMsg = 'Date is required but could not be determined. Please provide a date or use a valid service request.';
          console.error('🔍 ERROR: Date handling -', errorMsg, 'createBookingDto:', JSON.stringify({
            date: createBookingDto.date,
            startTime: createBookingDto.startTime,
            serviceRequestId: createBookingDto.serviceRequestId
          }));
          throw new BadRequestException(errorMsg);
        })(),
        // Ensure we have service relation
        service: await this.servicesRepository.findOne({
          where: { id: createBookingDto.serviceId },
        }),
        // Ensure we have user relation (look up by publicId since userId is UUID)
        user: await this.usersRepository.findOne({
          where: { publicId: createBookingDto.userId },
        }),
        // Save guest FCM token if provided in the request
        guestFcmToken: createBookingDto.guestFcmToken || createBookingDto.guest_fcm_token || null,
      };

      // Prevent double booking for the same worker
      if (workerToAssign) {
        const overlappingBookings = await this.bookingsRepository.find({
          where: {
            workerId: workerToAssign.id,
            date: bookingData.date,
            status: In([BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS, BookingStatus.REQUESTED]),
          }
        });
        
        const parseTimeToHoursGlobal = (timeStr: string | Date): number => {
          if (typeof timeStr === 'string') {
            if (timeStr.includes('T')) {
              const date = new Date(timeStr);
              return date.getHours() + date.getMinutes() / 60;
            }
            const parts = timeStr.split(':');
            const hours = parseInt(parts[0] || '0', 10);
            const minutes = parseInt(parts[1] || '0', 10);
            return hours + minutes / 60;
          }
          return timeStr.getHours() + timeStr.getMinutes() / 60;
        };

        const newStart = parseTimeToHoursGlobal(bookingData.startTime);
        const newEnd = parseTimeToHoursGlobal(bookingData.endTime);

        for (const existing of overlappingBookings) {
          const existStart = parseTimeToHoursGlobal(existing.startTime);
          const existEnd = parseTimeToHoursGlobal(existing.endTime);

          // ✅ FIX: Use canonical interval overlap formula — existStart < newEnd AND existEnd > newStart.
          // The previous logic had gaps where partial overlaps (e.g., 5:30–6:30 vs 5:00–6:00) were missed
          // because it required the new start/end to be WITHIN (>=, <=) the existing range.
          if (existStart < newEnd && existEnd > newStart) {
            this.logger.warn(
              `[create] Double-booking blocked for worker ${workerToAssign.id}: ` +
              `existing booking (${existing.startTime}-${existing.endTime}) overlaps new (${bookingData.startTime}-${bookingData.endTime})`
            );
            throw new BadRequestException('This worker is already booked for the selected time slot.');
          }
        }
      }
      
      // Also prevent duplicate booking by same user for same service at exact same time
      const duplicateBookings = await this.bookingsRepository.find({
        where: {
          userId: bookingData.userId,
          serviceId: bookingData.serviceId,
          date: bookingData.date,
          startTime: bookingData.startTime,
          status: In([BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS, BookingStatus.REQUESTED]),
        }
      });
      
      if (duplicateBookings.length > 0) {
        throw new BadRequestException('You already have a booking for this service at the selected time.');
      }

      const booking = this.bookingsRepository.create(bookingData);

      const savedBooking = await this.bookingsRepository.save(booking);
      const bookingToReturn = Array.isArray(savedBooking)
        ? savedBooking[0]
        : savedBooking;

      // Booking saved

      // ============================================
      // NEW: Notify user (customer) about booking confirmation
      // ============================================
      try {
        // Load user with fcmToken
        // FIX: userId can be either numeric ID or UUID publicId
        const userIdValue = createBookingDto.userId;
        let user: User | null = null;
        
        if (typeof userIdValue === 'number' || !isNaN(Number(userIdValue))) {
          // It's a numeric ID
          user = await this.usersRepository.findOne({
            where: { id: Number(userIdValue) },
          });
        } else {
          // It's a UUID publicId
          user = await this.usersRepository.findOne({
            where: { publicId: userIdValue },
          });
        }
        
        if (user) {
          // Reload savedBooking with service relation for notification
          const savedBookingWithService = await this.bookingsRepository.findOne({
            where: { id: bookingToReturn.id },
            relations: ['service'],
          });
          
          if (savedBookingWithService) {
            await this.notificationsService.notifyUserBookingConfirmation(user, savedBookingWithService);
            this.logger.debug(`Customer notification sent successfully for booking ${bookingToReturn.id} to user ${user.id}`);
          } else {
            this.logger.warn(`Could not load booking with service for customer notification ${bookingToReturn.id}`);
          }
        } else {
          this.logger.warn(`Could not find user for customer notification, userId: ${userIdValue}`);
        }
      } catch (notifyError: unknown) {
        const errorMessage = notifyError instanceof Error ? notifyError.message : 'Unknown error';
        this.logger.error(`Failed to send customer notification: ${errorMessage}`);
        // Don't fail the booking if notification fails
      }

      // ============================================
      // ✅ Notify assigned worker about new booking
      // ============================================
      if (workerToAssign) {
        try {
          // Load worker with user relation to get fcmToken
          const workerWithUser = await this.workersRepository.findOne({
            where: { id: workerToAssign.id },
            relations: ['user']
          });
          
          if (workerWithUser?.user) {
            // Reload booking with service for notification
            const savedBookingWithService = await this.bookingsRepository.findOne({
              where: { id: bookingToReturn.id },
              relations: ['service'],
            });
            
            if (savedBookingWithService) {
              await this.notificationsService.notifyWorkerNewBooking(workerWithUser, savedBookingWithService);
              
              // Mark notification as sent in database
              await this.bookingsRepository.update(bookingToReturn.id, {
                notificationSent: true
              });
              
              this.logger.debug(`Worker notification sent successfully for booking ${bookingToReturn.id}`);
            }
          }
        } catch (workerNotifyError: unknown) {
          const errorMessage = workerNotifyError instanceof Error ? workerNotifyError.message : 'Unknown error';
          this.logger.error(`Failed to send worker notification: ${errorMessage}`);
          // Don't fail the booking if notification fails
        }
      }

      // FIX: Ensure assignmentState is correctly set for bookings with worker assigned
      // If worker is assigned but assignmentState is not ASSIGNED, update it
      if (bookingToReturn.workerId && bookingToReturn.assignmentState !== AssignmentState.ASSIGNED) {
        this.logger.debug(`Updating assignmentState from ${bookingToReturn.assignmentState} to ASSIGNED`);
        await this.bookingsRepository.update(bookingToReturn.id, {
          assignmentState: AssignmentState.ASSIGNED,
          status: BookingStatus.CONFIRMED,
        });
        bookingToReturn.assignmentState = AssignmentState.ASSIGNED;
        bookingToReturn.status = BookingStatus.CONFIRMED;
      }

      // Load the saved booking with relations to ensure all data is returned
      const fullBooking = await this.bookingsRepository.findOne({
        where: { id: bookingToReturn.id },
        relations: [
          'user',
          'worker',
          'service',
          'worker.user',
          'worker.services',
        ],
      });

      return fullBooking || bookingToReturn;
    } catch (error) {
      // Log the error for debugging
      if (error instanceof Error) {
        console.error('Booking creation error:', error.message, {
          userId: createBookingDto.userId,
          serviceId: createBookingDto.serviceId,
          startTime: createBookingDto.startTime,
          endTime: createBookingDto.endTime,
        });
      }

      // Re-throw the error with context
      throw error;
    }
  }

  async attemptAssignment(bookingId: string) {
    const booking = await this.bookingsRepository.findOne({
      where: { id: bookingId },
      relations: ['user', 'service'],
    });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    if (booking.status !== BookingStatus.REQUESTED) {
      throw new BadRequestException(
        'Assignment can only be attempted on REQUESTED bookings',
      );
    }

    // Find the best worker for this booking
    const user = booking.user;
    console.log('🔍 User data:', {
      id: user?.id,
      latitude: user?.latitude,
      longitude: user?.longitude,
      hasUser: !!user,
    });

    // Try to load user separately if relation didn't work
    const fullUser = await this.usersRepository.findOne({
      where: { publicId: booking.userId } as any,
    });
    this.logger.debug('🔍 Full user data:', {
      id: fullUser?.id,
      latitude: fullUser?.latitude,
      longitude: fullUser?.longitude,
      hasUser: !!fullUser,
    });

    // Use the user data (either from relation or separately loaded)
    const userData = fullUser || user;

    // Location fallback logic:
    // 1. First try user.profile location
    // 2. Then try service request metadata location
    // 3. Then try booking location
    let userLat = userData?.latitude;
    let userLng = userData?.longitude;

    this.logger.debug('🔍 Initial user location:', { userLat, userLng });

    // Fallback to service request location if user location is null
    // Need to fetch service request separately since relation may not work
    if (!userLat || !userLng) {
      // Try to get serviceRequest from relation first
      if (booking.serviceRequestId) {
        // Check if serviceRequest relation exists (it may not be loaded)
        const bookingWithServiceRequest = await this.bookingsRepository.findOne({
          where: { id: bookingId as any },
          relations: ['serviceRequest'],
        });
        const serviceRequest = bookingWithServiceRequest?.serviceRequest;

        if (serviceRequest?.metadata?.location) {
          const srLocation = serviceRequest.metadata.location;
          userLat = srLocation.lat;
          userLng = srLocation.lng;
          this.logger.debug('🔍 Using service request location:', { userLat, userLng });
        }
      }
    }

    // Fallback to booking location if still null
    if ((!userLat || !userLng) && booking.location) {
      userLat = booking.location.latitude;
      userLng = booking.location.longitude;
      this.logger.debug('🔍 Using booking location:', { userLat, userLng });
    }

    if (!userLat || !userLng) {
      throw new BadRequestException(
        'User location not available for matching',
      );
    }

    // Return with user data that has location
    return await this.attemptAssignmentWithUser(booking, userData);
  }

  private async attemptAssignmentWithUser(booking: Booking, user: User) {
    try {
      // Parse time strings to Date objects for slot availability check
      const parseTimeToDate = (
        time: string | Date,
        bookingDate: Date,
      ): Date => {
        if (typeof time === 'string' && !time.includes('T')) {
          // Time string HH:mm:ss - combine with booking date
          const parts = time.split(':');
          const hours = parseInt(parts[0], 10);
          const minutes = parseInt(parts[1] || '0', 10);
          const date = new Date(bookingDate);
          date.setHours(hours, minutes, 0, 0);
          return date;
        }
        return time instanceof Date ? time : new Date(time);
      };

      const startTimeDate = parseTimeToDate(
        booking.startTime,
        booking.date ? new Date(booking.date) : new Date(),
      );
      const endTimeDate = parseTimeToDate(
        booking.endTime,
        booking.date ? new Date(booking.date) : new Date(),
      );

      let bestMatch = null;
      if (booking.assignedWorkerId) {
        const slot = await this.slotsService.findAvailableSlotFlexible(
          booking.assignedWorkerId,
          startTimeDate,
          endTimeDate,
          true
        );
        if (slot) {
          const worker = await this.workersRepository.findOne({ where: { id: booking.assignedWorkerId } });
          if (worker) bestMatch = { worker, slot, score: 100 };
        }
        if (!bestMatch) {
          throw new BadRequestException('The selected worker is no longer available for this time slot.');
        }
      } else {
        bestMatch = await this.findBestWorker(
          booking.service.id.toString(),
          user.latitude,
          user.longitude,
          startTimeDate,
          endTimeDate,
        );
      }

      // ✅ Run slot booking + booking update inside transaction
      const savedBooking = await this.dataSource.transaction(async (transactionalEntityManager) => {
        // Book the slot atomically (prevents race conditions)
        const slotBookedResult = await this.slotsService.bookSlotAtomic((bestMatch.slot as any).id);
        if (!slotBookedResult.success) {
          // Slot was already booked by another concurrent request
          this.logger.warn(
            `Slot ${(bestMatch.slot as any).id} was already booked (race condition). Booking remains in REQUESTED state.`,
          );
          return booking;
        }

        try {
          // Update booking with assigned worker
          booking.worker = bestMatch.worker;
          booking.status = BookingStatus.PENDING; // Ready for confirmation
          booking.assignmentState = AssignmentState.ASSIGNED;
          booking.assignedWorkerId = bestMatch.worker.id;
          booking.assignmentTimestamp = new Date();
          booking.assignmentReason = 'Best match found';
          return await transactionalEntityManager.save(booking);
        } catch (bookingSaveError) {
          // ✅ Rollback slot booking if booking save fails
          this.logger.error(`Failed to save booking after slot was booked, releasing slot`, bookingSaveError);
          await this.slotsService.markAsAvailable((bestMatch.slot as any).id);
          throw bookingSaveError;
        }
      });

      // Sync worker assignment to parent subscription (break circular dependency)
      if (savedBooking.subscriptionId) {
        await this.subscriptionWorkerSyncService.syncWorkerToSubscription(
          savedBooking.subscriptionId,
          bestMatch.worker.id,
        );
      }

      // NOTE: Worker notification is intentionally NOT sent here.
      // The notification will be sent after payment is confirmed in payments.service.ts
      // This ensures workers only get notified about paid bookings.

      return savedBooking;
    } catch (error) {
      // Assignment failed - booking remains in REQUESTED state
      // This is not an error, just no workers available
      return booking;
    }
  }

  async createWithAssignment(createBookingDto: any) {
    // DEBUG: Log incoming amount
    this.logger.debug(`createWithAssignment: createBookingDto.amount = ${createBookingDto.amount}`);
    
    // Create service request first
    const savedBooking = await this.create(createBookingDto);
    
    // DEBUG: Log the created booking's amount
    this.logger.debug(`createWithAssignment: savedBooking.amount = ${savedBooking.amount}`);
    this.logger.debug(`createWithAssignment: savedBooking.totalAmount = ${savedBooking.totalAmount}`);

    // Attempt assignment asynchronously
    try {
      await this.attemptAssignment(savedBooking.id);
    } catch (error) {
      // Assignment failed, but booking was created successfully
      if (error instanceof Error) {
        this.logger.warn(
          `[Booking ${savedBooking.id}] Assignment attempt failed (booking still created): ${error.message}`
        );
      } else {
        this.logger.debug(`[Booking ${savedBooking.id}] Assignment attempt failed with unknown error type (booking still created)`);
      }
    }

    return savedBooking;
  }

  async findAll(userId?: string) {
    // Resolve userId: if it's a publicId (UUID), convert to numeric id
    let resolvedUserId: number | undefined;
    if (userId) {
      const resolved = await this.resolveUserId(userId);
      if (!resolved) {
        return [];
      }
      resolvedUserId = resolved;
    }

    const query = this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.worker', 'worker')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('worker.user', 'workerUser')
      .orderBy('booking.createdAt', 'DESC');

    if (resolvedUserId) {
      query.where('booking.userId = :userId', { userId: resolvedUserId });
    }

    const bookings = await query.getMany();
    
    // Serialize bookings to ensure amount field is properly returned
    return bookings.map(booking => this.serializeBooking(booking));
  }

  private serializeBooking(booking: any): any {
    if (!booking) return null;
    
    this.logger.debug('🔍 DEBUG serializeBooking: booking.totalAmount =', booking.totalAmount);
    this.logger.debug('🔍 DEBUG serializeBooking: booking.amount =', booking.amount);
    
    // FIX: Don't divide by 100 - frontend sends amount in rupees, not paise
    // Previously we were dividing by 100 which caused 1200 → 12 rupees
    return {
      id: booking.id,
      publicId: booking.publicId,
      userId: booking.userId,
      workerId: booking.workerId,
      serviceId: booking.serviceId,
      serviceRequestId: booking.serviceRequestId,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      totalAmount: booking.amount || booking.totalAmount || 0,
      amount: booking.amount || booking.totalAmount || 0,
      status: booking.status,
      isPaid: booking.isPaid,
      type: booking.type,
      notes: booking.notes,
      location: booking.location,
      createdAt: booking.createdAt,
      otp: booking.otp,
      isOtpVerified: booking.isOtpVerified,
      worker: booking.worker ? {
        id: booking.worker.id,
        publicId: booking.worker.publicId,
        rating: booking.worker.rating,
        reviewCount: booking.worker.reviewCount,
        bio: booking.worker.bio,
        user: booking.worker.user ? {
          id: booking.worker.user.id,
          publicId: booking.worker.user.publicId,
          firstName: booking.worker.user.firstName,
          lastName: booking.worker.user.lastName,
          email: booking.worker.user.email,
        } : null,
      } : null,
      service: booking.service ? {
        id: booking.service.id,
        publicId: booking.service.publicId,
        name: booking.service.name,
        description: booking.service.description,
        basePrice: booking.service.basePrice,
        category: booking.service.category,
      } : null,
      user: booking.user ? {
        id: booking.user.id,
        publicId: booking.user.publicId,
        firstName: booking.user.firstName,
        lastName: booking.user.lastName,
        email: booking.user.email,
        phone: booking.user.phone,
        address: booking.user.address,
        addresses: booking.user.addresses ? booking.user.addresses.map((addr: any) => ({
          id: addr.id,
          societyName: addr.societyName,
          towerNumber: addr.towerNumber,
          flatNumber: addr.flatNumber,
          landmark: addr.landmark,
          area: addr.area,
          city: addr.city,
          state: addr.state,
          pincode: addr.pincode,
          latitude: addr.latitude,
          longitude: addr.longitude,
          isDefault: addr.isDefault,
          label: addr.label,
        })) : [],
      } : null,
    };
  }

  async findOne(id: string) {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      select: ['id', 'publicId', 'userId', 'workerId', 'serviceId', 'serviceRequestId', 'date', 'startTime', 'endTime', 'totalAmount', 'amount', 'status', 'isPaid', 'type', 'notes', 'location', 'guestFcmToken', 'assignedWorkerId', 'createdAt', 'updatedAt', 'otp', 'isOtpVerified', 'startedAt'],
      relations: [
        'user',
        'user.addresses',
        'worker',
        'service',
        'worker.user',
        'worker.services',
      ],
    });

    if (!booking) {
      throw new BadRequestException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async update(id: string, updateBookingDto: any) {
    const booking = await this.findOne(id);

    // If updating the worker, ensure the worker exists
    if (updateBookingDto.workerId) {
      const worker = await this.workersRepository.findOne({
        where: { id: updateBookingDto.workerId },
      });
      if (!worker) {
        throw new BadRequestException('Worker not found');
      }
    }

    // If updating service, ensure the service exists
    if (updateBookingDto.serviceId) {
      const service = await this.servicesRepository.findOne({
        where: { id: updateBookingDto.serviceId },
      });
      if (!service) {
        throw new BadRequestException('Service not found');
      }
    }

    // Update the booking
    Object.assign(booking, updateBookingDto);
    return this.bookingsRepository.save(booking);
  }

  async cancel(id: string) {
    const booking = await this.findOne(id);

    // Only allow cancellation of REQUESTED or PENDING bookings
    if (
      booking.status !== BookingStatus.REQUESTED &&
      booking.status !== BookingStatus.PENDING
    ) {
      throw new BadRequestException(
        'Only REQUESTED or PENDING bookings can be cancelled',
      );
    }

    // ✅ Release booked slot when booking is cancelled
    if (booking.slotId) {
      try {
        await this.slotsService.markAsAvailable(booking.slotId);
        this.logger.log(`Released slot ${booking.slotId} for cancelled booking ${id}`);

        // Re-sync overlapping slot availability for remaining active bookings
        if (booking.workerId && booking.date) {
          const activeBookings = await this.bookingsRepository.find({
            where: {
              workerId: booking.workerId,
              date: booking.date,
              status: In([BookingStatus.REQUESTED, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS]),
            },
          });
          
          const activeIntervals = activeBookings
            .filter(b => b.startTime && b.endTime)
            .map(b => {
              const baseDate = new Date(b.date);
              
              const startParts = b.startTime.split(':');
              const start = new Date(baseDate);
              start.setHours(parseInt(startParts[0]), parseInt(startParts[1]), 0, 0);
              
              const endParts = b.endTime.split(':');
              const end = new Date(baseDate);
              end.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0, 0);
              
              return { startTime: start, endTime: end };
            });
            
          await this.slotsService.syncWorkerAvailability(
            booking.workerId,
            new Date(booking.date),
            activeIntervals
          );
        }
      } catch (slotError) {
        this.logger.warn(`Failed to release slot ${booking.slotId} for cancelled booking ${id}`, slotError);
        // Don't fail cancel operation if slot release fails
      }
    }

    booking.status = BookingStatus.CANCELLED;
    return this.bookingsRepository.save(booking);
  }

  async reschedule(
    id: string,
    newStartTime: string | Date,
    newEndTime: string | Date,
  ) {
    const booking = await this.findOne(id);

    // Only allow rescheduling of REQUESTED or PENDING bookings
    if (
      booking.status !== BookingStatus.REQUESTED &&
      booking.status !== BookingStatus.PENDING
    ) {
      throw new BadRequestException(
        'Only REQUESTED or PENDING bookings can be rescheduled',
      );
    }

    booking.startTime = newStartTime as any;
    booking.endTime = newEndTime as any;

    return this.bookingsRepository.save(booking);
  }

  async updateStatus(id: string, status: BookingStatus) {
    const booking = await this.findOne(id);
    booking.status = status;
    return this.bookingsRepository.save(booking);
  }

  async assignWorker(id: string, workerId: number) {
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      // ✅ Implement PESSIMISTIC WRITE LOCK to prevent race conditions
      // This ensures only one worker can modify this booking at a time
      const booking = await transactionalEntityManager.findOne(Booking, {
        where: { id },
        lock: { mode: 'pessimistic_write' }
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      // Validate booking is still unassigned
      if (booking.assignedWorkerId) {
        throw new BadRequestException('Booking has already been assigned to another worker');
      }

      // Validate worker exists
      const worker = await transactionalEntityManager.findOne(Worker, {
        where: { id: workerId },
        relations: ['user'],
      });

      if (!worker) {
        throw new BadRequestException('Worker not found');
      }

      // Log the worker's fcmToken for debugging
      this.logger.log(`Worker ${worker.id} FCM token: ${worker.fcmToken ? worker.fcmToken.substring(0, 30) + '...' : 'NULL'}`);

      booking.worker = worker;
      booking.assignedWorkerId = workerId;
      booking.assignmentState = AssignmentState.ASSIGNED;
      booking.assignmentTimestamp = new Date();
      booking.assignmentReason = 'Manual assignment by admin';

      // Lock and assign slot matching booking date and timeslot
      try {
        if (booking.date && booking.startTime && booking.endTime) {
          const dateObj = new Date(booking.date);
          const parseTimeStr = (timeStr: string) => {
            const parts = timeStr.split(':');
            return {
              hours: parseInt(parts[0], 10),
              minutes: parseInt(parts[1] || '0', 10),
            };
          };

          const startParsed = parseTimeStr(String(booking.startTime));
          const endParsed = parseTimeStr(String(booking.endTime));

          const startTimeDate = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            startParsed.hours,
            startParsed.minutes,
            0,
            0
          );

          const endTimeDate = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            endParsed.hours,
            endParsed.minutes,
            0,
            0
          );

          const slot = await this.slotsService.findAvailableSlotFlexible(
            workerId,
            startTimeDate,
            endTimeDate,
            true // Exact/flexible slot match only (skips same-day fallback)
          );

          if (slot) {
            booking.slotId = slot.id;
            booking.slot = slot;
            await this.slotsService.bookSlotAtomic(slot.id);
            this.logger.log(`Locked slot ${slot.id} for booking ${booking.id} under worker ${workerId}`);
          } else {
            this.logger.warn(`Could not find matching slot for worker ${workerId} on ${booking.date} at ${booking.startTime}`);
          }
        }
      } catch (slotErr: any) {
        this.logger.error(`Error locking slot during worker assignment: ${slotErr.message}`);
      }

      const savedBooking = await transactionalEntityManager.save(booking);

      // NOTE: Worker notification is intentionally NOT sent here.
      // The notification will be sent after payment is confirmed in payments.service.ts
      // This ensures workers only get notified about paid bookings.

      return savedBooking;
    });
  }

  // Missing methods for controller compatibility
  async findAllPaginated(
    userId?: string,
    workerId?: string,
    skip?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<[Booking[], number]> {
    // Resolve userId: if it's a publicId (UUID), convert to numeric id
    let resolvedUserId: number | undefined;
    if (userId) {
      const resolved = await this.resolveUserId(userId);
      if (!resolved) {
        // Return empty results if user not found
        return [[], 0];
      }
      resolvedUserId = resolved;
    }

    const query = this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('user.addresses', 'userAddresses')
      .leftJoinAndSelect('booking.worker', 'worker')
      .leftJoinAndSelect('booking.service', 'service');

    if (resolvedUserId) {
      query.andWhere('booking.userId = :userId', { userId: resolvedUserId });
    }

    if (workerId) {
      query.andWhere('booking.assignedWorkerId = :workerId', { workerId });
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.take(limit);
    }

    if (sortBy) {
      query.orderBy(`booking.${sortBy}`, sortOrder || 'DESC');
    } else {
      query.orderBy('booking.createdAt', 'DESC');
    }

    const [bookings, total] = await query.getManyAndCount();
    
    // Serialize bookings to ensure proper date/time formatting
    const serializedBookings = bookings.map(booking => this.serializeBooking(booking));
    
    return [serializedBookings, total];
  }

  async assignBooking(assignBookingDto: { bookingId: string; workerId: string }) {
    return this.assignWorker(assignBookingDto.bookingId, parseInt(assignBookingDto.workerId, 10));
  }

  async getBookingsByWorker(workerId: number) {
    return this.bookingsRepository.find({
      where: { assignedWorkerId: workerId },
      relations: ['user', 'user.addresses', 'service'],
      order: { createdAt: 'DESC' },
    });
  }



  async getPastBookings(userPublicId: string) {
    // Resolve userId: if it's a publicId (UUID), convert to numeric id
    const resolvedUserId = await this.resolveUserId(userPublicId);
    if (!resolvedUserId) {
      return [];
    }

    return this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('booking.worker', 'worker')
      .leftJoinAndSelect('worker.user', 'workerUser')
      .where('booking.userId = :userId', { userId: resolvedUserId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [
          BookingStatus.COMPLETED,
          BookingStatus.CANCELLED,
          BookingStatus.NO_SHOW,
        ],
      })
      .orderBy('booking.startTime', 'DESC')
      .getMany();
  }

  /**
   * Resolve user ID from various formats (publicId/UUID or numeric id)
   * @param userId - Could be publicId (UUID) or numeric id
   * @returns Numeric user id for database queries
   */
  private async resolveUserId(userId: string): Promise<number | null> {
    // If it's already a number, return it directly
    const numericId = parseInt(userId, 10);
    if (!isNaN(numericId)) {
      return numericId;
    }

    // If it's a UUID (publicId), look up the user to get numeric id
    try {
      const user = await this.usersRepository.findOneBy({ publicId: userId } as any);
      return user?.id ?? null;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error resolving userId: ${error.message}`);
      } else {
        this.logger.error(`Error resolving userId with unknown error type`);
      }
      return null;
    }
  }
}


