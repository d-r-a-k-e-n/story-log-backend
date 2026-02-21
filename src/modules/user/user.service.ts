import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/modules/user/dto/register.dto';
import { LoginDto } from 'src/modules/user/dto/login.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register({ email, password, name }: RegisterDto) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
      },
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
