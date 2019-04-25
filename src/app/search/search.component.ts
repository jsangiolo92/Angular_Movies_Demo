import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../models/genre.model';
import { SearchService } from './search.service';
import { ApiMovie } from '../models/api-movie.model';
import { FavoritesService } from '../favorites/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  genres: Genre[];
  searchResults: ApiMovie[];
  genreSub: Subscription;
  selectedGenre: number;

  constructor(
    private searchService: SearchService,
    private favoritesService: FavoritesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.fetchGenres();
    this.favoritesService.updateFavorites();
    this.genreSub = this.searchService.currentGenre.subscribe( (genreId) => {
      this.selectedGenre = genreId;
    });
  }

  fetchGenres(): void {
    this.searchService.getGenres().subscribe( (response) => {
      console.log(response.responseStatus);
      this.genres = response.categories.genres;
      if (this.selectedGenre) {
        this.fetchMoviesByGenre();
      }
    });
  }

  fetchMoviesByGenre(): void {
    if (!this.selectedGenre) {
      alert('Please select a genre');
    } else {
      this.searchService.getMoviesByGenre(this.selectedGenre).subscribe( (response) => {
        console.log(response.responseStatus);
        this.searchResults = response.moviesOfGenre.results;
      });
    }
  }

  renderImage(url: string): string {
    return this.searchService.renderImage(url, 154);
  }

  onChange(genreId: number) {
    this.searchService.currentGenre.next(genreId);
  }

  onMovieClick(apiMovie: ApiMovie) {
    this.searchService.selectMovie(apiMovie);
    this.router.navigate(['/alert']);
  }

  goToFavorites() {
    this.router.navigate(['favorites']);
  }

  ngOnDestroy() {
    this.genreSub.unsubscribe();
  }

}
