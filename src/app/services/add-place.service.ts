import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPlaceRequest } from '../shared/models/addPlace.model';

@Injectable({
  providedIn: 'root'
})
export class AddPlaceService {

  private placesUrl = 'http://localhost:8080/places/';

  constructor(private http: HttpClient) { }

  addPlace(data: AddPlaceRequest): Observable<any> {
    return this.http.post(`${this.placesUrl}`, data);
  }
}
