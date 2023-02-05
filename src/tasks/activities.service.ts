import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Board } from 'src/boards/board.model';
import { Repository } from 'typeorm';
import { Activity } from './activity.model';
import { Task } from './task.model';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(task: Task): Promise<Activity> {
    const newActivity = this.activitiesRepository.create();
    newActivity.task = task;
    newActivity.startTime = DateTime.utc();
    await this.activitiesRepository.save(newActivity);
    return newActivity;
  }
}
