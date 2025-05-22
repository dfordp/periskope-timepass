import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { 
  FiRefreshCw, 
  FiHelpCircle,
  FiDownload,
  FiStar,
  FiList,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";

export function TopBar() {
  return (
    <div className="h-16 px-4 border-b bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-600">chats</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-100">
          <FiRefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-100">
          <FiHelpCircle className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-zinc-100 rounded-md cursor-pointer">
          <span className="text-sm font-medium text-amber-400">5 / 6</span>
          <span className="text-sm text-zinc-600">phones</span>
          <FiChevronDown className="h-4 w-4 text-zinc-400 ml-1" />
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-100">
          <FiDownload className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-100">
          <div className="relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
            <FiGrid className="h-4 w-4" />
          </div>
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-100">
          <FiList className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}