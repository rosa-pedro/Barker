import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  private membersSource = new BehaviorSubject<Member[] | null>(null);
  members$ = this.membersSource.asObservable();

  private userPostsSource = new BehaviorSubject<Post[] | null>(null);
  userPosts$ = this.userPostsSource.asObservable();
  hasNext = true;
  private pageNumber = 1;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private postService: PostService
  ) {}

  getUsers() {
    return this.http.get<Member[]>(this.baseUrl + 'users/').pipe(
      map((members: Member[]) => {
        if (members) {
          this.membersSource.next(members);
        }
      })
    );
  }

  getNextMembers() {
    this.pageNumber += 1;
    return this.getMembersFiltered(
      {
        pageNumber: this.pageNumber,
      } as RequestSpec,
      true
    );
  }

  private getMembersFiltered(spec: RequestSpec, isNext: boolean) {
    let requestEnd = 'users?';
    if (spec.pageNumber) {
      requestEnd = requestEnd + 'pageNumber=' + spec.pageNumber + '&';
    }
    return this.getMembersFinalize(requestEnd, isNext);
  }

  private getMembersFinalize(
    requestEnd: string,
    isNext: boolean
  ): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + requestEnd).pipe(
      map((response: Member[]) => {
        const posts = response;
        if (posts && posts.length > 0) {
          const curPosts = this.membersSource.value;
          if (curPosts && isNext) {
            this.membersSource.next([...curPosts, ...posts]);
          } else {
            this.hasNext = true;
            this.pageNumber = 1;
            this.membersSource.next(posts);
          }
        } else {
          this.hasNext = false;
        }
        return response;
      })
    );
  }
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
