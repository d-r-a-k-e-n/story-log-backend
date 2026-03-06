import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MediaTypes {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
