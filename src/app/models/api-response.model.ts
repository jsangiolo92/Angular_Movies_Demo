import { Genre } from './genre.model';
import { ApiMovie } from './api-movie.model';

export interface APIResponse {
  responseStatus: object;
  categories: {
    genres: Genre[];
  };
  moviesOfGenre: {
    results: ApiMovie[];
  };
}
