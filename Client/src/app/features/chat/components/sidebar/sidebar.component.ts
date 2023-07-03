import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../../core/models/user/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;

  constructor(readonly chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getActiveChats(); //.subscribe()
  }

  openChat(username: string) {
    console.log(this.user);
    this.chatService.createHubConnection(this.user!, username);
  }
}
