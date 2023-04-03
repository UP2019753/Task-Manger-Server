import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTime, Duration } from 'luxon';
import { DateTimeScalar } from 'src/scalars/dateTimeScalar';
import { DurationScalar } from 'src/scalars/durationScalar';

@ObjectType()
export class RealTimeDuration {
  @Field((type) => DurationScalar)
  totalSavedTime: Duration;

  @Field((type) => [DateTimeScalar])
  startTimes: DateTime[];
}
