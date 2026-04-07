import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateEntryInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => [Int])
  genreIds: number[];

  @Field(() => Int)
  typeId: number;

  @Field(() => Int)
  statusId: number;
}
