import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/models/user.model';
import { Tokens } from 'src/modules/user/models/tokens.model';
import { RegisterUserInput } from 'src/modules/user/models/register-user.input';
import { LoginUserInput } from 'src/modules/user/models/login-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Mutation(() => Tokens)
  async register(
    @Args('input', { type: () => RegisterUserInput }) input: RegisterUserInput,
  ) {
    return await this.userService.register(input);
  }

  @Mutation(() => Tokens)
  async login(
    @Args('input', { type: () => LoginUserInput }) input: LoginUserInput,
  ) {
    return await this.userService.login(input);
  }

  @Mutation(() => Tokens)
  async refreshToken(
    @Args('refreshToken', { type: () => String }) refreshToken: string,
  ) {
    return await this.userService.refreshToken(refreshToken);
  }
}
