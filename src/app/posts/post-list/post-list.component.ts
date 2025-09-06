import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ReportService } from 'src/app/services/report.service';
import { PostDTO } from 'src/app/shared/models/postDTO.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  posts: PostDTO[] = [];
  errorMessage: string = '';

  constructor(private postService: PostService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getFeedPosts().subscribe({
      next: (res) => {
        this.posts = res
        console.log(this.posts);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to fetch posts';
      }
    });
  }

  likePost(postId: string) {
    this.postService.likePost(postId).subscribe({
      next: (updatedPost: PostDTO) => {
        const index = this.posts.findIndex(p => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  reportPost(postId: string) {
    this.reportService.reportPost(postId).subscribe({
      next: (updatedPost: PostDTO) => {
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
