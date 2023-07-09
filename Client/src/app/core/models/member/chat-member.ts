export interface ChatMember {
  id: number;
  participant: string;
  participantPhoto: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageSent: Date;
  hasUnreadMessage: number;
}
