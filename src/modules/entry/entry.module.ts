import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { EntryResolver } from 'src/modules/entry/entry.resolver';
import { EntryService } from 'src/modules/entry/entry.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    }),
  ],
  controllers: [],
  providers: [EntryResolver, EntryService],
})
export class EntryModule {}
