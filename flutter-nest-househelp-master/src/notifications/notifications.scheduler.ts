import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsScheduler {
  private readonly logger = new Logger(NotificationsScheduler.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @Cron('0 * * * * *')
  async handlePreServiceReminders() {
    this.logger.log('Checking for pre-service reminders to send');
    try {
      const result = await this.notificationsService.checkAndSendReminders();
      
      if (result.success) {
        this.logger.log(`✅ Pre-service reminder check completed successfully. Processed ${result.processed} bookings, sent ${result.sent} reminders`);
      } else {
        this.logger.warn(`⚠️ Pre-service reminder check completed with errors. ${result.errors} errors occurred`);
      }
      
    } catch (error) {
      this.logger.error('❌ Pre-service reminder check FAILED COMPLETELY', error);
    }

    this.logger.log('Checking for worker 20-minute reminders to send');
    try {
      const workerResult = await this.notificationsService.checkAndSendWorkerReminders();
      if (workerResult.success) {
        this.logger.log(`✅ Worker reminder check completed successfully. Processed ${workerResult.processed} bookings, sent ${workerResult.sent} reminders`);
      } else {
        this.logger.warn(`⚠️ Worker reminder check completed with errors. ${workerResult.errors} errors occurred`);
      }
    } catch (error) {
      this.logger.error('❌ Worker reminder check FAILED COMPLETELY', error);
    }
  }
}
