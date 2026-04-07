import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetInfoFromTmdbInput } from 'src/modules/tmdb/types/get-info-from-tmdb.input';
import { IItemFromTmdbResponse } from 'src/modules/tmdb/types/item-from-tmdb-response.interface';
import { getGenreNameById } from 'src/modules/tmdb/helpers/getGenreNameById';

@Injectable()
export class TmdbService {
  async getInfoFromTmdb({ name, page = 1 }: GetInfoFromTmdbInput) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${name}&page=${page}`,
    );
    const URL = 'https://image.tmdb.org/t/p/original';

    return response.data.results
      .filter(
        (item: { media_type: string }) =>
          item.media_type === 'movie' || item.media_type === 'tv',
      )
      .map(
        ({
          title,
          name,
          overview,
          poster_path,
          vote_average,
          genre_ids,
          media_type,
        }: IItemFromTmdbResponse) => ({
          title: title || name || 'No title',
          overview: overview || 'No overview',
          posterPath: `${URL}${poster_path}` || '',
          rating: vote_average || 0,
          genreIds: genre_ids.map((id: number) =>
            getGenreNameById(id, media_type),
          ),
          mediaType: media_type,
        }),
      );
  }
}
