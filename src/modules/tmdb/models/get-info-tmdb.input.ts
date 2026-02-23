import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetInfoTmdbInput {
  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  page: number;
}
