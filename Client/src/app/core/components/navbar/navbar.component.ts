import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  links: string[] = [
    'Posts',
    'People',
    'Pets',
    'Chat',
  ];
  menu_active = false;

  hideMenu() {
    this.menu_active = false;
  }

  signup() {
    console.log('signup');
  }
}
