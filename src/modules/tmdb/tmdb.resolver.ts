import { Args, Query, Resolver } from '@nestjs/graphql';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';
import { GetInfoTmdb } from 'src/modules/tmdb/models/get-info-tmdb.model';
import { GetInfoTmdbInput } from 'src/modules/tmdb/models/get-info-tmdb.input';

@Resolver('Tmdb')
export class TmdbResolver {
  constructor(private readonly tmdbService: TmdbService) {}

  @Query(() => [GetInfoTmdb])
  async getInfo(
    @Args('input', { type: () => GetInfoTmdbInput }) input: GetInfoTmdbInput,
  ) {
    return await this.tmdbService.getInfo(input);
  }
}
