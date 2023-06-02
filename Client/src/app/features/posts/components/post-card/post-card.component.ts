import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../../core/models/post/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post!: Post;

  constructor(private router: Router) {}

  openPost() {
    this.router.navigate(['posts', this.post.id]);
  }
}
