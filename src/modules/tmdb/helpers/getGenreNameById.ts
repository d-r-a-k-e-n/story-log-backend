import axios from 'axios';

interface ITmdbGenre {
  id: number;
  name: string;
}

interface ITmdbGenreListResponse {
  genres: ITmdbGenre[];
}

export async function getGenreNameById(
  id: number,
  type: 'movie' | 'tv',
): Promise<string | null> {
  const url =
    type === 'movie'
      ? 'https://api.themoviedb.org/3/genre/movie/list'
      : 'https://api.themoviedb.org/3/genre/tv/list';

  const { data } = await axios.get<ITmdbGenreListResponse>(url, {
    params: { api_key: process.env.TMDB_API_KEY },
  });

  const genre = data.genres.find((g) => g.id === id);
  return genre ? genre.name : null;
}
