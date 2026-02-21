import { ObjectType } from '@nestjs/graphql';
import { Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID!)
  id: number;

  @Field(() => String!)
  email: string;

  @Field(() => String)
  name: string;
}
