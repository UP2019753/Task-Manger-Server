import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Board } from 'src/boards/board.model';
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { RealTimeDuration } from './realTimeDuration.model';
import { TimePeriod } from './timePeriod.model';

export enum TaskProgress {
  NOTSTARTED,
  INPROGRESS,
  DONE,
}

registerEnumType(TaskProgress, {
  name: 'TaskProgress',
});

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => TimePeriod, (timePeriod) => timePeriod.task)
  @Field((type) => [TimePeriod])
  timePeriods: TimePeriod[];

  @Column({
    type: 'simple-enum',
    enum: TaskProgress,
    default: TaskProgress.NOTSTARTED,
  })
  @Field((type) => TaskProgress)
  status: TaskProgress;
}
