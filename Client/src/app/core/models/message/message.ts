export interface Message {
  id: number;
  senderId: number;
  senderUserName: string;
  recipientId: number;
  content: string;
  dateRead: Date;
  messageSent: Date;
}
