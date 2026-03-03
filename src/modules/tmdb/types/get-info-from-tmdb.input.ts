import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetInfoFromTmdbInput {
  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  page: number;
}
