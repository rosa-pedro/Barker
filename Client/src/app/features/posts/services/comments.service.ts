import { Injectable } from '@angular/core';
import { Comment } from '../../../core/models/comment/comment.model';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  baseUrl = environment.apiUrl;

  private currentCommentsSource = new BehaviorSubject<Comment[] | null>(null);
  currentComments$ = this.currentCommentsSource.asObservable();
  constructor(private http: HttpClient) {}

  createHubConnection() {}

  getComments(postId: number) {
    return this.http
      .get<Comment[]>(this.baseUrl + 'posts/' + postId + '/comments')
      .pipe(
        map((comments: Comment[]) => {
          if (comments) {
            this.currentCommentsSource.next(comments);
          }
        })
      );
  }

  sendComment(postId: number, content: string) {
    return this.http
      .post<Comment>(this.baseUrl + 'posts/' + postId + '/comments', {
        content: content,
      })
      .pipe(
        map((comment: Comment) => {
          let curComments = this.currentCommentsSource.value;
          curComments?.unshift(comment);
          this.currentCommentsSource.next(curComments);
        })
      );
  }
}
