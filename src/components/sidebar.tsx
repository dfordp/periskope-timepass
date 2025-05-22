"use client"

import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { mockChats } from "@/lib/mockdata";
import { bottomNavItems, navItems } from "@/lib/constants";
import { 
  HiMagnifyingGlass,
  HiArrowsPointingOut,
  HiClipboard,
  HiArrowDownTray,
  HiArrowUpTray,
  HiTrash,
  HiEllipsisHorizontal
} from "react-icons/hi2";
import { FloatingButton } from "./floating-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoFilterSharp } from "react-icons/io5";
import { RiFileDownloadFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";


export const NavigationSidebar = () => {
  return (
    <div className="w-16 h-screen border-r bg-white flex flex-col py-4 fixed left-0">
      <div className="px-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/logo.png" alt="Periskope" />
          <AvatarFallback className="bg-green-50 text-green-600 text-sm">P</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-2 flex flex-col items-center flex-1">
        {navItems.map((item, idx) => (
          <Button
            key={idx}
            variant="ghost"
            size="icon"
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
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
            <item.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <div className="space-y-2 flex flex-col items-center">
        {bottomNavItems.map((item, idx) => (
          <Button
            key={idx}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-green-50"
          >
            <item.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export const ChatSidebar = () => {
  const router = useRouter();

  const handleChatClick = (chatId: number) => {
    router.push(`/chat/${chatId}`);
  };
  return (
    <div className="w-[600px] border-r bg-white flex flex-col relative">
      {/* Header with combined search and filters */}
      <div className="p-3 border-b space-y-3 bg-white sticky top-0 z-20">
        <div className="flex justify-between gap-2">
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 bg-green-200 whitespace-nowrap px-3 h-9 font-semibold"
            >
            <RiFileDownloadFill />
              Custom Filter
            </Button>
          <Button className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer"> 
            <span className="text-zinc-400">Search</span>
          </Button>
          </div>
          <div className="flex justify-center gap-2 ">
            <Button className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer"> 
            <FiSearch className="h-4 w-4 text-zinc-400" /> 
            <span className="text-zinc-400">Search</span>
            </Button>
            <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 bg-green-200 whitespace-nowrap px-3 h-9 font-semibold"
            >
              <IoFilterSharp />

              Filtered
            </Button>
          </div>
        </div>
          </div>

        </div>


      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-zinc-100">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-3 hover:bg-zinc-50 cursor-pointer"
              onClick={() => handleChatClick(chat.id)}

            >
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback className="bg-zinc-100 text-zinc-500">
                  {chat.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-zinc-900 truncate">{chat.name}</span>
                  <span className="text-xs text-zinc-500">{chat.lastMessage.time}</span>
                </div>
                <div className="flex items-center justify-between  gap-0.5 mt-0.5">
                  <span className="text-sm text-zinc-500 truncate">
                    {chat.lastMessage.text}
                  </span>
                  {chat.labels.map((label, idx) => {
                    const labelColor = {
                      Demo: "text-rose-500 bg-rose-50 border-rose-100",
                      Internal: "text-emerald-500 bg-emerald-50 border-emerald-100",
                      Signup: "text-blue-500 bg-blue-50 border-blue-100",
                      Content: "text-amber-500 bg-amber-50 border-amber-100",
                      "Dont Send": "text-red-500 bg-red-50 border-red-100"
                    }[label] || "text-zinc-500 bg-zinc-50 border-zinc-100";
                    return (
                      <span
                        key={idx}
                        className={`text-[15px] px-1.5 py-0.5 rounded border ${labelColor} font-medium`}
                      >
                        {label}
                      </span>
                    );
                  })}
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Floating Action Button */}
      <div className="absolute bottom-1 right-1">
        <FloatingButton />
      </div>
    </div>
  );
};


export const RightNavigationSidebar = () => {
  return (
    <div className="w-10 border-l border-zinc-200 bg-white flex flex-col items-center py-4">
      <div className="flex-1 space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiMagnifyingGlass className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiArrowsPointingOut className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiClipboard className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiArrowDownTray className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiArrowUpTray className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiTrash className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:bg-zinc-50"
        >
          <HiEllipsisHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};