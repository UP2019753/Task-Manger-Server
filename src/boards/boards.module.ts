import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from 'src/tasks/tasks.module';
import { Board } from './board.model';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  providers: [BoardsService, BoardsResolver],
  imports: [TypeOrmModule.forFeature([Board]), TasksModule],
})
export class BoardsModule {}
