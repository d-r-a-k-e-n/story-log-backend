import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetInfoTmdbInput } from 'src/modules/tmdb/models/get-info-tmdb.input';

@Injectable()
export class TmdbService {
  async getInfo({ name, page = 1 }: GetInfoTmdbInput) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${name}&page=${page}`,
    );

    // https://image.tmdb.org/t/p/original/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg

    return response.data.results
      .filter(
        (item: { media_type: string }) =>
          item.media_type === 'movie' || item.media_type === 'tv',
      )
      .map(
        (item: {
          title?: string;
          name?: string;
          overview: string;
          poster_path: string;
        }) => ({
          title: item.title ?? item.name ?? 'Unknown',
          overview: item.overview ?? '',
          posterPath: item.poster_path ?? '',
        }),
      );
  }
}
