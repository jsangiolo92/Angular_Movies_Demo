import { Component, OnInit } from '@angular/core';
import { Genre } from '../models/genre.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  genres: Genre[];
  searchResults: object[];
  selectedGenre: number;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.fetchGenres();
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

  renderImage(url): string {
    if (url) {
      return `https://image.tmdb.org/t/p/w154/${url}`;
    } else {
      return 'https://cdn.browshot.com/static/images/not-found.png';
    }
  }

  onChange(genreId: number) {
    this.selectedGenre = genreId;
  }

  onMovieClick(movie: object) {
    console.log('you clicked on: ', movie.title);
    console.log(movie);
  }

}
