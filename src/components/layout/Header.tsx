import { Activity, Bell, BellRing, User } from "lucide-react";

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

import ModeToggle from "@/components/layout/ModeToggle";

import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "@/components//layout/CardWithNotification";
import { Switch } from "@/components/ui/switch";

import { useNotificationSettings } from "@/hooks/useNotificationSettings";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const { notifications, removeNotification, clearNotifications } =
    useNotifications();
  const unreadCount = notifications.length;

  const { isPushEnabled, togglePushNotifications } = useNotificationSettings();

  return (
    <header className="sticky w-full fixed top-0 right-0 left-64 z-10 bg-white dark:bg-gray-900 shadow-md h-16 px-6 flex items-center justify-between min-w-[calc(100%-16rem)] overflow-hidden">
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
            <div className="relative cursor-pointer">
              {/* 綠色在線狀態環（僅在登入時顯示） */}
              <Avatar
                className={`w-10 h-10 transition-all duration-200 
          ${
            true
              ? "border-2 border-white ring-2 ring-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
              : ""
          }`}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 pt-4" sideOffset={16}>
            {/* 使用者資訊區塊 */}
            <div className="flex flex-col items-center mb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* 使用者頭像 + 綠色環 */}
                  <Avatar
                    className={`w-16 h-16 mb-2 transition-all duration-200
          ${
            true
              ? "border-2 border-white ring-2 ring-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
              : ""
          }`}
                  >
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2">
                  上次登入: 2025-03-05 12:45 PM
                </TooltipContent>
              </Tooltip>

              {/* 使用者名稱與職稱 */}
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Tony Lin
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Front-end Engineer
              </p>
            </div>

            {/* Dropdown 選單項目 */}
            <div className="text-center font-semibold">
              <DropdownMenuItem
                className="justify-center"
                onClick={() => console.log("個人設定")}
              >
                個人設定
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-center"
                onClick={() => console.log("模型訓練")}
              >
                模型訓練
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white transition-colors"
                onClick={() => console.log("登出")}
              >
                登出
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🔔 通知按鈕 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-2 grid gap-4">
            {/* 推播通知開關 */}
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
              <Switch
                checked={isPushEnabled}
                onCheckedChange={togglePushNotifications}
              />
            </div>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">沒有新的通知</p>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemoveAction={() => removeNotification(notification.id)}
                  />
                ))}
              </div>
            )}
            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={() => clearNotifications()}
            >
              標記所有為已讀
            </Button>
          </PopoverContent>
        </Popover>

        {/* 暗黑模式切換 */}
        <ModeToggle />
      </div>
    </header>
  );
}
