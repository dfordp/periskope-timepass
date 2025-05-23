export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Chat {
  id: number;
  name: string;
  lastMessage?: {
    text: string;
    time: string;
    sender: string;
    status: 'sent' | 'delivered' | 'read';
    phone?: string;
  };
  isGroup: boolean;
  participants: string[];
  date ?: string;
}
export interface Message {
  id: string;
  content: string;
  sender: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'system';
}