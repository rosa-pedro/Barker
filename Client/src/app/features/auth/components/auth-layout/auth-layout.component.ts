import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  errorMessage = ''

  constructor(private authService: AuthService) {
    authService.error$.subscribe((message) => {
      if (!!message) {
        this.errorMessage = message;
        setTimeout(() => {
          this.errorMessage = ''
        }, 10000)
      }
    })
  }
}
