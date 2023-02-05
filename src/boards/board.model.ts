import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/task.model';
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Task, (task) => task.board)
  @Field((type) => [Task])
  tasks: Task[];
}
