import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetInfoTmdb {
  @Field(() => String)
  title: string;

  @Field(() => String)
  overview: string;

  @Field(() => String)
  posterPath: string;
}
