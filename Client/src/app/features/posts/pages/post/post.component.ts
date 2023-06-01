import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../../../core/models/post/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Observable<Post> | undefined;

  constructor(public postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.postService.getPost(this.route.snapshot.params['id']).subscribe();
    // this.post = null
  }
}
