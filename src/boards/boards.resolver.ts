import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Task, TaskProgress } from 'src/tasks/task.model';
import { TasksService } from 'src/tasks/tasks.service';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Resolver((of) => Board)
export class BoardsResolver {
  constructor(
    private boardsService: BoardsService,
    private tasksService: TasksService,
  ) {}

  @Query((returns) => Board)
  async getBoardById(@Args('id', { type: () => Int }) id: number) {
    return this.boardsService.findOneById(id);
  }

  @Mutation((returns) => Board)
  async createBoard(@Args({ name: 'name', type: () => String }) name: string) {
    return this.boardsService.create(name);
  }

  @Mutation((returns) => Task)
  async createTask(
    @Args({ name: 'boardId', type: () => Int }) boardId: number,
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'taskProgress', type: () => TaskProgress, nullable: true })
    taskProgress?: TaskProgress,
  ) {
    const board = await this.getBoardById(boardId);
    return this.tasksService.create(board, name, taskProgress);
  }

  // @ResolveField()
  // async posts(@Parent() author: Board) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
