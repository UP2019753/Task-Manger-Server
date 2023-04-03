import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimePeriodsService } from './timePeriods.service';
import { TimePeriod } from './timePeriod.model';
import { Task } from './task.model';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService, TasksResolver, TimePeriodsService],
  imports: [TypeOrmModule.forFeature([Task, TimePeriod])],
  exports: [TasksService],
})
export class TasksModule {}
