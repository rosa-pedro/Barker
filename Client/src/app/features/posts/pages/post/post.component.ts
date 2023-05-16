import { Component, OnInit } from '@angular/core';
import { fullPosts } from 'src/app/shared/dummy/fullPosts';
import { FullPost } from '../../../../core/models/full-post.model';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Observable<FullPost> | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post = this.postService.getPost();
    this.postService
      .getPost()
      .subscribe((v) => console.log(v));
  }
}
