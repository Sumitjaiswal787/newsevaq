import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { WorkerLeave, LeaveStatus } from './entities/worker-leave.entity';
import { Worker } from '../workers/entities/worker.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class WorkerLeavesService {
  constructor(
    @InjectRepository(WorkerLeave)
    private readonly leavesRepository: Repository<WorkerLeave>,
    @InjectRepository(Worker)
    private readonly workersRepository: Repository<Worker>,
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async applyForLeave(workerId: number, startDate: string, endDate: string, reason?: string) {
    const leave = this.leavesRepository.create({
      workerId,
      startDate,
      endDate,
      reason,
      status: LeaveStatus.PENDING,
    });
    return this.leavesRepository.save(leave);
  }

  async findAll(status?: LeaveStatus) {
    const query = this.leavesRepository.createQueryBuilder('leave')
      .leftJoinAndSelect('leave.worker', 'worker')
      .leftJoinAndSelect('worker.user', 'workerUser')
      .leftJoinAndSelect('leave.backupWorker', 'backupWorker')
      .leftJoinAndSelect('backupWorker.user', 'backupUser');
    if (status) query.where('leave.status = :status', { status });
    return query.getMany();
  }

  async findByWorker(workerId: number) {
    return this.leavesRepository.find({
      where: { workerId },
      order: { createdAt: 'DESC' },
      relations: ['backupWorker', 'backupWorker.user']
    });
  }

  async updateStatus(id: string, status: LeaveStatus) {
    const leave = await this.leavesRepository.findOne({ where: { id }, relations: ['worker', 'worker.user'] });
    if (!leave) throw new NotFoundException('Leave not found');

    leave.status = status;
    await this.leavesRepository.save(leave);

    if (status === LeaveStatus.APPROVED) {
      // Find bookings for this worker in this date range
      const affectedBookings = await this.bookingsRepository.find({
        where: {
          workerId: leave.workerId,
          date: Between(leave.startDate, leave.endDate),
        },
        relations: ['user'],
      });

      // Notify customers
      for (const booking of affectedBookings) {
        if (booking.user) {
          const workerName = leave.worker.user ? leave.worker.user.firstName : 'Worker';
          await this.notificationsService.notifyCustomerWorkerOnLeave(booking.user, workerName, leave.startDate, leave.endDate);
        }
      }
    }
    return leave;
  }

  async assignBackupWorker(id: string, backupWorkerId: number) {
    const leave = await this.leavesRepository.findOne({ where: { id }, relations: ['worker'] });
    if (!leave) throw new NotFoundException('Leave not found');

    const backupWorker = await this.workersRepository.findOne({ where: { id: backupWorkerId }, relations: ['user'] });
    if (!backupWorker) throw new NotFoundException('Backup worker not found');

    leave.backupWorkerId = backupWorkerId;
    await this.leavesRepository.save(leave);

    // Find and update bookings
    const affectedBookings = await this.bookingsRepository.find({
      where: {
        workerId: leave.workerId,
        date: Between(leave.startDate, leave.endDate),
      },
      relations: ['user'],
    });

    for (const booking of affectedBookings) {
      booking.workerId = backupWorkerId;
      booking.assignedWorkerId = backupWorkerId;
      await this.bookingsRepository.save(booking);

      if (booking.user) {
        const backupName = backupWorker.user ? backupWorker.user.firstName : 'A backup worker';
        await this.notificationsService.notifyCustomerBackupAssigned(booking.user, backupName, leave.startDate, leave.endDate);
      }
    }
    return leave;
  }
}
