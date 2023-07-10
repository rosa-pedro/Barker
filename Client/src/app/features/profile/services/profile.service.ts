import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Member } from '../../../core/models/member/member.model';
import { PostService, RequestSpec } from '../../posts/services/post.service';
import { Post } from '../../../core/models/post/post.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = environment.apiUrl;

  private memberSource = new BehaviorSubject<Member | null>(null);
  member$ = this.memberSource.asObservable();

  private userPostsSource = new BehaviorSubject<Post[] | null>(null);
  userPosts$ = this.userPostsSource.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private postService: PostService
  ) {}

  getMember(userName: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + userName).pipe(
      map((member: Member) => {
        if (member) {
          this.memberSource.next({
            ...member,
            lastActive: new Date(member.lastActive),
          });
        }
      })
    );
  }

  getPostsFromUser(username: string) {
    const fromUser: RequestSpec = {
      username: username,
    };
    return this.postService.getPostsFiltered(fromUser, false).subscribe({
      next: (posts: Post[]) => {
        if (posts && posts.length > 0) {
          this.userPostsSource.next(posts);
        }
      },
    });
  }

  isAuthenticatedUser(): boolean {
    let isAuthenticatedUser = false;
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        isAuthenticatedUser =
          user.userName === this.memberSource.value?.userName;
      } else {
        isAuthenticatedUser = false;
      }
    });
    return isAuthenticatedUser;
  }

  clear() {
    this.memberSource.next(null);
  }

  updateProfile(member: Member) {
    return this.http.put<Member>(this.baseUrl + 'users', member).pipe(
      map((member: Member) => {
        if (member) {
          this.memberSource.next({
            ...member,
            lastActive: new Date(member.lastActive),
          });
        }
      })
    );
  }

  setPetPhoto(photo: string) {
    const data: FormData = new FormData();
    data.append('Photo', photo);

    return this.http.post(this.baseUrl + `users/set-profile-photo`, data);
  }
}
