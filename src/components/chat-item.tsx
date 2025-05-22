import { Chat } from "@/types";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Image from "next/image";

export function ChatItem({ chat }: { chat: Chat }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-zinc-50 cursor-pointer">
      <Avatar className="h-10 w-10 shrink-0">
        {chat.avatar ? (
          <Image src={chat.avatar} alt={chat.name} />
        ) : (
          <div className="bg-zinc-100 h-full w-full flex items-center justify-center text-zinc-500">
            {chat.name[0]}
          </div>
        )}
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-zinc-900 truncate">{chat.name}</h4>
          <span className="text-xs text-zinc-500">{chat.time}</span>
        </div>
        <p className="text-xs text-zinc-500 truncate">{chat.message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-zinc-400">{chat.phone}</span>
          <div className="flex gap-1">
            {chat.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className={`text-[10px] px-1.5 py-0 font-normal
                  ${tag === 'Demo' ? 'bg-orange-50 text-orange-600' : 
                    tag === 'Internal' ? 'bg-green-50 text-green-600' : 
                    'bg-zinc-100 text-zinc-600'}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}