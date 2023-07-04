export interface Message {
  id: number;
  senderId: number;
  senderUserName: string;
  recipientId: 1;
  content: 'Test message 1 from bob to william';
  dateRead: Date;
  messageSent: Date;
}
