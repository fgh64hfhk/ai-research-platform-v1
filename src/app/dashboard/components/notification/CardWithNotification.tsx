"use client";

import { BellRing, Check, X } from "lucide-react";
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

          <div>
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No notifications available.
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-4 grid grid-cols-[25px_1fr_auto] items-start pb-4 last:mb-0 last:pb-0 border-b border-gray-200 dark:border-gray-700"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400">{notification.timestamp}</p>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => removeNotification(notification.id)}
                  >
                    {true ? <X /> : <Check />}
                  </button>
                </div>
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
