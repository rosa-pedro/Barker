import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-action-tab',
  templateUrl: './action-tab.component.html',
  styleUrls: ['./action-tab.component.scss'],
})
export class ActionTabComponent {
  @Input() likes = 0;
  @Input() title = '';
  @Input() liked = false;

  constructor(private postService: PostService) {}

  like() {
    this.postService.likePost();
  }
}
