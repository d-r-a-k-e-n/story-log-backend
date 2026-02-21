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
    author,
    rating,
    userId,
    genreId,
    typeId,
    statusId,
  }: EntryDto) {
    // const image = await

    return await this.prisma.entry.create({
      data: {
        title,
        description,
        author,
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
}
