export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Chat {
  id: number;
  name: string;
  message: string;
  phone: string;
  time: string;
  status: string;
  tags: string[];
  unreadCount?: number;
  isOnline?: boolean;
  avatar?: string;
  lastMessagePreview?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'system';
}