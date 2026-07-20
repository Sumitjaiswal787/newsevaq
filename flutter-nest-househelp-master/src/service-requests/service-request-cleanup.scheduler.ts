import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRequest } from './entities/service-request.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class ServiceRequestCleanupScheduler {
  private readonly logger = new Logger(ServiceRequestCleanupScheduler.name);

  constructor(
    @InjectRepository(ServiceRequest)
    private serviceRequestsRepository: Repository<ServiceRequest>,
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async cleanupAbandonedServiceRequests() {
    this.logger.log('Starting cleanup of abandoned service requests...');
    try {
      const abandonThreshold = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago

      // Find all service requests that are ASSIGNED but have no corresponding Booking
      const abandonedRequests = await this.serviceRequestsRepository
        .createQueryBuilder('sr')
        .where('sr.assignmentStatus = :status', { status: 'ASSIGNED' })
        .andWhere('sr.updatedAt <= :threshold', { threshold: abandonThreshold })
        .getMany();

      let cleanedCount = 0;
      for (const request of abandonedRequests) {
        // Double check if a booking was created for this service request
        // Sometimes serviceRequestId is saved as numeric ID, sometimes as publicId (UUID)
        const booking = await this.bookingsRepository.createQueryBuilder('b')
          .where('b.serviceRequestId = :id OR b.serviceRequestId = :publicId', {
            id: request.id.toString(),
            publicId: request.publicId,
          })
          .getOne();

        if (!booking) {
          // No booking found, meaning payment was never completed
          await this.serviceRequestsRepository.update(request.id, {
            assignmentStatus: 'FAILED_TO_ASSIGN',
            failureReason: 'Payment abandoned',
            assignedWorkerId: null,
            assignedSlotId: null,
          });
          cleanedCount++;
          this.logger.log(`Cleaned up abandoned service request ${request.id}`);
        }
      }

      if (cleanedCount > 0) {
        this.logger.log(`Successfully cleaned up ${cleanedCount} abandoned service requests.`);
      }
    } catch (error) {
      this.logger.error('Error during abandoned service request cleanup:', error);
    }
  }
}
