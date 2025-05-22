import { IoChatbubbleEllipses } from "react-icons/io5";
import { Button } from "./ui/button";
import { 
  FiRefreshCw, 
  FiHelpCircle, 
  FiList,
} from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";
import { IoMdNotificationsOff } from "react-icons/io";
import { VscDesktopDownload } from "react-icons/vsc";

export function TopBar() {
  return (
    <div className="h-12 px-4 border-b border-zinc-200 bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-bold text-zinc-700 flex items-center gap-1.5">
          <IoChatbubbleEllipses className="h-4 w-4" />
          chats
        </span>      
      </div>
      <div className="py-2 flex items-center gap-1.5">
          <Button className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer">
        <FiRefreshCw className="text-zinc-700" />
        <span className="text-sm text-zinc-700">Refresh</span>
      </Button>
      <Button className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer">
        <FiHelpCircle className="h-2 w-2 text-zinc-700" />
        <span className="text-sm text-zinc-700">Help</span>
      </Button>
         <div className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer">
          <span className="h-2 w-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-zinc-700">5 / 6</span>
          <span className="text-sm text-zinc-700">phones</span>
          <HiArrowsUpDown className="h-4 w-4 text-zinc-500" />
        </div>
        <Button className="flex items-center gap-1 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer">
          <VscDesktopDownload className="h-4 w-4 text-zinc-700"/>
        </Button>
        <Button className="flex items-center gap-1 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer">
          <IoMdNotificationsOff className="h-4 w-4 text-zinc-700"/>
        </Button>
        <Button className="flex items-center gap-1 border border-zinc-200 bg-white rounded-md shadow-sm cursor-pointer">
          <BsStars className="h-4 w-4 text-yellow-300"/>
          <FiList className="h-4 w-4 text-zinc-700"/>
        </Button>
      </div>
    </div>
  );
}