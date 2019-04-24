import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private movieSub: Subscription;
  private selectedMovie: object;

  constructor(private alertService: AlertService, private searchService: SearchService) { }

  ngOnInit() {
    this.movieSub = this.searchService.selectedMovie.subscribe( (data) => {
      this.selectedMovie = data;
      console.log('selectedMovie in alert component is: ', this.selectedMovie);
    });
  }

  renderImage(url): string {
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
