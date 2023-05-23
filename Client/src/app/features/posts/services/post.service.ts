import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { FullPost } from '../../../core/models/full-post.model';
import { fullPosts } from '../../../shared/dummy/fullPosts';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postSource = new Subject<FullPost>();
  post$ = this.postSource.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getPost() {
    const post = fullPosts.find(
      (p) =>
        p.id === this.router.url.split('/').at(-1)
    );

    return of(post!);
  }

  likePost() {
    fullPosts[0].liked = true;
    this.postSource.next(fullPosts[0]);
  }
}
