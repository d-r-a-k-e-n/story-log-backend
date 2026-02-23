import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    return await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
