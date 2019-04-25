import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../models/genre.model';
import { SearchService } from './search.service';
import { ApiMovie } from '../models/api-movie.model';
import { FavoritesService } from '../favorites/favorites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  genres: Genre[];
  searchResults: ApiMovie[];
  selectedGenre: number;

  constructor(
    private searchService: SearchService,
    private favoritesService: FavoritesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.fetchGenres();
    this.favoritesService.updateFavorites();
  }

  fetchGenres(): void {
    this.searchService.getGenres().subscribe( (response) => {
      console.log(response.responseStatus);
      this.genres = response.categories.genres;
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
    this.selectedGenre = genreId;
  }

  onMovieClick(apiMovie: ApiMovie) {
    this.searchService.selectMovie(apiMovie);
    this.router.navigate(['/alert']);
  }

  goToFavorites() {
    this.router.navigate(['favorites']);
  }

}
