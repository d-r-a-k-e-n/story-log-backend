import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EntryDto } from 'src/modules/entry/dto/entry.dto';

@Injectable()
export class EntryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEntry() {
    return this.prisma.entry.findMany();
  }

  async createEntry({
    title,
    description,
    rating,
    userId,
    genreId,
    typeId,
    statusId,
  }: EntryDto) {
    return await this.prisma.entry.create({
      data: {
        title,
        description,
        rating,
        user: { connect: { id: userId } },
        genre: { connect: { id: genreId } },
        type: { connect: { id: typeId } },
        status: { connect: { id: statusId } },
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
