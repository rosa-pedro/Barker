import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { ChatMember } from '../../../core/models/member/chat-member';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../../../core/models/user/user.model';
import { Message } from '../../../core/models/message/message';

export interface Group {
  name: string;
  connections: Connection[];
}

export interface Connection {
  connectionId: string;
  username: string;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result?: T;
  pagination?: Pagination;
}

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((response) => {
      if (response.body) {
        paginatedResult.result = response.body;
      }

      const pagination = response.headers.get('Pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }

      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber);
  params = params.append('pageSize', pageSize);

  return params;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection | undefined;

  private activeChatsSource = new BehaviorSubject<ChatMember[] | null>(null);
  activeChats$ = this.activeChatsSource.asObservable();

  private messageThreadSource = new BehaviorSubject<Message[] | null>(null);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) {}

  getActiveChats() {
    return this.http.get<ChatMember[]>(this.baseUrl + 'groups/').pipe(
      map((activeChats: ChatMember[]) => {
        if (activeChats && activeChats.length > 0) {
          this.activeChatsSource.next(activeChats);
        }
      })
    );
  }

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => {
      console.log(error);
    });

    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      if (messages) {
        messages.map((message: Message) => {
          message.messageSent = new Date(message.messageSent);
        });
      }
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (
        group.connections.some(
          (connection) => connection.username === otherUsername
        )
      ) {
        this.messageThread$.pipe(take(1)).subscribe({
          next: (messages) => {
            if (messages) {
              (messages as Message[]).forEach((message) => {
                if (!message.dateRead) {
                  message.dateRead = new Date(Date.now());
                }
                message.messageSent = new Date(message.messageSent);
              });
              this.messageThreadSource.next([...messages]);
            }
          },
        });
      }
    });

    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: (messages: Message[] | null) => {
          if (messages) {
            this.messageThreadSource.next([...messages, message]);
            if (this.activeChatsSource.value) {
              let actChats: ChatMember[] = [...this.activeChatsSource.value];
              actChats.map((chat) => {
                if (chat.participant === otherUsername) {
                  chat.lastMessage = message.content;
                  chat.lastMessageSent = new Date(Date.now());
                }
              });
              this.activeChatsSource.next([...actChats]);
            }
          }
        },
      });
    });
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.messageThreadSource.next([]);
      this.hubConnection.stop();
    }
  }

  async sendMessage(username: string, content: string) {
    return this.hubConnection
      ?.invoke('SendMessage', {
        recipientUsername: username,
        content,
      })
      .catch((error) => console.log(error));
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
