import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../models/genre.model';
import { SearchService } from './search.service';
import { ApiMovie } from '../models/api-movie.model';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  genresSub: Subscription;
  genres: Genre[];
  searchSub: Subscription;
  searchResults: ApiMovie[];
  selectedGenreSub: Subscription;
  selectedGenre: number;

  constructor(
    private alertService: AlertService,
    private searchService: SearchService,
    private router: Router
    ) { }

  ngOnInit() {
    this.selectedGenreSub = this.searchService.getSelectedGenre().subscribe( (genreId) => {
      this.selectedGenre = genreId;
    });
    this.genresSub = this.searchService.getGenres().subscribe( (data) => {
      this.genres = data;
    });
    this.searchSub = this.searchService.getSearchResults().subscribe( (data) => {
      this.searchResults = data;
    });
    this.fetchGenres();
  }

  fetchGenres(): void {
    if (!this.genres.length) {
      this.searchService.fetchGenres();
    }
  }

  fetchMoviesByGenre(): void {
    if (!this.selectedGenre) {
      alert('Please select a genre');
    } else {
      this.searchService.fetchMoviesByGenre(this.selectedGenre);
    }
  }

  renderImage(url: string): string {
    return this.searchService.renderImage(url, 154);
  }

  onChange(genreId: number) {
    this.searchService.updateSelectedGenre(genreId);
  }

  onMovieClick(movie: ApiMovie) {
    this.alertService.updateSelectedMovie(movie);
    this.router.navigate(['/alert']);
  }

  goToFavorites() {
    this.searchService.resetSearchResults();
    this.router.navigate(['favorites']);
  }

  ngOnDestroy() {
    this.genresSub.unsubscribe();
    this.selectedGenreSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

}
