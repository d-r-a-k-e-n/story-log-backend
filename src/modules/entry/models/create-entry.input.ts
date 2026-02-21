import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateEntryInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  author: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  genreId: number;

  @Field(() => Int)
  typeId: number;

  @Field(() => Int)
  statusId: number;
}
