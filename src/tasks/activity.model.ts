import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { Board } from 'src/boards/board.model';
import { DateTimeScalar, dateTimeTransformer } from 'src/scalars/dateTime';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.model';

// Activity created for  start/stop task
@Entity()
@ObjectType()
export class Activity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Task, (task) => task.activities)
  @Field()
  task: Task;

  @Column({ type: 'text', transformer: dateTimeTransformer })
  @Field((type) => DateTimeScalar)
  startTime: DateTime;

  @Column({ type: 'text', transformer: dateTimeTransformer, nullable: true })
  @Field((type) => DateTimeScalar, { nullable: true })
  stopTime: DateTime | null;
}
