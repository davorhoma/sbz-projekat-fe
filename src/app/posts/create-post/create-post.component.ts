import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  text: string = '';
  hashtags: string[] = [];
  newHashtag: string = '';

  constructor(private postService: PostService) {}

  addHashtag() {
    const tag = this.newHashtag.trim();
    if (tag && !this.hashtags.includes(tag)) {
      this.hashtags.push(tag);
      this.newHashtag = '';
    }
  }

  removeHashtag(tag: string) {
    this.hashtags = this.hashtags.filter(t => t !== tag);
  }

  submitPost() {
    if (!this.text.trim()) {
      alert('Text is required!');
      return;
    }

    const postData = {
      text: this.text,
      hashtags: this.hashtags
    };

    this.postService.createPost(postData).subscribe({
      next: res => {
        console.log('Post created', res);
        this.resetForm();
      },
      error: err => {
        console.error('Error creating post', err);
      }
    });
  }

  resetForm() {
    this.text = '';
    this.hashtags = [];
    this.newHashtag = '';
  }
}
