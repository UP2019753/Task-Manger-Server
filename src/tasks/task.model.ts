import { Field, Int, ObjectType } from '@nestjs/graphql';
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
import { Activity } from './activity.model';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  @OneToMany(() => Activity, (activity) => activity.task)
  @Field((type) => [Activity])
  activities: Activity[];
}
