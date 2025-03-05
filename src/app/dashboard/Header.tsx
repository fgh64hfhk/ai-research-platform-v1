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

import ModeToggle from "./ModeToggle";

import { useNotifications } from "./hook/useNotifications";
import { NotificationItem } from "./components/notification/CardWithNotification";
import { Switch } from "@/components/ui/switch";

import { useNotificationSettings } from "./hook/useNotificationSettings";

export default function Header() {
  const { notifications, removeNotification, clearNotifications } =
    useNotifications();
  const unreadCount = notifications.length;

  const { isPushEnabled, togglePushNotifications } = useNotificationSettings();

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
