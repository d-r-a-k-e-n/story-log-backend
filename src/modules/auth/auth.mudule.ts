import { Module } from '@nestjs/common';
import { AuthResolver } from 'src/modules/auth/auth.resolver';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: +process.env.JWT_ACCESS_TOKEN_LIFETIME!,
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [AuthResolver, AuthService, UserService],
})
export class AuthModule {}
