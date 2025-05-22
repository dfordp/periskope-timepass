import { Chat } from "@/types";

export const mockChats: Chat[] = [
  {
    id: 1,
    name: "Test El Centro",
    message: "CVFER",
    phone: "+91 99778 44008",
    time: "11:51",
    status: "Demo",
    participants: ["Roshnag Airtel", "Roshnag Jio", "Bharat Kumar Ramesh", "Periskope"],
    tags: ["Demo"]
  },
  {
    id: 2,
    name: "Test Skope Final 5",
    message: "Support2: This doesn't go on Tuesday...",
    phone: "+91 99778 44008",
    time: "Yesterday",
    status: "Demo",
    tags: ["Demo"],
    participants:[]
  },
  {
    id: 3,
    name: "Periskope Team Chat",
    message: "Periskope: Test message",
    phone: "+91 99778 44008",
    time: "28-Feb-25",
    status: "Internal",
    participants: ["Team"],
    tags: ["Demo", "Internal"]
  }
];