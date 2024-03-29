import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../core/models/post/post.model';
import { FullPost } from '../../../core/models/post/full-post.model';
import { Comment } from '../../../core/models/comment/comment.model';

export interface RequestSpec {
  pageSize?: number;
  pageNumber?: number;
  username?: string;
  orderBy?: string;
  from?: string;
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiUrl;

  private pageNumber = 1;

  private currentPostSource = new BehaviorSubject<FullPost | null>(null);
  currentPost$ = this.currentPostSource.asObservable();

  private currentCommentsSource = new BehaviorSubject<Comment[] | null>(null);
  currentComments$ = this.currentCommentsSource.asObservable();

  private postsSource = new BehaviorSubject<Post[] | null>(null);
  posts$ = this.postsSource.asObservable();

  hasNext = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  getPosts() {
    this.pageNumber = 1;

    return this.getPostsFinalize('posts');
  }

  private getPostsFinalize(
    requestEnd: string,
    isNext?: boolean
  ): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + requestEnd).pipe(
      map((response: Post[]) => {
        const posts = response;
        if (posts && posts.length > 0) {
          const curPosts = this.postsSource.value;
          if (curPosts && isNext) {
            this.postsSource.next([...curPosts, ...posts]);
          } else {
            this.hasNext = true;
            this.pageNumber = 1;
            this.postsSource.next(posts);
          }
        } else {
          this.hasNext = false;
        }
        return response;
      })
    );
  }

  getNextPosts() {
    this.pageNumber += 1;
    return this.getPostsFiltered(
      {
        pageNumber: this.pageNumber,
      } as RequestSpec,
      true
    );
  }

  getPostsFiltered(spec: RequestSpec, isNext: boolean) {
    let requestEnd = 'posts?';
    if (spec.pageNumber) {
      requestEnd = requestEnd + 'pageNumber=' + spec.pageNumber + '&';
    }
    if (spec.orderBy) {
      requestEnd = requestEnd + 'OrderBy=' + spec.orderBy + '&';
    }
    if (spec.from) {
      requestEnd = requestEnd + 'From=' + spec.from + '&';
    }
    if (spec.username) {
      requestEnd = requestEnd + 'username=' + spec.username + '&';
    }
    if (spec.search) {
      requestEnd = requestEnd + 'Search=' + spec.search + '&';
    }
    return this.getPostsFinalize(requestEnd, isNext);
  }

  getPost(postId: number) {
    this.pageNumber = 0;
    return this.http.get<Post>(this.baseUrl + 'posts/' + postId).pipe(
      map((post: Post) => {
        if (post) {
          this.currentPostSource.next(post);
        }
      })
    );
  }

  upVote(postId: number) {
    return this.http
      .post<Vote>(this.baseUrl + `posts/${postId}/up-vote`, {})
      .pipe(
        map((voteResponse) => {
          if (voteResponse) {
            let curPost: FullPost = {
              ...this.currentPostSource.value!,
              votes: voteResponse.totalVotes,
              userVote: voteResponse.vote,
            };
            this.currentPostSource.next(curPost);
          }
        })
      );
  }

  downVote(postId: number) {
    return this.http
      .post<Vote>(this.baseUrl + `posts/${postId}/down-vote`, {})
      .pipe(
        map((voteResponse) => {
          if (voteResponse) {
            let curPost: FullPost = {
              ...this.currentPostSource.value!,
              votes: voteResponse.totalVotes,
              userVote: voteResponse.vote,
            };
            this.currentPostSource.next(curPost);
          }
        })
      );
  }

  addPost(post: NewPost) {
    return this.http.post<Post>(this.baseUrl + 'posts', post);
  }

  setPetPhoto(postId: number, photo: File) {
    const data: FormData = new FormData();
    data.append('Photo', photo);

    return this.http.post(
      this.baseUrl + `posts/${postId}/set-featured-photo`,
      data
    );
  }
}

export interface NewPost {
  title: string;
  content: string;
}

interface Vote {
  postId: number;
  totalVotes: number;
  vote: number;
  voter: string;
}
