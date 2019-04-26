import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiMovie } from '../models/api-movie.model';
import { DatabaseMovie } from '../models/database-movie.model';
import { DatabaseResponse } from '../models/database-response.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private postEndPoint = 'http://localhost:4000/favorites';
  public selectedMovie = new BehaviorSubject({});

  constructor(
    private router: Router,
    private http: HttpClient
    ) {}

  postToFavorites(movieObj: ApiMovie): void {
    const newFavorite: DatabaseMovie = {
      id: movieObj.id,
      title: movieObj.title,
      releaseDate: movieObj.release_date,
      voteAverage: movieObj.vote_average,
      posterPath: movieObj.poster_path,
      overview: movieObj.overview
    };

    this.http.post<DatabaseResponse>(this.postEndPoint, newFavorite).subscribe( (response) => {
      console.log(response.responseStatus);
      this.cancelSelection();
    });
  }

  updateSelectedMovie(movie: ApiMovie) {
    this.selectedMovie.next(movie);
  }

  getSelectedMovie() {
    return this.selectedMovie.asObservable();
  }

  cancelSelection(): void {
    this.selectedMovie.next({});
    this.router.navigate(['']);
  }
}
