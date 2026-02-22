import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { IJwtPayload } from 'src/modules/auth/types/jwtPayload.interface';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private async generateTokens(payload: IJwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_LIFETIME),
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: Number(process.env.JWT_REFRESH_TOKEN_LIFETIME),
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    return { accessToken, refreshToken };
  }

  async register({ email, password, name }: RegisterDto) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = name || email.split('@')[0];
    return await this.userService.createUser({
      email,
      password: hashedPassword,
      name: userName,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('Email or password is incorrect');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException('Email or password is incorrect');

    const payload: IJwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return this.generateTokens(payload);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });

      const tokens = await this.generateTokens({
        id: payload.id,
        name: payload.name,
        email: payload.email,
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUsers() {
    return await this.userService.getUsers();
  }
}
