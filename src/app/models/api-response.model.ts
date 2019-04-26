import { Genre } from './genre.model';
import { ApiMovie } from './api-movie.model';
import { ResponseStatus } from './response-status.model';

export interface APIResponse {
  responseStatus: ResponseStatus;
  categories: {
    genres: Genre[];
  };
  moviesOfGenre: {
    results: ApiMovie[];
  };
}
