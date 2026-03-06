import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Statuses {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
