import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../../core/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;

  constructor(readonly chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.getActiveChats(); //.subscribe()
  }

  openChat(username: string) {
    console.log(this.user);
    this.router.navigate([], { queryParams: { username: username } });
    this.chatService.getMessages(username);
    // this.chatService.createHubConnection(this.user!, username);
  }
}
