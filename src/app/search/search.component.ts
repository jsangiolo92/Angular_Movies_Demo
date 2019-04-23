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

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.fetchGenres();
  }

  fetchGenres() {
    console.log('fetchGenres called');
    this.searchService.getGenres().subscribe( (response) => {
      console.log(response.responseStatus);
      this.genres = response.categories.genres;
    });
  }

}
