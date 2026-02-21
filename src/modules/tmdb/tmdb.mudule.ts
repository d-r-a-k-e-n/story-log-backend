import { Module } from '@nestjs/common';
import { TmdbResolver } from 'src/modules/tmdb/tmdb.resolver';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TmdbResolver, TmdbService],
})
export class TmdbModule {}
