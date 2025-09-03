import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDTO } from '../shared/models/postDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportsUrl = 'http://localhost:8080/reports';

  constructor(private http: HttpClient) { }

  reportPost(postId: string): Observable<PostDTO> {
    console.log(postId);
    
    return this.http.put<PostDTO>(this.reportsUrl, { postId });
  }
}
