import { DatabaseMovie } from './database-movie.model';
import { ResponseStatus } from './response-status.model';

export interface DatabaseResponse {
  responseStatus: ResponseStatus;
  favoriteMovies: DatabaseMovie[];
}
