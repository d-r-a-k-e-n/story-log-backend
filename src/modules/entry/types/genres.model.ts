import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Genres {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
