import { SearchService } from '../search/search.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router, private searchService: SearchService) {}

  postToFavorites(movieObj: object) {
    this.cancelSelection();
  }

  cancelSelection() {
    this.searchService.selectMovie({});
    this.router.navigate(['']);
  }

}
