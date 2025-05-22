import { Button } from "./ui/button";
import { 
  FiRefreshCw, 
  FiHelpCircle,
  FiDownload,
  FiStar,
  FiList,
  FiGrid,
  FiChevronDown,
  FiSettings,
} from "react-icons/fi";

export function TopBar() {
  return (
    <div className="h-12 px-4 border-b border-zinc-200 bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-medium text-zinc-700">chats</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-50 h-7 w-7">
          <FiRefreshCw className="h-[14px] w-[14px]" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-50 h-7 w-7">
          <FiHelpCircle className="h-[14px] w-[14px]" />
        </Button>
        <div className="flex items-center gap-1 px-1.5 py-1 hover:bg-zinc-50 rounded-md cursor-pointer mx-0.5">
          <span className="text-[13px] font-medium text-amber-400">5 / 6</span>
          <span className="text-[13px] text-zinc-600">phones</span>
          <FiChevronDown className="h-3 w-3 text-zinc-400" />
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-50 h-7 w-7">
          <FiDownload className="h-[14px] w-[14px]" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-50 h-7 w-7">
          <div className="relative">
            <div className="absolute -right-0.5 -top-0.5 w-1 h-1 bg-red-500 rounded-full"></div>
            <FiGrid className="h-[14px] w-[14px]" />
          </div>
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-zinc-50 h-7 w-7">
          <FiList className="h-[14px] w-[14px]" />
        </Button>
      </div>
    </div>
  );
}