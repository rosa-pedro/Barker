import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatMember } from '../../../../core/models/member/chat-member';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  activeChat: ChatMember | null = null;
  constructor(
    readonly authService: AuthService,
    readonly chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe().subscribe((params) => {
      if (params['username']) {
        this.activeChat = params['username'];
      }
    });
  }
}
