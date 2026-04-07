import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EntryDto } from 'src/modules/entry/dto/entry.dto';
import { IJwtPayload } from 'src/modules/auth/types/jwtPayload.interface';

@Injectable()
export class EntryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllEntry() {
    return this.prisma.entry.findMany();
  }

  async createEntry(
    {
      title,
      description,
      image,
      rating,
      userId,
      genreIds,
      typeId,
      statusId,
    }: EntryDto,
    authHeader?: string,
  ) {
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : undefined;

    let resolvedUserId = userId;
    if (!resolvedUserId && token) {
      try {
        const payload = await this.jwtService.verifyAsync<IJwtPayload>(token, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
        resolvedUserId = payload.id;
      } catch {
        throw new UnauthorizedException('Invalid access token');
      }
    }

    if (!resolvedUserId) {
      throw new BadRequestException('User id is required');
    }
    if (!genreIds?.length) {
      throw new BadRequestException('At least one genre is required');
    }
    if (!statusId) {
      throw new BadRequestException('Status is required');
    }

    return await this.prisma.entry.create({
      data: {
        title,
        description,
        rating,
        image,
        user: { connect: { id: resolvedUserId } },
        genreIds,
        type: { connect: { id: typeId } },
        status: { connect: { id: statusId } },
      } as any,
    });
  }

  async deleteEntry(id: number) {
    return await this.prisma.entry.delete({ where: { id } });
  }

  async getAllGenres() {
    return this.prisma.genre.findMany();
  }

  async getAllTypes() {
    return this.prisma.mediaType.findMany();
  }

  async getAllStatuses() {
    return this.prisma.status.findMany();
  }
}
