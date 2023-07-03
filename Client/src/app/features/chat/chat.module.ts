import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ChatRoutingModule } from './chat-routing.module';
import { TimeagoModule } from 'ngx-timeago';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
  declarations: [SidebarComponent, MessagesComponent, ChatComponent],
  imports: [
    ChatRoutingModule,
    CommonModule,
    ComponentsModule,
    TimeagoModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [SidebarComponent, MessagesComponent, ChatComponent],
})
export class ChatModule {}
