import { Component, Input } from '@angular/core';
import { MicroPost } from '../../models/micro-post.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() post!: MicroPost;

  openPost() {
    console.log('Open post ' + this.post.title);
  }
}
