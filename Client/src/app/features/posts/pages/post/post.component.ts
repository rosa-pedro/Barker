import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../../../core/models/post/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Observable<Post> | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.post = null
  }
}
