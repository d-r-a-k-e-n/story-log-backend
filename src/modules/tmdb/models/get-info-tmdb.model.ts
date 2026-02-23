import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetInfoTmdb {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  overview: string;

  @Field(() => String, { nullable: true })
  posterPath: string;
}
