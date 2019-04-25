import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { APIResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private genresUrl = 'http://localhost:4000/api';
  private moviesUrl = 'http://localhost:4000/api/genre';
  public selectedMovie = new BehaviorSubject({});
  public currentGenre = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getGenres(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.genresUrl);
  }

  getMoviesByGenre(genreId): Observable<APIResponse> {
    const endPoint = `${this.moviesUrl}/${genreId}`;
    return this.http.get<APIResponse>(endPoint);
  }

  renderImage(url: string, size: number): string {
    if (url) {
      return `https://image.tmdb.org/t/p/w${size}/${url}`;
    } else {
      return 'https://cdn.browshot.com/static/images/not-found.png';
    }
  }
}
