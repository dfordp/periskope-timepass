import { Chat } from "@/types";

export const mockChats: Chat[] = [
  {
    id: 1,
    name: "Test El Centro",
    lastMessage: {
      text: "Hello, Livonia!",
      time: "08:01",
      sender: "Roshnag Airtel",
      phone: "+91 99778 44008",
      status: "sent"
    },
    avatar: "/avatars/test-el-centro.png",
    labels: ["Demo"],
    date: "23-01-2025",
    unreadCount: 0,
    pinned: false,
    participants: [
      { name: "Roshnag Airtel", phone: "+91 99778 44008" },
      { name: "Roshnag Jio" },
      { name: "Bharat Kumar Ramesh" },
      { name: "Periskope" }
    ]
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
    avatar: "/avatars/test-skope.png",
    labels: ["Demo"],
    unreadCount: 2,
    pinned: true,
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
    avatar: "/avatars/team-chat.png",
    labels: ["Demo", "Internal"],
    unreadCount: 1,
    pinned: false,
    participants: ["Team"]
  }
];