import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { ChatMember } from '../../../../core/models/member/chat-member';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output('activeChat') activeChat = new EventEmitter<ChatMember | null>();
  activeChatUser = '';
  activeChats: ChatMember[] = [];

  constructor(readonly chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.getActiveChats().subscribe({
      next: () => {},
    });
  }

  openChat(activeChat: ChatMember) {
    const chat = this.activeChats.find(
      (c) => c.participant === this.activeChatUser
    );
    this.activeChat.emit(chat);
    this.router.navigate([], {
      queryParams: { with: activeChat.participant },
    });
  }

  searchUser() {
    this.router.navigate([]);
  }
}
