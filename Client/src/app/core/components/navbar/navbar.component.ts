import { Component } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  links: string[] = ['Posts', 'People', 'Chat'];
  menu_active = false;

  constructor(public authService: AuthService) {}

  signup() {}
}
