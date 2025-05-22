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
import { IoMdSend } from "react-icons/io";

export default function ChatPage({ params }: { params: { id: string } }) {
  const [chat, setChat] = useState<Chat | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'private'>('whatsapp');

  useEffect(() => {
    const currentChat = mockChats.find((c) => c.id === Number(params.id));
    const currentMessages = mockMessages[params.id] || [];
    setChat(currentChat);
    setMessages(currentMessages);
  }, [params.id]);

  if (!chat) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <header className="shrink-0 h-14 border-b border-zinc-200 px-4 flex items-center justify-between bg-white">
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
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:bg-zinc-50">
            <HiArrowsPointingOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:bg-zinc-50">
            <HiEllipsisVertical className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-hidden bg-zinc-50">
        <ScrollArea className="h-full px-4 py-2">
          <div className="space-y-2 max-w-3xl mx-auto">
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
      </main>

      {/* Chat Input */}
      <footer className="shrink-0 bg-white border-t border-zinc-200">
        <div className="px-4 pt-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('whatsapp')}
              className={cn(
                "px-3 py-1.5 text-[13px] font-medium rounded-t-lg transition-colors",
                activeTab === 'whatsapp' 
                  ? "text-emerald-600 bg-emerald-50" 
                  : "text-zinc-500 hover:bg-zinc-50"
              )}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('private')}
              className={cn(
                "px-3 py-1.5 text-[13px] font-medium rounded-t-lg transition-colors",
                activeTab === 'private'
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-zinc-500 hover:bg-zinc-50"
              )}
            >
              Private Note
            </button>
          </div>
        </div>

        <div className="p-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-zinc-50 rounded-lg border border-zinc-200 px-3">
              <Input
                placeholder="Message..."
                className="flex-1 h-9 border-0 bg-transparent text-[13px] focus:outline-none focus:ring-0 p-0"
              />
              <div className="flex items-center gap-1.5">
                {[FiPaperclip, FiSmile, FiClock, FiRefreshCw, FiStar].map((Icon, idx) => (
                  <Button key={idx} variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-600">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-zinc-600">
              <FiMic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-emerald-600 hover:bg-emerald-50">
              <IoMdSend className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}