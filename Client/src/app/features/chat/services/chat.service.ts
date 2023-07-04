import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Post } from '../../../core/models/post/post.model';
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

  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) {}

  getMessages(username: string) {
    const messages: Message[] = [
      {
        id: 1,
        senderId: 2,
        senderUserName: 'sarah',
        recipientId: 1,
        content: 'Hello, im sarah! Can you talk?',
        dateRead: new Date(),
        messageSent: new Date(),
      },
      {
        id: 1,
        senderId: 1,
        senderUserName: 'queen',
        recipientId: 2,
        content: 'Im queen! Nice to meet you!',
        dateRead: new Date(),
        messageSent: new Date(),
      },
      {
        id: 1,
        senderId: 1,
        senderUserName: 'queen',
        recipientId: 2,
        content: 'Yes I can talk',
        dateRead: new Date(),
        messageSent: new Date(),
      },
      {
        id: 1,
        senderId: 2,
        senderUserName: 'sarah',
        recipientId: 1,
        content: 'Great!!',
        dateRead: new Date(),
        messageSent: new Date(),
      },
    ];

    this.messageThreadSource.next(messages);
  }

  getActiveChats() {
    let activeChats: ChatMember[] = [
      {
        id: 3,
        userName: 'sarah',
        photo:
          'https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=625&q=80',
        isOnline: true,
        lastMessage: 'Good, wby???',
        lastMessageTime: new Date(),
        hasUnreadMessage: true,
      },
      {
        id: 6,
        userName: 'frazier',
        photo:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isOnline: false,
        lastMessage: 'Im also good',
        lastMessageTime: new Date(),
        hasUnreadMessage: false,
      },
    ];

    this.activeChatsSource.next(activeChats);
  }

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', (messages) => {
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
            (messages as Message[]).forEach((message) => {
              if (!message.dateRead) {
                message.dateRead = new Date(Date.now());
              }
            });
            this.messageThreadSource.next([...messages]);
          },
        });
      }
    });

    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: (messages) => {
          this.messageThreadSource.next([...messages, message]);
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

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
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
