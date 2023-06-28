import { Component, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class UserTabComponent {
  @Input() userName? = '';
  active = false;
  options = ['Logout', 'Profile'];

  constructor(
    private _eref: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {}

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }

  getIcon(option: string): string {
    switch (option) {
      case 'Logout':
        return 'logout';
      case 'Profile':
        return 'person';
      default:
        return 'priority_high';
    }
  }

  selectOption(option: string) {
    switch (option) {
      case 'Logout':
        // TODO: Needs modal
        this.authService.logout();
        break;
      case 'Profile':
        this.router.navigate(['profile', this.userName]);
        break;
      default:
        break;
    }
  }
}
