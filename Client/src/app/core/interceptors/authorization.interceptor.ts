import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class AuthorizationInterceptor
  implements HttpInterceptor
{
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          if (user) {
            console.log(user);
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${user.token}`,
              },
            });
          }
        },
      });

    console.log(request);
    return next.handle(request);
  }
}
