import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPlaceRequest } from '../shared/models/addPlace.model';
import { PlaceDTO } from '../shared/models/place.model';

export interface RatingRequest {
  placeId: string;
  score: number;
  description: string;
  hashtag: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl = 'http://localhost:8080/places/';
  private ratingsUrl = 'http://localhost:8080/ratings/';

  constructor(private http: HttpClient) { }

  addPlace(data: AddPlaceRequest): Observable<any> {
    return this.http.post(`${this.placesUrl}`, data);
  }

  getAllPlaces(): Observable<PlaceDTO[]> {
    return this.http.get<PlaceDTO[]>(this.placesUrl);
  }

  rate(data: RatingRequest): Observable<PlaceDTO> {
    return this.http.put<PlaceDTO>(`${this.ratingsUrl}rate`, data);
  }
}
