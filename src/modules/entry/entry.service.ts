import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { EntryDto } from "src/modules/entry/dto/entry.dto";
import { IJwtPayload } from "src/modules/auth/types/jwtPayload.interface";

@Injectable()
export class EntryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async getAllEntry() {
    const entries = await this.prisma.entry.findMany({
      include: {
        status: true,
        type: true,
        genres: true,
      },
    });

    return entries;
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
    authHeader?: string
  ) {
    const token = authHeader?.startsWith("Bearer ")
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
        throw new UnauthorizedException("Invalid access token");
      }
    }

    if (!resolvedUserId) {
      throw new BadRequestException("User id is required");
    }
    if (!genreIds?.length) {
      throw new BadRequestException("At least one genre is required");
    }
    if (!typeId) {
      throw new BadRequestException("Type is required");
    }
    if (!statusId) {
      throw new BadRequestException("Status is required");
    }

    const normalizedGenreIds = [...new Set(genreIds)];
    const existingGenres = await this.prisma.genre.findMany({
      where: { id: { in: normalizedGenreIds } },
      select: { id: true },
    });

    if (existingGenres.length !== normalizedGenreIds.length) {
      const existingGenreIds = new Set(existingGenres.map((genre) => genre.id));
      const missingGenreIds = normalizedGenreIds.filter(
        (id) => !existingGenreIds.has(id)
      );

      throw new BadRequestException(
        `Invalid genre ids: ${missingGenreIds.join(", ")}`
      );
    }

    return await this.prisma.entry.create({
      data: {
        title,
        description,
        rating,
        image: image
          ? image
          : "https://raw.githubusercontent.com/d-r-a-k-e-n/Harry-Potter/refs/heads/main/img/unknown.jpg",
        user: { connect: { id: resolvedUserId } },
        genres: {
          connect: normalizedGenreIds.map((id) => ({ id })),
        },
        type: { connect: { id: typeId } },
        status: { connect: { id: statusId } },
      },
      include: {
        genres: {
          select: { id: true, name: true },
        },
        type: true,
        status: true,
      },
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
