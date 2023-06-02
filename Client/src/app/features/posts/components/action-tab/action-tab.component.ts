import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-action-tab',
  templateUrl: './action-tab.component.html',
  styleUrls: ['./action-tab.component.scss'],
})
export class ActionTabComponent {
  @Input() votes = 0;
  @Input() title = '';
  @Input() voted? = -1 | 0 | 1;

  constructor() {}
}
