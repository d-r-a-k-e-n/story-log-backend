import { Args, Query, Resolver } from '@nestjs/graphql';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';
import { GetInfoTmdb } from 'src/modules/tmdb/models/get-info-tmdb';

@Resolver('Tmdb')
export class TmdbResolver {
  constructor(private readonly tmdbService: TmdbService) {}

  @Query(() => [GetInfoTmdb])
  async getInfo(@Args('name', { type: () => String }) name: string) {
    return await this.tmdbService.getInfo(name);
  }
}
