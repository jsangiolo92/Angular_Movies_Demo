import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private genresUrl = 'http://localhost:4000/api';
  private moviesUrl = 'http://localhost:4000/api/genre';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.genresUrl);
  }

  getMoviesByGenre(genreId): Observable<APIResponse> {
    const endPoint = `${this.moviesUrl}/${genreId}`;
    return this.http.get<APIResponse>(endPoint);
  }
}
