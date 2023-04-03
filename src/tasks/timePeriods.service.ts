import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Board } from 'src/boards/board.model';
import { Repository } from 'typeorm';
import { TimePeriod } from './timePeriod.model';
import { Task } from './task.model';

@Injectable()
export class TimePeriodsService {
  constructor(
    @InjectRepository(TimePeriod)
    private timePeriodsRepository: Repository<TimePeriod>,
  ) {}

  async create(task: Task): Promise<TimePeriod> {
    const newTimePeriod = this.timePeriodsRepository.create();
    newTimePeriod.task = task;
    newTimePeriod.startTime = DateTime.utc();
    await this.timePeriodsRepository.save(newTimePeriod);
    return newTimePeriod;
  }

  async stop(timePeriod: TimePeriod): Promise<TimePeriod> {
    timePeriod.stopTime = DateTime.utc();
    await this.timePeriodsRepository.save(timePeriod);
    return timePeriod;
  }

  async findOneById(id: number): Promise<TimePeriod> {
    return await this.timePeriodsRepository.findOne({
      where: { id },
    });
  }
}
