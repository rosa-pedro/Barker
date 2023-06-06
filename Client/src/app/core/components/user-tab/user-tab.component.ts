import {
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';

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
    private authService: AuthService
  ) {}

  onClick(event: any) {
    if (
      !this._eref.nativeElement.contains(
        event.target
      )
    ) {
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
        break;
      default:
        break;
    }
  }
}
