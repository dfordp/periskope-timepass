import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-zinc-50 gap-4">
      <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
        <HiOutlineChatBubbleLeftRight className="h-8 w-8 text-zinc-400" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium text-zinc-900">No chat selected</h2>
        <p className="text-sm text-zinc-500 max-w-sm">
          Select a conversation from the list to start chatting or create a new one
        </p>
      </div>
    </div>
  );
}