import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';
import { SearchService } from '../search/search.service';
import { ApiMovie } from '../models/api-movie.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private movieSub: Subscription;
  public selectedMovie: ApiMovie;

  constructor(private alertService: AlertService, private searchService: SearchService) { }

  ngOnInit() {
    this.movieSub = this.alertService.getSelectedMovie().subscribe( (data) => {
      this.selectedMovie = data;
    });
  }

  renderImage(url: string): string {
    return this.searchService.renderImage(url, 342);
  }

  addToFavorites() {
    this.alertService.postToFavorites(this.selectedMovie);
  }

  cancelSelection() {
    this.alertService.cancelSelection();
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }
}
