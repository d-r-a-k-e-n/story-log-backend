import { ObjectType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
