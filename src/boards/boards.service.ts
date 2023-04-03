import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async findOneById(id: number): Promise<Board> {
    return await this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.tasks', 'tasks')
      .leftJoinAndSelect('tasks.timePeriods', 'timePeriods')
      .where('board.id = :id', { id: id })
      .getOne();
  }
  async create(name: string): Promise<Board> {
    const newBoard = this.boardsRepository.create();
    newBoard.name = name;
    await this.boardsRepository.save(newBoard);
    return newBoard;
  }
}
