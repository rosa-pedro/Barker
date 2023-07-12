import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-tab',
  templateUrl: './posts-tab.component.html',
  styleUrls: ['./posts-tab.component.scss'],
})
export class PostsTabComponent {
  constructor(
    readonly profileService: ProfileService,
    private router: Router
  ) {}

  goToPost(id: number) {
    this.router.navigate(['posts', id]);
  }

  newPost() {
    this.router.navigate(['./new-post']);
  }
}
