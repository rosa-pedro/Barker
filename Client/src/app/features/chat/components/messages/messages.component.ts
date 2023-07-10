import {
  AfterViewChecked,
  Component,
  HostListener,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user/user.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, AfterViewChecked, OnChanges {
  message: FormControl = new FormControl<string>('', [Validators.required]);

  username = '';
  authUser: User | undefined;
  isActive = false;

  constructor(
    readonly chatService: ChatService,
    readonly authService: AuthService,
    private route: ActivatedRoute
  ) {}

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler() {
    if (this.message.value !== '') {
      this.sendMessage();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.pipe().subscribe((params) => {
      if (params['with']) {
        this.username = params['with'];
        this.authService.currentUser$.pipe().subscribe({
          next: (user) => {
            if (user) {
              this.isActive = true;
              this.authUser = user;
              this.chatService.createHubConnection(user, this.username);
            }
          },
        });
      } else {
        this.chatService.stopHubConnection();
        this.isActive = false;
      }
    });
    this.chatService.messageThread$.subscribe(() => {});
  }

  ngOnChanges(): void {
    /*if (this.activeChat) {
      this.chatService.createHubConnection(
        this.user!,
        this.activeChat.userName
      );
    }*/
  }

  ngAfterViewChecked() {
    let messagesPane = document.getElementById('messages-pane');
    if (messagesPane) {
      messagesPane.scrollTop = messagesPane.scrollHeight;
    }
  }

  sendMessage() {
    this.chatService.sendMessage(this.username, this.message.value).then(() => {
      this.chatService.getActiveChats().subscribe();
    });
    this.message.setValue('');
  }
}
