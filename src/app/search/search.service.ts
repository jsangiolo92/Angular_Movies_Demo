import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { APIResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private genresUrl = 'http://localhost:4000/api';
  private moviesUrl = 'http://localhost:4000/api/genre';
  public genres = new BehaviorSubject([]);
  public selectedGenre = new BehaviorSubject(null);
  public searchResults = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  fetchGenres(): void {
    this.http.get<APIResponse>(this.genresUrl).subscribe( (response) => {
      console.log(response.responseStatus);
      this.genres.next(response.categories.genres);
    });
  }

  fetchMoviesByGenre(genreId): void {
    this.http.get<APIResponse>(`${this.moviesUrl}/${genreId}`).subscribe( (response) => {
      console.log(response.responseStatus);
      this.searchResults.next(response.moviesOfGenre.results);
    });
  }

  renderImage(url: string, size: number): string {
    if (url) {
      return `https://image.tmdb.org/t/p/w${size}/${url}`;
    } else {
      return 'https://cdn.browshot.com/static/images/not-found.png';
    }
  }

  updateSelectedGenre(genreId: number) {
    this.selectedGenre.next(genreId);
  }

  resetSearchResults() {
    this.searchResults.next([]);
  }

  getSelectedGenre() {
    return this.selectedGenre.asObservable();
  }

  getGenres() {
    return this.genres.asObservable();
  }

  getSearchResults() {
    return this.searchResults.asObservable();
  }
}
