import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { WorkerLeavesService } from './worker-leaves.service';
import { LeaveStatus } from './entities/worker-leave.entity';

@Controller()
export class WorkerLeavesController {
  constructor(private readonly workerLeavesService: WorkerLeavesService) {}

  @Post('worker-leaves')
  applyForLeave(
    @Body('workerId') workerId: number,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('reason') reason?: string,
  ) {
    return this.workerLeavesService.applyForLeave(workerId, startDate, endDate, reason);
  }

  @Get('worker-leaves/:workerId')
  findByWorker(@Param('workerId') workerId: number) {
    return this.workerLeavesService.findByWorker(workerId);
  }

  @Get('admin/worker-leaves')
  findAll(@Query('status') status?: LeaveStatus) {
    return this.workerLeavesService.findAll(status);
  }

  @Patch('admin/worker-leaves/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: LeaveStatus,
  ) {
    return this.workerLeavesService.updateStatus(id, status);
  }

  @Patch('admin/worker-leaves/:id/assign-backup')
  assignBackupWorker(
    @Param('id') id: string,
    @Body('backupWorkerId') backupWorkerId: number,
  ) {
    return this.workerLeavesService.assignBackupWorker(id, backupWorkerId);
  }
}
