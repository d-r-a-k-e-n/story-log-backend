import { Module } from '@nestjs/common';
import { UserResolver } from 'src/modules/user/user.resolver';
import { UserService } from 'src/modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: +process.env.JWT_ACCESS_TOKEN_LIFETIME!,
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [UserResolver, UserService],
})
export class UserModule {}
