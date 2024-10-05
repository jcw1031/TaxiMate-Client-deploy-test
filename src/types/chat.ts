interface Sender {
  id: string;
  nickname: string;
  profileImage: string;
}

type ChatType = 'MESSAGE' | 'SYSTEM';

// 메세지 수신
export interface ChatMessage {
  id: string;
  partyId: number;
  partyTitle: string;
  message: string;
  type: ChatType;
  createdAt: string;
  sender: Sender;
}

export interface ChatRoom {
  id: number;
  title: string;
  maxParticipants: number; // 최대 참여자 수
  currentParticipants: number; // 현재 참여자 수
  isProgress: boolean;
  recentMessage: string;
  recentMessageTime: string;
  unreadCount: number;
}

export interface Chat {
  id: string;
  partyId: string;
  message: string;
  type: ChatType;
  createdAt: string;
  sender: Sender | null;
}

export interface ChatList {
  party: {
    id: string;
    title: string;
    departureTime: string;
    origin: string;
    destination: string;
    maxParticipants: number; // 최대 참여자 수
    currentParticipants: number; // 현재 참여자 수
  };
  chats: Chat[];
}

export interface GroupMessage {
  chat: string[];
  createdAt: string;
  sender: Sender | null;
  type: ChatType;
}
