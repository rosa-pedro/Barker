import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MicroPost } from '../../../../core/models/micro-post.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() post!: MicroPost;

  constructor(private router: Router) {}

  openPost() {
    console.log('Open post ' + this.post.title);
    this.router.navigate(['posts', this.post.id]);
  }
}
