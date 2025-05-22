import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ChatItem } from "./chat-item";
import { mockChats } from "@/lib/mockdata";
import { Input } from "./ui/input";
import {
  FiHome,
  FiMessageCircle,
  FiBarChart2,
  FiGrid,
  FiDatabase,
  FiSettings,
  FiUsers,
  FiPhone,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { FloatingButton } from "./floating-button";

const navItems = [
  { icon: FiHome, label: "Home", active: false },
  { icon: FiMessageCircle, label: "Messages", active: true },
  { icon: FiBarChart2, label: "Analytics", active: false },
  { icon: FiGrid, label: "Apps", active: false },
  { icon: FiDatabase, label: "Database", active: false },
  { icon: FiSettings, label: "Settings", active: false },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* Left Icon Navigation */}
      <div className="w-16 border-r bg-white flex flex-col justify-between py-4">
        <div className="space-y-2 flex flex-col items-center">
          {navItems.map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.active
                  ? "bg-green-50 text-green-600"
                  : "text-zinc-400 hover:bg-green-50"
              }`}
              style={{
                boxShadow: item.active
                  ? "0 2px 8px 0 rgba(34,197,94,0.08)"
                  : undefined,
              }}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl text-zinc-400 hover:bg-green-50"
          >
            <FiUsers className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl text-zinc-400 hover:bg-green-50"
          >
            <FiPhone className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="w-80 border-r bg-white flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="flex items-center text-green-600 bg-green-50 hover:bg-green-100 px-3 h-8 rounded"
            >
              <FiFilter className="mr-2 h-4 w-4" />
              <span className="font-medium">Custom filter</span>
            </Button>
            <Button
              variant="ghost"
              className="text-zinc-400 px-3 h-8 hover:bg-zinc-50 rounded"
            >
              Save
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search"
                className="pl-9 h-9 rounded border border-zinc-200 bg-zinc-50 text-zinc-700 focus-visible:ring-green-500"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-600 bg-green-50 hover:bg-green-100 rounded"
            >
              Filtered
            </Button>
          </div>
        </div>

        {/* Chat Items */}
        <ScrollArea className="flex-1">
          <div className="divide-y divide-zinc-100">
            {mockChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        </ScrollArea>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6 z-10">
          <FloatingButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;