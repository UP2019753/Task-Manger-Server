import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.model';
import { Repository } from 'typeorm';
import { TimePeriodsService } from './timePeriods.service';
import { Task, TaskProgress } from './task.model';
import { Duration } from 'luxon';
import { RealTimeDuration } from './realTimeDuration.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private timePeriodsService: TimePeriodsService,
  ) {}

  async create(
    board: Board,
    name: string,
    taskProgress?: TaskProgress,
  ): Promise<Task> {
    const newTask = this.tasksRepository.create();
    newTask.name = name;
    newTask.board = board;
    if (taskProgress) {
      newTask.status = taskProgress;
    }
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async delete(taskId: number): Promise<void> {
    await this.tasksRepository.delete(taskId);
  }

  async stop(taskId: number): Promise<Task> {
    const task = await this.findOneById(taskId);
    task.timePeriods
      .filter((timePeriod) => {
        return timePeriod.stopTime == null;
      })
      .forEach((timePeriod) => {
        this.timePeriodsService.stop(timePeriod);
      });
    return task;
  }

  async changeStatus(taskId: number, newStatus: TaskProgress): Promise<Task> {
    const task = await this.findOneById(taskId);
    task.status = newStatus;
    await this.tasksRepository.save(task);
    return task;
  }

  async changeTaskName(taskId: number, newTaskName: string): Promise<Task> {
    const task = await this.findOneById(taskId);
    task.name = newTaskName;
    await this.tasksRepository.save(task);
    return task;
  }

  async findOneById(id: number): Promise<Task> {
    return await this.tasksRepository.findOne({
      where: { id },
      relations: ['timePeriods'],
    });
  }

  async calcRealTimeDuration(id: number): Promise<RealTimeDuration> {
    const task = await this.findOneById(id);
    let totalTime = Duration.fromMillis(0);
    for (const timePeriod of task.timePeriods) {
      if (timePeriod.stopTime) {
        totalTime = totalTime.plus(
          timePeriod.stopTime.diff(timePeriod.startTime),
        );
      }
    }
    const runningStartTimes = task.timePeriods
      .filter((timePeriod) => !timePeriod.stopTime)
      .map((timePeriod) => timePeriod.startTime);

    return { totalSavedTime: totalTime, startTimes: runningStartTimes };
  }

  async isRunning(id: number): Promise<boolean> {
    const task = await this.findOneById(id);
    return task.timePeriods.some((task) => !task.stopTime);
  }
}
