import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Subject,
} from 'rxjs';
import { FullPost } from '../../../core/models/post/full-post.model';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../core/models/post/post.model';

interface RequestSpec {
  pageSize?: number;
  pageNumber?: number;
  username?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiUrl;

  private pageNumber = 0;
  private pageSize = 0;

  private currentPostSource =
    new Subject<FullPost>();

  currentPost$ =
    this.currentPostSource.asObservable();

  private postsSource = new BehaviorSubject<
    Post[] | null
  >(null);

  posts$ = this.postsSource.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  getPosts() {
    return this.getPostsFinalize('posts');
  }

  private getPostsFinalize(requestEnd: string) {
    return this.http
      .get<Post[]>(this.baseUrl + requestEnd)
      .pipe(
        map((response: Post[]) => {
          const posts = response;
          if (posts) {
            const curPosts =
              this.postsSource.value;
            if (curPosts) {
              this.postsSource.next([
                ...curPosts,
                ...posts,
              ]);
            } else {
              this.postsSource.next(posts);
            }
          }
        })
      );
  }

  getNextPosts() {
    return this.getPostsAux({
      pageNumber: this.pageNumber + 1,
    } as RequestSpec);
  }

  getPostsAux(spec: RequestSpec) {
    let requestEnd = 'posts';
    if (spec.pageNumber) {
      requestEnd =
        requestEnd +
        '?pageNumber=' +
        spec.pageNumber;
    }

    return this.getPostsFinalize(requestEnd);
  }

  getPost() {
    // const post = fullPosts.find(
    //   (p) =>
    //     p.id === this.router.url.split('/').at(-1)
    // );
    // return of(post!);
  }

  likePost() {}
}
