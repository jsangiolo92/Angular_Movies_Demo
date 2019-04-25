import { DatabaseMovie } from './database-movie.model';

export interface DatabaseResponse {
  responseStatus: object;
  favoriteMovies: DatabaseMovie[];
}
