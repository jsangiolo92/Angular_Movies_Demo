import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseMovie } from '../models/database-movie.model';
import { Subscription } from 'rxjs';
import { FavoritesService } from './favorites.service';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  private favoritesSub: Subscription;
  public favoriteMovies: DatabaseMovie[];

  constructor(
    private favoritesService: FavoritesService,
    private searchService: SearchService,
    private router: Router
    ) { }

  ngOnInit() {
    this.favoritesSub = this.favoritesService.favoriteMovies.subscribe( (data) => {
      this.favoriteMovies = data;
    });
  }

  renderImage(url: string): string {
    return this.searchService.renderImage(url, 154);
  }

  goToSearch() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.favoritesSub.unsubscribe();
  }
}
