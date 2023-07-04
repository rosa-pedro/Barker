import { Component } from '@angular/core';
import { ProfileService } from '../../../profile/services/profile.service';
import { AuthService } from '../../../auth/services/auth.service';
import { take } from 'rxjs';
import { User } from '../../../../core/models/user/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  constructor(readonly authService: AuthService) {}
}
