"use client";

import { BellRing, Check } from "lucide-react";
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

const notifications = [
  {
    id: 1,
    title: "New project created",
    description: "Your project has been successfully created.",
    date: "2 hours ago",
    read: true,
  },
  {
    id: 2,
    title: "New user registered",
    description: "A new user has registered in your platform.",
    date: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "New payment received",
    description: "You have received a new payment.",
    date: "1 day ago",
    read: false,
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function CardWithNotification({
  className,
  ...props
}: CardProps) {
  const unreadNotifications = notifications.reduce((acc, notification) => {
    return acc + (notification.read ? 0 : 1);
  }, 0);
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
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr_auto] items-start pb-4 last:mb-0 last:pb-0 "
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <Check />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              notifications.forEach((n) => (n.read = true));
              console.log("All notification marked as read.");
            }}
          >
            Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
