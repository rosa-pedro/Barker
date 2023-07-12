import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { ToasterService } from '../../../shared/components/toaster/toaster.service';
import { LoginForm, SignupForm } from '../models/forms.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private errorSource = new Subject<any>();
  error$ = this.errorSource.asObservable();

  private currentUserSource = new BehaviorSubject<User | undefined>(undefined);
  currentUser$ = this.currentUserSource.asObservable();

  mock = false;

  constructor(
    private toasterService: ToasterService,
    private http: HttpClient
  ) {}

  login(loginForm: LoginForm) {
    return this.http.post<User>(this.baseUrl + 'account/login', loginForm).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  signup(signupForm: SignupForm) {
    return this.http
      .post<User>(this.baseUrl + 'account/register', signupForm)
      .pipe(
        map((user) => {
          if (user) {
            this.setCurrentUser(user);
          }
          return user;
        })
      );
  }

  logout() {
    this.setCurrentUser();
  }

  setCurrentUser(user?: User) {
    if (user) {
      this.currentUserSource.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.currentUserSource.next(undefined);
      localStorage.clear();
    }
  }

  isUserNameAvailable(userName: string) {
    return this.http.get<boolean>(
      this.baseUrl + 'account/is-available/' + userName
    );
  }
}
