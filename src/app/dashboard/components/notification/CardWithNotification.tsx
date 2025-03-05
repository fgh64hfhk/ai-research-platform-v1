"use client";

import { BellRing, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from "../../hook/useNotifications";
import { ToastProps } from "./SonnerToast";

import { motion } from "motion/react";
import { useState } from "react";

type CardProps = React.ComponentProps<typeof Card>;

export default function CardWithNotification({
  className,
  ...props
}: CardProps) {
  const { notifications, removeNotification, clearNotifications } =
    useNotifications();
  const unreadNotifications = notifications.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-6">
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            You have {unreadNotifications} unread messages.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
            <Switch />
          </div>

          {/* 通知列表 */}
            <div className="items-center rounded-md border p-4">
              {notifications.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No notifications available.
                </p>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemoveAction={() => removeNotification(notification.id)}
                  />
                ))
              )}
            </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              // notifications.forEach((n) => (n.read = true));
              console.log("All notification marked as read.");
              clearNotifications();
            }}
          >
            Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * 獨立的通知項目元件
 */
export function NotificationItem({
  notification,
  onRemoveAction,
}: {
  notification: ToastProps;
  onRemoveAction: () => void;
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
  };

  const mark = (() => {
    switch (notification.type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";

      case "info":
        return "bg-blue-500";

      default:
        return "bg-gray-500";
    }
  })();

  return (
    <motion.div
      layout
      initial={{ x: 0, opacity: 1 }}
      animate={isRemoving ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isRemoving) onRemoveAction();
      }}
      className="flex items-center justify-between p-3 mb-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition"
    >
      {/* 狀態標記點 */}
      <span className={`flex h-2 w-2 rounded-full ${mark} mr-3`} />
      {/* 通知內容 */}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {notification.description}
        </p>
        <p className="text-xs text-gray-400">{notification.timestamp}</p>
      </div>
      {/* 刪除按鈕 */}
      <button
        className="text-gray-500 hover:text-red-400 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
        onClick={handleRemove}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
