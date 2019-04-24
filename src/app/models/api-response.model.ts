import { Genre } from './genre.model';

export interface APIResponse {
  responseStatus: object;
  categories: {
    genres: Genre[];
  };
  moviesOfGenre: {
    results: object[];
  };
}
