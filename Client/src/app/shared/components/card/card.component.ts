import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MicroPost } from '../../../core/models/post/micro-post.model';
import { Post } from '../../../core/models/post/post.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() mpost!: MicroPost;
  @Input() post!: Post;

  constructor(private router: Router) {}

  openPost() {
    console.log('Open post ' + this.post.title);
    this.router.navigate(['posts', this.post.id]);
  }
}
