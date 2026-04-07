import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/auth/types/user.model';

@ObjectType()
export class Genre {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class MediaType {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class Status {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class Like {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;
}
@ObjectType()
export class Entry {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [Int])
  genreIds: number[];

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => MediaType)
  type: MediaType;

  @Field(() => Float, { nullable: true })
  rating: number;

  @Field(() => Status)
  status: Status;

  @Field(() => [Like])
  likes: Like[];
}
