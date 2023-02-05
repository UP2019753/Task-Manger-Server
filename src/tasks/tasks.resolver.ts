import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardsService } from 'src/boards/boards.service';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.model';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Resolver((of) => Task)
export class TasksResolver {
  constructor(
    private tasksService: TasksService,
    private activitiesService: ActivitiesService,
  ) {}

  @Mutation((returns) => Activity)
  async startActivity(@Args({ name: 'taskID', type: () => Int }) id: number) {
    const task = await this.tasksService.findOneById(id);
    return this.activitiesService.create(task);
  }
}
