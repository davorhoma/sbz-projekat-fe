import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from '../shared/postDTO.model';

interface PostCreateRequest {
  text: string;
  hashtags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private postsUrl = 'http://localhost:8080/posts/';
  
  constructor(private http: HttpClient) { }

  createPost(data: PostCreateRequest): Observable<any> {
    return this.http.post(this.postsUrl, data);
  }

  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.postsUrl);
  }

  getUserPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.postsUrl}user-posts`);
  }
}
