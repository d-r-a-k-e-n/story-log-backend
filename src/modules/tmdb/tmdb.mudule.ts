import { Module } from '@nestjs/common';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';
import { TmdbResolver } from 'src/modules/tmdb/tmdb.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [TmdbService, TmdbResolver],
})
export class TmdbModule {}
