import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { DateTime, Duration } from 'luxon';
import { ValueTransformer } from 'typeorm';

export const DurationScalar = new GraphQLScalarType<Duration, string>({
  name: 'Duration',
  description: 'A simple Duration parser',
  serialize: (value: Duration) => value.toISO(),
  parseValue: (value: string) => Duration.fromISO(value),
  parseLiteral: (ast: ValueNode) => {
    if (ast.kind === Kind.STRING) {
      return Duration.fromISO(ast.value);
    }
    return null;
  },
});
