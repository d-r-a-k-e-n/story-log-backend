import { Resolver } from '@nestjs/graphql';
import { UserService } from 'src/modules/user/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
