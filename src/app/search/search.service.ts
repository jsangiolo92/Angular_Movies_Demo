import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.url);
  }
}
