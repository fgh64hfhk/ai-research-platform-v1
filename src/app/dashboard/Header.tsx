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

import { SidebarTrigger } from "@/components/ui/sidebar";

import ModeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 w-full z-10 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-6 h-16">
      {/* 側邊欄按鈕 + 平台名稱 */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Activity className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          AI 研究平台
        </span>
      </div>

      {/* 通知、使用者選單、暗黑模式切換 */}
      <div className="flex items-center gap-3">
        {/* 使用者選單 */}
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
            <DropdownMenuItem onClick={() => console.log("登出")}>
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 通知按鈕 */}
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

        {/* 暗黑模式切換 */}
        <ModeToggle />
      </div>
    </header>
  );
}
