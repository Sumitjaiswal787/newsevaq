import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ServiceRequest } from './entities/service-request.entity';
import { ServiceRequestsController } from './service-requests.controller';
import { ServiceRequestsService } from './service-requests.service';
import { AssignmentWorker } from './assignment.worker';
import { AssignmentProcessor } from './assignment.processor';
import { Worker } from '../workers/entities/worker.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { ServiceRequestCleanupScheduler } from './service-request-cleanup.scheduler';
import { SlotsModule } from '../slots/slots.module';
import { ServiceProfilesModule } from '../service-profiles/service-profiles.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest, Worker, Service, User, Subscription, Booking]),
    BullModule.registerQueue({
      name: 'assignment',
    }),
    SlotsModule,
    ServiceProfilesModule,
    NotificationsModule,
  ],
  controllers: [ServiceRequestsController],
  providers: [ServiceRequestsService, AssignmentWorker, AssignmentProcessor, ServiceRequestCleanupScheduler],
  exports: [ServiceRequestsService],
})
export class ServiceRequestsModule {}
