export interface IItemFromTmdbResponse {
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  media_type: 'movie' | 'tv';
}
