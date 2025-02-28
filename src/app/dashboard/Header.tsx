import { Activity, Bell, User } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import ModeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          AI 研究平台
        </span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer w-8 h-8 hover:w-10 hover:h-10 transition-all duration-200">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                <User className="w-6 h-6" />
              </AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => console.log("個人設定")}>
              個人設定
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("登出")}>登出</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="text-sm text-gray-500">目前沒有新的通知</p>
          </PopoverContent>
        </Popover>
        <ModeToggle />
      </div>
    </header>
  );
}
