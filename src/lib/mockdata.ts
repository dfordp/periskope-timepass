import { Chat, Message } from "@/types";

export const mockChats: Chat[] = [
  {
    id: 1,
    name: "Test El Centro",
    lastMessage: {
      text: "CDERT",
      time: "11:51",
      sender: "Roshnag Airtel",
      status: "sent"
    },
    isGroup: true,
    participants: []
  },
  {
    id: 2,
    name: "Test Skope Final 5",
    lastMessage: {
      text: "Support2: This doesn't go on Tuesday...",
      time: "Yesterday",
      sender: "Support2",
      status: "delivered"
    },
    isGroup: false,
    participants: []
  },
  {
    id: 3,
    name: "Periskope Team Chat",
    lastMessage: {
      text: "Periskope: Test message",
      time: "28-Feb-25",
      sender: "Periskope",
      status: "read"
    },
    isGroup: true,
    participants: []
  },
  {
    id: 4,
    name: "+91 99999 99999",
    lastMessage: {
      text: "Hi there, I'm Swapnika, Co-Founder of ...",
      time: "25-Feb-25",
      sender: "User",
      status: "read"
    },
    isGroup: false,
    participants: []
  },
  {
    id: 5,
    name: "Test Demo17",
    lastMessage: {
      text: "Hello, South Euna!",
      time: "25-Feb-25",
      sender: "Roshnag Airtel",
      status: "sent"
    },
    isGroup: false,
    participants: []
  },
  {
    id: 6,
    name: "Yasin 3",
    lastMessage: {
      text: "First Bulk Message",
      time: "25-Nov-24",
      sender: "Roshnag Airtel",
      status: "sent"
    },
    isGroup: false,
    participants: []
  },
  {
    id: 7,
    name: "Test Skope Final 9473",
    lastMessage: {
      text: "testing",
      time: "01-Jan-25",
      sender: "Periskope",
      status: "sent"
    },
    isGroup: false,
    participants: []
  },
  {
    id: 8,
    name: "Skope Demo",
    lastMessage: {
      text: "test 123",
      time: "20-Dec-24",
      sender: "User",
      status: "sent"
    },
    isGroup: false,
    participants: []
  }
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      content: "CVFER",
      sender: "Roshnag Airtel",
      time: "11:51",
      status: "sent",
      type: "text"
    },
    {
      id: "2",
      content: "CDERT",
      sender: "Roshnag Airtel",
      time: "11:54",
      status: "delivered",
      type: "text"
    }
  ],
  "2": [
    {
      id: "1",
      content: "This doesn't go on Tuesday...",
      sender: "Support2",
      time: "Yesterday",
      status: "read",
      type: "text"
    }
  ],
  "3": [
    {
      id: "1",
      content: "Test message",
      sender: "Periskope",
      time: "12:30",
      status: "read",
      type: "text"
    },
    {
      id: "2",
      content: "hello",
      sender: "Periskope",
      time: "12:37",
      status: "delivered",
      type: "text"
    }
  ],
  "4": [
    {
      id: "1",
      content: "Hi there, I'm Swapnika, Co-Founder of ...",
      sender: "User",
      time: "25-Feb-25",
      status: "read",
      type: "text"
    }
  ],
  "5": [
    {
      id: "1",
      content: "Hello, South Euna!",
      sender: "Roshnag Airtel",
      time: "08:01",
      status: "sent",
      type: "text"
    }
  ]
};