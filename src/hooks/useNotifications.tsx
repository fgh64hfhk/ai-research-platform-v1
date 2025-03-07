import { useState, useContext, createContext, ReactNode } from "react";
import { nanoid } from "nanoid";
import { ToastProps, ToastType } from "@/components/layout/SonnerToast";

// 定義 Context Type
interface NotificationContextType {
  notifications: ToastProps[];
  addNotification: (title: string, description: string, type: ToastType) => void;
  removeNotification: (id: string | number) => void;
  clearNotifications: () => void;
}

// 建立 Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// ✅ 建立 Provider，讓所有組件共享 `notifications` 狀態
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ToastProps[]>([]);

  // 新增通知
  const addNotification = (title: string, description: string, type: ToastType) => {
    const newNotification: ToastProps = {
      id: nanoid(),
      title,
      description,
      type,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotification, ...prev]); // 最新通知排在最前
  };

  // 刪除單一通知
  const removeNotification = (id: string | number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // 清空所有通知
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// ✅ 使用 Context，確保所有組件共享相同的通知狀態
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}