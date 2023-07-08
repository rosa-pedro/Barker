import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../../core/models/user/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMember } from '../../../../core/models/member/chat-member';
import { first } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output('activeChat') activeChat = new EventEmitter<ChatMember | null>();
  activeChatUser = '';
  activeChats: ChatMember[] = [];

  constructor(
    readonly chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*this.route.queryParams.pipe(first()).subscribe((params) => {
      if (params['username']) {
        this.activeChatUser = params['username'];
      }
    });*/
    /*this.chatService.getActiveChats().subscribe({
      next: (chats) => {
        if (chats) {
          this.activeChats = chats;
        }
      },
    });*/
  }

  openChat(activeChat: ChatMember) {
    const chat = this.activeChats.find(
      (c) => c.userName === this.activeChatUser
    );
    console.log(chat);
    this.activeChat.emit(chat);
    this.router.navigate([], {
      queryParams: { username: activeChat.userName },
    });
  }
}
