import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { DateTime } from 'luxon';
import { ValueTransformer } from 'typeorm';

export const DateTimeScalar = new GraphQLScalarType<DateTime, string>({
  name: 'DateTime',
  description: 'A simple DateTime parser',
  serialize: (value: DateTime) => value.toISO(),
  parseValue: (value: string) => DateTime.fromISO(value),
  parseLiteral: (ast: ValueNode) => {
    if (ast.kind === Kind.STRING) {
      return DateTime.fromISO(ast.value);
    }
    return null;
  },
});

export const dateTimeTransformer: ValueTransformer = {
  to(value: DateTime | undefined): string | null {
    if (value === undefined) {
      return null;
    }
    return value.toISO();
  },
  from(value: string | null): DateTime | undefined {
    if (value === null) {
      return undefined;
    }
    return DateTime.fromISO(value);
  },
};
