import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  constructor(
    readonly authService: AuthService,
    readonly chatService: ChatService
  ) {}
}
