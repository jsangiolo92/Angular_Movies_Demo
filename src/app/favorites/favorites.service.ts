import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseResponse } from '../models/database-response.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesEndPoint = 'http://localhost:4000/favorites';
  public favoriteMovies = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<DatabaseResponse> {
    return this.http.get<DatabaseResponse>(this.favoritesEndPoint);
  }

  updateFavorites() {
    this.getFavorites().subscribe( (response) => {
      console.log(response.responseStatus);
      this.favoriteMovies.next(response.favoriteMovies);
    });
  }
}
