import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerLeavesService } from './worker-leaves.service';
import { WorkerLeavesController } from './worker-leaves.controller';
import { WorkerLeave } from './entities/worker-leave.entity';
import { Worker } from '../workers/entities/worker.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerLeave, Worker, Booking]), NotificationsModule],
  controllers: [WorkerLeavesController],
  providers: [WorkerLeavesService],
  exports: [WorkerLeavesService],
})
export class WorkerLeavesModule {}
