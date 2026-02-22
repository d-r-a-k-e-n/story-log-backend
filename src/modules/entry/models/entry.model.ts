import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/auth/models/user.model';

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

  @Field(() => Genre)
  genre: Genre;

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

  @Field(() => Int, { nullable: true })
  rating: number;

  @Field(() => Status, { nullable: true })
  status: Status;

  @Field(() => [Like])
  likes: Like[];
}
