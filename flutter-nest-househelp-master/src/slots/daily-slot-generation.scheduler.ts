import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from '../workers/entities/worker.entity';
import { SlotsService } from '../slots/slots.service';

@Injectable()
export class DailySlotGenerationScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(DailySlotGenerationScheduler.name);

  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
    private slotsService: SlotsService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Running bootstrap slot generation...');
    await this.handleHourlySlotGeneration();
  }

  /**
   * Run daily at 12:00 AM to generate slots for all active workers
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailySlotGeneration(): Promise<void> {
    this.logger.log('Running daily slot generation scheduler...');
    
    try {
      // Get all active workers
      const workers = await this.workersRepository.find({
        where: { isActive: true },
      });

      this.logger.log(`Found ${workers.length} active workers`);

      // Generate slots for the next 30 days for each worker to support 26-day subscriptions
      const today = new Date();
      
      for (let dayOffset = 0; dayOffset < 45; dayOffset++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + dayOffset);
        
        // Create standard time slots for the day
        const timeSlots = this.createStandardTimeSlots(targetDate);
        
        // Create slots for each worker
        for (const worker of workers) {
          try {
            await this.slotsService.createSlotsForWorker(
              worker.id,
              targetDate,
              timeSlots,
            );
          } catch (error) {
            // Silently handle duplicate slot errors
            if (!error.message?.includes('already exists')) {
              this.logger.error(
                `Failed to create slots for worker ${worker.id}: ${error.message}`,
              );
            }
          }
        }
      }

      this.logger.log('Daily slot generation completed successfully');
    } catch (error) {
      this.logger.error(`Daily slot generation failed: ${error.message}`, error.stack);
    }
  }

  /**
   * Run every hour to ensure slots are available for upcoming 7 days
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySlotGeneration(): Promise<void> {
    const startTimeMs = Date.now();
    this.logger.log('Running hourly slot generation check (7 days lookahead)...');
    
    try {
      const workers = await this.workersRepository.find({
        where: { isActive: true },
      });

      const today = new Date();
      
      // Hourly check only looks ahead 7 days for fast execution
      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + dayOffset);
        
        const timeSlots = this.createStandardTimeSlots(targetDate);
        
        for (const worker of workers) {
          try {
            await this.slotsService.createSlotsForWorker(
              worker.id,
              targetDate,
              timeSlots,
            );
          } catch (error) {
            this.logger.error(
              `Failed to create slots for worker ${worker.id} on ${targetDate.toISOString().split('T')[0]} [PG Code: ${error.code || 'UNKNOWN'}]: ${error.message}`,
              error.stack,
            );
          }
        }
      }

      const duration = Date.now() - startTimeMs;
      if (duration > 500) {
        this.logger.warn(`PERFORMANCE WARNING: Hourly slot generation check took ${duration}ms (>500ms threshold)`);
      }

      this.logger.log(`Hourly slot generation check completed in ${duration}ms`);
    } catch (error) {
      this.logger.error(`Hourly slot generation failed: ${error.message}`, error.stack);
    }
  }

  /**
   * Create standard time slots for a day
   * Covers morning, afternoon, and evening time windows
   * Returns slots that can be used for both subscription and on-demand bookings
   * @param targetDate - The date to create slots for (not today)
   */
  private createStandardTimeSlots(targetDate: Date): Array<{ startTime: Date; endTime: Date }> {
    const slots: Array<{ startTime: Date; endTime: Date }> = [];
    
    // Use the target date passed from the caller, not today's date
    const baseDate = new Date(targetDate);
    baseDate.setHours(0, 0, 0, 0);

    // Start at 05:00 AM, end before 22:00 (10:00 PM)
    // 1 hour job + 30 min buffer = 1.5 hours per slot cycle
    // Slots: 05:00, 06:30, 08:00, 09:30, 11:00, 12:30, 14:00, 15:30, 17:00, 18:30, 20:00
    let currentHour = 5;
    let currentMinute = 0;

    while (currentHour < 21 || (currentHour === 21 && currentMinute === 0)) {
      const startTime = new Date(baseDate);
      startTime.setHours(currentHour, currentMinute, 0, 0);
      
      const endTime = new Date(startTime);
      // Slot represents a 30 min booking window
      endTime.setHours(startTime.getHours(), startTime.getMinutes() + 30, 0, 0); 

      slots.push({ startTime, endTime });

      // Add 30 minutes for the next possible start time
      currentMinute += 30;
      currentHour += Math.floor(currentMinute / 60);
      currentMinute %= 60;
    }

    return slots;
  }

  /**
   * Manual trigger for slot generation (for testing)
   */
  async triggerSlotGeneration(daysAhead: number = 7): Promise<void> {
    this.logger.log(`Manually triggering slot generation for ${daysAhead} days ahead`);

    const workers = await this.workersRepository.find({
      where: { isActive: true },
    });

    const today = new Date();
    
    for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + dayOffset);
      
      const timeSlots = this.createStandardTimeSlots(targetDate);
      
      for (const worker of workers) {
        await this.slotsService.createSlotsForWorker(
          worker.id,
          targetDate,
          timeSlots,
        );
      }
    }

    this.logger.log('Manual slot generation completed');
  }
}
