import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user/user.model';
import { Message } from '../../../../core/models/message/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, AfterViewChecked, OnChanges {
  message: FormControl = new FormControl<string>('', [Validators.required]);

  username = '';
  authUser: User | undefined;

  constructor(
    readonly chatService: ChatService,
    readonly authService: AuthService,
    private route: ActivatedRoute
  ) {}

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (this.message.value !== '') {
      this.sendMessage();
    }
    console.log(event);
  }

  ngOnInit(): void {
    this.route.queryParams.pipe().subscribe((params) => {
      if (params['with']) {
        this.username = params['with'];
        this.authService.currentUser$.subscribe({
          next: (user) => {
            if (user) {
              this.authUser = user;
              console.log(user);
              this.chatService.createHubConnection(user, this.username);
            }
          },
        });
      }
    });
    this.chatService.messageThread$.subscribe((chat) => {
      console.log(chat);
    });
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
    this.chatService.sendMessage(this.username, this.message.value);
    this.message.setValue('');
  }

  test(message: Message) {
    console.log(typeof message.messageSent);
  }
}
