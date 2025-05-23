import { Chat, Message } from "@/types";

export const mockChats: Chat[] = [
  {
    id: 1,
    name: "Test El Centro",
    message: "CVFER",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "CDERT",
      time: "11:51",
      sender: "Roshnag Airtel",
      status: "sent"
    },
    avatar: "/avatars/test-el-centro.png",
    tags: ["Demo"],
    date: "Yesterday",
    unreadCount: 0,
    pinned: false,
    participants: ["Roshnag Airtel", "Roshnag Jio", "Bharat Kumar Ramesh", "Periskope"]
  },
  {
    id: 2,
    name: "Test Skope Final 5",
    message: "Support2: This doesn't go on Tuesday...",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "Support2: This doesn't go on Tuesday...",
      time: "Yesterday",
      sender: "Support2",
      status: "delivered"
    },
    avatar: "/avatars/test-skope.png",
    tags: ["Demo"],
    unreadCount: 2,
    pinned: true,
    participants: []
  },
  {
    id: 3,
    name: "Periskope Team Chat",
    message: "Periskope: Test message",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "Periskope: Test message",
      time: "28-Feb-25",
      sender: "Periskope",
      status: "read"
    },
    avatar: "/avatars/team-chat.png",
    tags: ["Demo", "Internal"],
    unreadCount: 1,
    pinned: false,
    participants: ["Team"]
  },
  {
    id: 4,
    name: "+91 99999 99999",
    message: "Hi there, I'm Swapnika, Co-Founder of ...",
    phone: "+91 99999 99999",
    lastMessage: {
      text: "Hi there, I'm Swapnika, Co-Founder of ...",
      time: "25-Feb-25",
      sender: "User",
      status: "read"
    },
    avatar: "/avatars/default.png",
    tags: ["Demo", "Signup"],
    unreadCount: 0,
    pinned: false,
    participants: []
  },
  {
    id: 5,
    name: "Test Demo17",
    message: "Rohnsen: 123",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "Hello, South Euna!",
      time: "25-Feb-25",
      sender: "Roshnag Airtel",
      status: "sent"
    },
    avatar: "/avatars/demo17.png",
    tags: ["Content", "Demo"],
    unreadCount: 0,
    pinned: false,
    participants: []
  },
  {
    id: 6,
    name: "Yasin 3",
    message: "First Bulk Message",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "CDERT",
      time: "25-Nov-24",
      sender: "Roshnag Airtel",
      status: "sent"
    },
    avatar: "/avatars/yasin.png",
    tags: ["Demo", "Dont Send"],
    unreadCount: 0,
    pinned: false,
    participants: []
  },
  {
    id: 7,
    name: "Test Skope Final 9473",
    message: "Heyy",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "testing",
      time: "01-Jan-25",
      sender: "Periskope",
      status: "sent"
    },
    avatar: "/avatars/test-skope-final.png",
    tags: ["Demo"],
    unreadCount: 1,
    pinned: false,
    participants: []
  },
  {
    id: 8,
    name: "Skope Demo",
    message: "test 123",
    phone: "+91 99778 44008",
    lastMessage: {
      text: "test 123",
      time: "20-Dec-24",
      sender: "User",
      status: "sent"
    },
    avatar: "/avatars/skope-demo.png",
    tags: ["Demo"],
    unreadCount: 0,
    pinned: false,
    participants: []
  }
];


// ...existing chat mockdata...

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