import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  message: FormControl = new FormControl<string>('', [Validators.required]);

  constructor(
    readonly chatService: ChatService,
    readonly authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe().subscribe((params) => {
      if (params['username']) {
        const username = params['username'];
        this.chatService.getMessages(username);
      }
    });
  }

  ngAfterViewChecked() {
    let messagesPane = document.getElementById('messages-pane');
    if (messagesPane) {
      messagesPane.scrollTop = messagesPane.scrollHeight;
    }
  }

  sendMessage() {}
}
