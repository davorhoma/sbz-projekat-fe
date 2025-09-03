import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostDTO } from 'src/app/shared/postDTO.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent {

  posts: PostDTO[] = [];
  errorMessage: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getUserPosts().subscribe({
      next: (res) => this.posts = res,
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to fetch posts';
      }
    });
  }
}
