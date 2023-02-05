import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.model';
import { Repository } from 'typeorm';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(board: Board, name: string): Promise<Task> {
    const newTask = this.tasksRepository.create();
    newTask.name = name;
    newTask.board = board;
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async findOneById(id: number): Promise<Task> {
    return await this.tasksRepository.findOne({
      where: { id },
      relations: ['activities'],
    });
  }
}
