import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastProps, ToastType } from "../components/notification/SonnerToast";

export default function useNotifications() {
  const [notifications, setNotifications] = useState<ToastProps[]>([]);

  // 新增通知
  const addNotification = (
      title: string,
      description: string,
      type: ToastType,
      timestamp: string,
  ) => {
    const newNotification: ToastProps = {
      id: nanoid(),
      title,
      description,
      type,
      timestamp,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // 刪除單一通知

  // 清空所有通知

  return { notifications, addNotification };
}
