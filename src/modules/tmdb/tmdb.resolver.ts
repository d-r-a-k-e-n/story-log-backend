import { Args, Query, Resolver } from '@nestjs/graphql';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';
import { GetInfoFromTmdb } from 'src/modules/tmdb/types/get-info-from-tmdb.model';
import { GetInfoFromTmdbInput } from 'src/modules/tmdb/types/get-info-from-tmdb.input';

@Resolver('Tmdb')
export class TmdbResolver {
  constructor(private readonly tmdbService: TmdbService) {}

  @Query(() => [GetInfoFromTmdb])
  async getInfoFromTmdb(
    @Args('input', { type: () => GetInfoFromTmdbInput })
    input: GetInfoFromTmdbInput,
  ) {
    return await this.tmdbService.getInfoFromTmdb(input);
  }
}
