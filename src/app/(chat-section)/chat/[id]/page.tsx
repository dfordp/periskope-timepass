"use client"


import { mockChats, mockMessages } from "@/lib/mockdata";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FiMic, FiPaperclip, FiSmile, FiCheck, FiClock, FiRefreshCw, FiStar, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaCheckDouble } from "react-icons/fa";
import { HiArrowsPointingOut, HiEllipsisVertical } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Chat, Message } from "@/types";

export default function ChatPage({ params }: { params: { id: string } }) {
 const [chat, setChat] = useState<Chat | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Simulate data fetching
    const currentChat = mockChats.find((c) => c.id === Number(params.id));
    const currentMessages = mockMessages[params.id] || [];
    
    setChat(currentChat);
    setMessages(currentMessages);
  }, [params.id]);

  if (!chat) return null;

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* Chat Header */}
      <div className="h-[60px] border-b border-zinc-200 px-4 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback className="bg-zinc-100 text-zinc-500">
              {chat.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-[13px] font-semibold text-zinc-900 leading-none">{chat.name}</h2>
            <div className="flex items-center gap-1 text-[12px] text-zinc-500">
              {chat.participants.map((p) =>
                typeof p === "string" ? p : p.name
              ).join(", ")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500">
            <HiArrowsPointingOut className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500">
            <HiEllipsisVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-2 max-w-4xl mx-auto">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={cn(
                "flex",
                message.sender === "Periskope" ? "justify-end" : "justify-start"
              )}
            >
              <div className="max-w-[75%]">
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 text-[13px] relative",
                    message.sender === "Periskope"
                      ? "bg-[#e1ffc7]"
                      : "bg-white shadow-sm"
                  )}
                >
                  {message.sender !== "Periskope" && (
                    <span className="text-[11px] font-semibold text-emerald-600 block mb-0.5">
                      {message.sender}
                    </span>
                  )}
                  <p className="leading-snug text-zinc-800">{message.content}</p>
                  <div className="flex items-center justify-end mt-1 text-[10px] text-zinc-500 gap-1">
                    <span>{message.time}</span>
                    {message.status === "read" && (
                      <FaCheckDouble className="h-3 w-3 text-blue-500" />
                    )}
                    {message.status === "delivered" && (
                      <FaCheckDouble className="h-3 w-3 text-zinc-400" />
                    )}
                    {message.status === "sent" && (
                      <FiCheck className="h-3 w-3 text-zinc-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
       <div className="bg-white border-t border-zinc-200 px-4 pt-2 pb-3">
      {/* Tab Toggle */}
      <div className="flex items-center space-x-1 mb-2">
        <button className="flex items-center gap-1 px-3 py-1 text-[13px] font-medium text-emerald-600 bg-emerald-50 rounded-t-md">
          WhatsApp
        </button>
        <button className="flex items-center gap-1 px-3 py-1 text-[13px] font-medium text-zinc-600 bg-zinc-100 rounded-t-md">
          Private Note
        </button>
      </div>

      {/* Input + Actions */}
      <div className="flex items-center space-x-2">
        {/* Message Input */}
        <Input
          placeholder="Message..."
          className="flex-1 h-9 px-3 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:ring-1 focus:ring-emerald-500"
        />

        {/* Action Icons */}
        <div className="flex items-center space-x-1 text-zinc-500">
          <FiPaperclip className="h-5 w-5 hover:text-zinc-700 cursor-pointer" />
          <FiSmile     className="h-5 w-5 hover:text-zinc-700 cursor-pointer" />
          <FiClock     className="h-5 w-5 hover:text-zinc-700 cursor-pointer" />
          <FiRefreshCw className="h-5 w-5 hover:text-zinc-700 cursor-pointer" />
          <FiStar      className="h-5 w-5 hover:text-zinc-700 cursor-pointer" />
          <FiMic       className="h-5 w-5 hover:text-zinc-700 cursor-pointer" />
        </div>

        {/* Send Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-emerald-600 hover:bg-emerald-50 rounded-md"
        >
          <FiChevronRight className="h-5 w-5" />
        </Button>

        {/* Account Selector */}
        <div className="flex items-center gap-1 px-3 py-1 text-[13px] font-medium text-zinc-700 bg-zinc-100 rounded-md cursor-pointer">
          <span>Periskope</span>
          <FiChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
    </div>
  );
}
