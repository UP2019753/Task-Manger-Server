import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.model';
import { DateTimeScalar } from './scalars/dateTimeScalar';
import { DurationScalar } from './scalars/durationScalar';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      resolvers: { DateTime: DateTimeScalar, Duration: DurationScalar },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      entities: [Task],
      synchronize: true,
      database: 'database.sql',
    }),
    BoardsModule,
  ],
})
export class AppModule {}
