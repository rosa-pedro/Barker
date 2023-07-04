import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    readonly chatService: ChatService,
    readonly authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(first()).subscribe((params) => {
      if (params['username']) {
        const username = params['tab'];
        this.chatService.getMessages(username);
      }
    });

    // chat
  }
}
