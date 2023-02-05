import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.model';
import { Task } from './task.model';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService, TasksResolver, ActivitiesService],
  imports: [TypeOrmModule.forFeature([Task, Activity])],
  exports: [TasksService],
})
export class TasksModule {}
