export interface ChatMember {
  id: number;
  userName: string;
  photo?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  hasUnreadMessage: boolean;
}
