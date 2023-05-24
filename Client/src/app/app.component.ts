import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { User } from './core/models/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'barker-repo';

  constructor(private authService: AuthService) {}

  signup() {}

  ngOnInit(): void {
    const storedUser =
      localStorage.getItem('user');
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);
    this.authService.setCurrentUser(user);
    console.log(user);
  }
}
