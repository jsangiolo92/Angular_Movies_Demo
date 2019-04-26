import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseResponse } from '../models/database-response.model';
import { DatabaseMovie } from '../models/database-movie.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesEndPoint = 'http://localhost:4000/favorites';
  public favoriteMovies = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getFavorites(): void {
    this.http.get<DatabaseResponse>(this.favoritesEndPoint).subscribe( (response) => {
      this.favoriteMovies.next(response.favoriteMovies);
      console.log(response.responseStatus);
    });

  }

  deleteFavorites(movieId: number): void {
    this.http.delete<DatabaseResponse>(`${this.favoritesEndPoint}/${movieId}`).subscribe( (response) => {
      console.log(response.responseStatus);
      this.getFavorites();
    });
  }

  getter(): Observable<DatabaseMovie[]> {
    return this.favoriteMovies.asObservable();
  }
}
