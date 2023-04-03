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
import { TimePeriodsService } from './timePeriods.service';
import { TimePeriod } from './timePeriod.model';
import { Task, TaskProgress } from './task.model';
import { TasksService } from './tasks.service';
import { RealTimeDuration } from './realTimeDuration.model';
import { Duration } from 'luxon';

@Resolver((of) => Task)
export class TasksResolver {
  constructor(
    private tasksService: TasksService,
    private timePeriodsService: TimePeriodsService,
  ) {}

  @Mutation((returns) => TimePeriod)
  async startTimePeriod(@Args({ name: 'taskID', type: () => Int }) id: number) {
    const task = await this.tasksService.findOneById(id);
    return this.timePeriodsService.create(task);
  }

  @Mutation((returns) => Task)
  async stopTimePeriod(@Args({ name: 'taskID', type: () => Int }) id: number) {
    return this.tasksService.stop(id);
  }

  @Mutation((returns) => Task)
  async setTaskStatus(
    @Args({ name: 'taskID', type: () => Int }) id: number,
    @Args({ name: 'status', type: () => TaskProgress }) status: TaskProgress,
  ) {
    return this.tasksService.changeStatus(id, status);
  }

  @ResolveField((type) => RealTimeDuration)
  async totalTime(@Parent() task: Task): Promise<RealTimeDuration> {
    return this.tasksService.calcRealTimeDuration(task.id);
  }

  @ResolveField((type) => Boolean)
  async isRunning(@Parent() task: Task): Promise<boolean> {
    return this.tasksService.isRunning(task.id);
  }
}
