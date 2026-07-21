import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan, MoreThan, DataSource } from 'typeorm';
import { Slot } from './entities/slot.entity';
import { Worker } from '../workers/entities/worker.entity';

@Injectable()
export class SlotsService {
  private readonly logger = new Logger(SlotsService.name);

  constructor(
    @InjectRepository(Slot)
    private slotsRepository: Repository<Slot>,
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return this.slotsRepository.find({ relations: ['worker'] });
  }

  /**
   * Find all available (unbooked) slots
   */
  async findAvailable(): Promise<Slot[]> {
    return this.slotsRepository.find({
      where: { isBooked: false },
      relations: ['worker'],
      order: { startTime: 'ASC' },
    });
  }

  /**
   * Find available slots for a specific date and optional serviceId
   */
  async findAvailableByDate(date: Date, serviceId?: number, workerId?: number): Promise<Slot[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const qb = this.slotsRepository.createQueryBuilder('slot')
      .leftJoinAndSelect('slot.worker', 'worker')
      .where('slot.startTime BETWEEN :start AND :end', { start: startOfDay, end: endOfDay })
      .andWhere('slot.isBooked = :isBooked', { isBooked: false })
      .orderBy('slot.startTime', 'ASC');

    if (serviceId) {
      qb.innerJoin('worker.services', 'service', 'service.id = :serviceId', { serviceId });
    }
    
    if (workerId) {
      qb.andWhere('worker.id = :workerId', { workerId });
    }

    return qb.getMany();
  }

  async findOne(id: number) {
    return this.slotsRepository.findOne({
      where: { id },
      relations: ['worker'],
    });
  }

  async findAvailableSlot(
    workerId: number,
    startTime: Date,
    endTime: Date,
  ): Promise<Slot | null> {
    this.logger.log(
      `Finding available slot for workerId: ${workerId} (type: ${typeof workerId})`,
    );
    return this.slotsRepository.findOne({
      where: {
        worker: { id: workerId },
        startTime,
        endTime,
        isBooked: false,
      },
    });
  }

  async findBookedSlot(
    workerId: number,
    startTime: Date,
    endTime: Date,
  ): Promise<Slot | null> {
    return this.slotsRepository.findOne({
      where: {
        worker: { id: workerId },
        startTime,
        endTime,
        isBooked: true,
      },
    });
  }

  /**
   * Find available slot with flexible time matching
   * This method allows for flexible time matching to improve worker availability
   */
  async findAvailableSlotFlexible(
    workerId: number,
    requestedStartTime: Date,
    requestedEndTime: Date,
    disableSameDayFallback: boolean = false,
  ): Promise<Slot | null> {
    this.logger.log(
      `Finding flexible slot for worker ${workerId} from ${requestedStartTime} to ${requestedEndTime} (disableSameDayFallback: ${disableSameDayFallback})`,
    );
    
    // DEBUG: Log timezone info
    this.logger.log(
      `🔍 DEBUG: requestedStartTime ISO: ${requestedStartTime.toISOString()}, local: ${requestedStartTime.toString()}`,
    );

    try {
      // DEBUG: Log all slots for this worker on this day to see what's actually available
      const startOfDay = new Date(requestedStartTime);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(requestedStartTime);
      endOfDay.setHours(23, 59, 59, 999);
      
      const allSlotsToday = await this.slotsRepository.find({
        where: {
          worker: { id: workerId },
          startTime: Between(startOfDay, endOfDay),
        }
      });
      
      this.logger.log(`🔍 DEBUG: Worker ${workerId} has ${allSlotsToday.length} slots today. First slot: ${allSlotsToday.length > 0 ? allSlotsToday[0].startTime.toISOString() + ' to ' + allSlotsToday[0].endTime.toISOString() : 'none'}`);

      // 1. First try exact match
      const exactMatch = await this.findAvailableSlot(
        workerId,
        requestedStartTime,
        requestedEndTime,
      );
      if (exactMatch) {
        this.logger.log(`Found exact match for worker ${workerId}`);
        return exactMatch;
      }

      // 2. Try to find slots with flexible time matching
      // Allow up to 30 minutes flexibility in start time
      const flexibilityMinutes = 30;
      const startTimeWindow = {
        start: new Date(
          requestedStartTime.getTime() - flexibilityMinutes * 60000,
        ),
        end: new Date(
          requestedStartTime.getTime() + flexibilityMinutes * 60000,
        ),
      };

      // Find available slots within the time window
      this.logger.log(
        `🔍 DEBUG: Querying slots with Between ${startTimeWindow.start.toISOString()} and ${startTimeWindow.end.toISOString()}`,
      );
      const flexibleSlots = await this.slotsRepository.find({
        where: {
          worker: { id: workerId },
          startTime: Between(startTimeWindow.start, startTimeWindow.end),
          isBooked: false,
        },
        order: {
          startTime: 'ASC',
        },
      });

      this.logger.log(
        `🔍 DEBUG: Found ${flexibleSlots.length} slots for worker ${workerId} in flexible search`,
      );

      if (flexibleSlots.length > 0) {
        this.logger.log(
          `Found ${flexibleSlots.length} flexible slots for worker ${workerId}`,
        );
        return flexibleSlots[0]; // Return the earliest available slot
      }

      if (disableSameDayFallback) {
        this.logger.log(`Exact/flexible match only. Skipping same-day fallback search for worker ${workerId}.`);
        return null;
      }

      // 3. Try to find any available slot for the worker on the same day
      const requestedDate = new Date(
        requestedStartTime.getFullYear(),
        requestedStartTime.getMonth(),
        requestedStartTime.getDate(),
      );
      const nextDay = new Date(requestedDate);
      nextDay.setDate(requestedDate.getDate() + 1);

      this.logger.log(
        `🔍 DEBUG: Same-day search - requestedDate: ${requestedDate.toISOString()}, nextDay: ${nextDay.toISOString()}`,
      );

      const sameDaySlots = await this.slotsRepository.find({
        where: {
          worker: { id: workerId },
          startTime: Between(requestedDate, nextDay),
          isBooked: false,
        },
        order: {
          startTime: 'ASC',
        },
      });

      this.logger.log(
        `🔍 DEBUG: Found ${sameDaySlots.length} same-day slots for worker ${workerId}`,
      );

      if (sameDaySlots.length > 0) {
        this.logger.log(
          `Found ${sameDaySlots.length} same-day slots for worker ${workerId}`,
        );
        return sameDaySlots[0];
      }

      this.logger.log(`No flexible slots found for worker ${workerId}`);
      return null;
    } catch (error) {
      this.logger.error(
        `Error finding flexible slot for worker ${workerId}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Enhanced slot creation with idempotent day-check and batch ON CONFLICT DO NOTHING insert
   */
  async createSlotsForWorker(
    workerId: number,
    date: Date,
    timeSlots: Array<{ startTime: Date; endTime: Date }>,
  ): Promise<Slot[]> {
    const startTimeMs = Date.now();
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    try {
      // 1. Idempotent check: Fast COUNT(*) query for the entire day
      const existingCount = await this.slotsRepository.count({
        where: {
          worker: { id: workerId },
          startTime: Between(startOfDay, endOfDay),
        },
      });

      if (existingCount >= timeSlots.length) {
        // Entire day's slots exist: Skip in 1 single query without iterating or logging 33 times!
        return [];
      }

      // Validate worker exists
      const worker = await this.workersRepository.findOne({
        where: { id: workerId },
      });
      if (!worker) {
        throw new Error(`Worker with ID ${workerId} not found`);
      }

      const existingSlots = await this.slotsRepository.find({
        where: {
          worker: { id: workerId },
          startTime: Between(startOfDay, endOfDay),
        },
      });

      const slotsToCreate = timeSlots
        .filter((slotData) => {
          const targetTime = new Date(slotData.startTime).getTime();
          return !existingSlots.some(
            (existing) => new Date(existing.startTime).getTime() === targetTime,
          );
        })
        .map((slotData) => {
          const slot = new Slot();
          slot.worker = worker;
          slot.date = date;
          slot.startTime = slotData.startTime;
          slot.endTime = slotData.endTime;
          slot.isBooked = false;
          slot.maxBookings = 1;
          slot.currentBookings = 0;
          return slot;
        });

      if (slotsToCreate.length === 0) {
        return existingSlots;
      }

      // Batch Insert with ON CONFLICT DO NOTHING (orIgnore) in 1 query
      await this.slotsRepository
        .createQueryBuilder()
        .insert()
        .into(Slot)
        .values(slotsToCreate)
        .orIgnore()
        .execute();

      const duration = Date.now() - startTimeMs;
      if (duration > 500) {
        this.logger.warn(`PERFORMANCE WARNING: Slot creation for worker ${workerId} took ${duration}ms (>500ms threshold)`);
      }

      return slotsToCreate;
    } catch (error) {
      const duration = Date.now() - startTimeMs;
      this.logger.error(
        `Error creating slots for worker ${workerId} [Duration: ${duration}ms, PG Code: ${error.code || 'UNKNOWN'}]: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Bulk create slots for multiple workers
   */
  async createSlotsForMultipleWorkers(
    workerSlots: Array<{
      workerId: number;
      date: Date;
      timeSlots: Array<{ startTime: Date; endTime: Date }>;
    }>,
  ): Promise<void> {
    this.logger.log(`Creating slots for ${workerSlots.length} workers`);

    try {
      const promises = workerSlots.map(async (workerSlot) => {
        await this.createSlotsForWorker(
          workerSlot.workerId,
          workerSlot.date,
          workerSlot.timeSlots,
        );
      });

      await Promise.all(promises);
      this.logger.log(`Successfully created slots for all workers`);
    } catch (error) {
      this.logger.error('Error creating slots for multiple workers:', error);
      throw error;
    }
  }

  /**
   * Get available slots for a worker within a date range
   */
  async getAvailableSlotsForWorker(
    workerId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Slot[]> {
    this.logger.log(
      `🔍 DEBUG: getAvailableSlotsForWorker - workerId: ${workerId}, startDate: ${startDate.toISOString()}, endDate: ${endDate.toISOString()}`,
    );
    
    const slots = await this.slotsRepository.find({
      where: {
        worker: { id: workerId },
        startTime: Between(startDate, endDate),
        isBooked: false,
      },
      order: {
        startTime: 'ASC',
      },
    });
    
    this.logger.log(
      `🔍 DEBUG: getAvailableSlotsForWorker found ${slots.length} slots for worker ${workerId}`,
    );
    
    return slots;
  }

  /**
   * Get booking statistics for a worker
   */
  async getWorkerSlotStats(workerId: number): Promise<{
    totalSlots: number;
    availableSlots: number;
    bookedSlots: number;
    bookingRate: number;
  }> {
    const totalSlots = await this.slotsRepository.count({
      where: { worker: { id: workerId } },
    });

    const availableSlots = await this.slotsRepository.count({
      where: {
        worker: { id: workerId },
        isBooked: false,
      },
    });

    const bookedSlots = totalSlots - availableSlots;
    const bookingRate = totalSlots > 0 ? (bookedSlots / totalSlots) * 100 : 0;

    return {
      totalSlots,
      availableSlots,
      bookedSlots,
      bookingRate,
    };
  }

  async markAsAvailable(id: number): Promise<void> {
    const result = await this.slotsRepository
      .createQueryBuilder()
      .update(Slot)
      .set({ isBooked: false, currentBookings: 0 })
      .where('id = :id AND "isBooked" = true', { id })
      .execute();

    if (result.affected === 0) {
      this.logger.warn(
        `markAsAvailable: Slot ${id} was not booked or does not exist`,
      );
    }
  }

  /**
   * Atomically mark a slot as booked using a conditional UPDATE.
   * Prevents race conditions where two concurrent requests could book the same slot.
   * The WHERE clause ensures only an unbooked slot can be marked as booked.
   */
  async markAsBooked(id: number): Promise<boolean> {
    const result = await this.slotsRepository
      .createQueryBuilder()
      .update(Slot)
      .set({
        isBooked: true,
        currentBookings: () => '"currentBookings" + 1',
      })
      .where('id = :id AND "isBooked" = false', { id })
      .execute();

    if (result.affected === 0) {
      this.logger.warn(
        `markAsBooked: Slot ${id} is already booked or does not exist (race condition prevented)`,
      );
      return false;
    }

    this.logger.log(`Successfully marked slot ${id} as booked (atomic)`);
    return true;
  }

  /**
   * Find available slots for multiple workers in a single query
   * Optimized to avoid N+1 query problem
   * ✅ FIX: Changed from exact time match to overlap-range query and fixed missing :endTime binding
   */
  async findAvailableSlotsForWorkers(
    workerIds: number[],
    startTime: Date,
    endTime: Date,
  ): Promise<
    Array<{ workerId: number; id: number; startTime: Date; endTime: Date }>
  > {
    if (workerIds.length === 0) {
      return [];
    }

    // ✅ FIX: Use overlap-range query instead of exact match.
    // Previously: .andWhere('slot.startTime = :startTime') AND .andWhere('slot.endTime = :endTime')
    // This required EXACTLY matching times which caused workers to appear unavailable.
    // Now: Find any free slot that overlaps with the requested window using canonical interval overlap:
    //   slot.startTime < requestedEndTime AND slot.endTime > requestedStartTime
    const slots = await this.slotsRepository
      .createQueryBuilder('slot')
      .select([
        'slot.id',
        'slot.startTime',
        'slot.endTime',
        'worker.id as worker_id',
      ])
      .leftJoin('slot.worker', 'worker')
      .where('worker.id IN (:...workerIds)', { workerIds })
      .andWhere('slot.startTime < :endTime', { endTime })
      .andWhere('slot.endTime > :startTime', { startTime })
      .andWhere('slot.isBooked = :isBooked', { isBooked: false })
      .getRawMany();

    return slots.map((slot) => ({
      workerId: slot.worker_id,
      id: slot.slot_id,
      startTime: slot.slot_start_time,
      endTime: slot.slot_end_time,
    }));
  }


  /**
   * Resyncs worker availability based on active booking intervals.
   * Called when a booking is cancelled to free overlapping slots correctly.
   */
  async syncWorkerAvailability(
    workerId: number,
    date: Date,
    activeIntervals: Array<{ startTime: Date; endTime: Date }>,
  ): Promise<void> {
    // 1. Free all slots for this worker on this day
    await this.slotsRepository.update(
      { worker: { id: workerId }, date },
      { isBooked: false, currentBookings: 0 }
    );

    // 2. Re-block any slots that overlap with active intervals
    for (const interval of activeIntervals) {
      await this.slotsRepository.createQueryBuilder()
        .update(Slot)
        .set({ isBooked: true, currentBookings: 1 })
        .where('workerId = :workerId', { workerId })
        .andWhere('date = :date', { date })
        .andWhere('startTime < :endTime AND endTime > :startTime', {
          startTime: interval.startTime,
          endTime: interval.endTime,
        })
        .execute();
    }
    
    this.logger.log(`Synced availability for worker ${workerId} on ${date.toISOString().split('T')[0]}`);
  }

  /**
   * Atomic slot booking enforcing Worker -> Slot lock acquisition order.
   * Prevents race conditions and deadlocks with full PostgreSQL error logging.
   */
  async bookSlotAtomic(
    slotId: number,
  ): Promise<{ success: boolean; slot?: Slot; error?: string }> {
    const startTimeMs = Date.now();
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Fetch slot metadata without lock to identify worker ID
      const slotMeta = await queryRunner.manager.findOne(Slot, {
        where: { id: slotId },
        relations: ['worker'],
      });

      if (!slotMeta) {
        await queryRunner.rollbackTransaction();
        return { success: false, error: 'Slot not found' };
      }

      // 2. Lock WORKER first to guarantee standardized Lock Hierarchy (Worker -> Slot -> Booking -> Assignment)
      if (slotMeta.worker) {
        await queryRunner.manager.findOne(Worker, {
          where: { id: slotMeta.worker.id },
          lock: { mode: 'pessimistic_write' },
        });
      }

      // 3. Lock SLOT second (WITHOUT relations to prevent PG 0A000 outer join lock error)
      const slot = await queryRunner.manager.findOne(Slot, {
        where: { id: slotId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!slot) {
        await queryRunner.rollbackTransaction();
        return { success: false, error: 'Slot not found' };
      }

      // Attach worker reference post-lock
      if (slotMeta.worker) {
        slot.worker = slotMeta.worker;
      }

      if (slot.isBooked) {
        await queryRunner.rollbackTransaction();
        return { success: false, error: 'Slot is already booked' };
      }

      if (slot.currentBookings >= slot.maxBookings) {
        await queryRunner.rollbackTransaction();
        return { success: false, error: 'Slot capacity exceeded' };
      }

      // Update slot atomically
      slot.isBooked = true;
      slot.currentBookings = slot.currentBookings + 1;

      const savedSlot = await queryRunner.manager.save(Slot, slot);

      // Lock overlapping slots for this worker
      if (slot.worker) {
        await queryRunner.manager.createQueryBuilder()
          .update(Slot)
          .set({ isBooked: true, currentBookings: 1 })
          .where('workerId = :workerId', { workerId: slot.worker.id })
          .andWhere('id != :id', { id: slot.id })
          .andWhere('date = :date', { date: slot.date })
          .andWhere('isBooked = false')
          .andWhere('startTime < :endTime AND endTime > :startTime', {
            startTime: slot.startTime,
            endTime: slot.endTime,
          })
          .execute();
      }

      await queryRunner.commitTransaction();

      const duration = Date.now() - startTimeMs;
      if (duration > 500) {
        this.logger.warn(`PERFORMANCE WARNING: bookSlotAtomic for slot ${slotId} took ${duration}ms (>500ms threshold)`);
      }

      this.logger.log(`Successfully booked slot ${slotId} atomically in ${duration}ms`);
      return { success: true, slot: savedSlot };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const duration = Date.now() - startTimeMs;
      const pgCode = error?.code || 'UNKNOWN';
      this.logger.error(
        `ATOMIC BOOKING FAILURE for slot ${slotId} [Duration: ${duration}ms, PG Code: ${pgCode}]: ${error.message}`,
        error.stack,
      );
      return {
        success: false,
        error: `Booking failed due to concurrent modification (PG Code: ${pgCode})`,
      };
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Legacy slot booking method - kept for backward compatibility
   * @deprecated Use bookSlotAtomic instead
   */
  async bookSlot(slotId: number): Promise<boolean> {
    const result = await this.bookSlotAtomic(slotId);
    return result.success;
  }

  /**
   * Enhanced slot unbooking with validation
   */
  async unbookSlot(slotId: number): Promise<boolean> {
    try {
      const slot = await this.slotsRepository.findOne({
        where: { id: slotId },
      });

      if (!slot) {
        this.logger.warn(`Slot ${slotId} not found`);
        return false;
      }

      if (!slot.isBooked) {
        this.logger.warn(`Slot ${slotId} is not booked`);
        return false;
      }

      await this.slotsRepository.update(slotId, { isBooked: false });
      this.logger.log(`Successfully unbooked slot ${slotId}`);
      return true;
    } catch (error) {
      this.logger.error(`Error unbooking slot ${slotId}:`, error);
      return false;
    }
  }
}
