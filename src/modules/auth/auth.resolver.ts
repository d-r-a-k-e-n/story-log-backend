import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/auth/models/user.model';
import { Tokens } from 'src/modules/auth/models/tokens.model';
import { RegisterUserInput } from 'src/modules/auth/models/register-user.input';
import { LoginUserInput } from 'src/modules/auth/models/login-user.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly userService: AuthService) {}

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Mutation(() => User)
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
