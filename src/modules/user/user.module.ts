import { Module } from '@nestjs/common';
import { UserResolver } from 'src/modules/user/user.resolver';
import { UserService } from 'src/modules/user/user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserResolver, UserService],
})
export class UserModule {}
