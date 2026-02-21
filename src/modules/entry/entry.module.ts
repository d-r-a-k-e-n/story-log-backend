import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { EntryResolver } from 'src/modules/entry/entry.resolver';
import { EntryService } from 'src/modules/entry/entry.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [EntryResolver, EntryService],
})
export class EntryModule {}
