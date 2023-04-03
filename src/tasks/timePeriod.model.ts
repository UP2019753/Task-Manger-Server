import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { Board } from 'src/boards/board.model';
import {
  DateTimeScalar,
  dateTimeTransformer,
} from 'src/scalars/dateTimeScalar';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.model';

// Time period created for start/stop task
@Entity()
@ObjectType()
export class TimePeriod {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Task, (task) => task.timePeriods)
  @Field()
  task: Task;

  @Column({ type: 'text', transformer: dateTimeTransformer })
  @Field((type) => DateTimeScalar)
  startTime: DateTime;

  @Column({ type: 'text', transformer: dateTimeTransformer, nullable: true })
  @Field((type) => DateTimeScalar, { nullable: true })
  stopTime: DateTime | null | undefined;
}
