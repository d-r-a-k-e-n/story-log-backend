import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetInfoFromTmdb {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  overview: string;

  @Field(() => String, { nullable: true })
  posterPath: string;

  @Field(() => Number, { nullable: true })
  rating: number;

  @Field(() => [String], { nullable: true })
  genreIds: string[];
}
