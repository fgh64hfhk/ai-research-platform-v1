"use client";

import React, { JSX } from "react";
import { toast as sonnerToast } from "sonner";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

// 定義通知類型
export type ToastType = "success" | "error" | "warning" | "info" | "default";

// Toast 參數定義
export interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: ToastType;
  button?: {
    label: string;
    onClick: () => void;
  };
  timestamp: string; // 時間戳記
}

// 註冊通用的 toast 組件函式，支援 成功、錯誤、警告、資訊 等類型 支援自定義的 duration and position
export function toast({
  title,
  description,
  type,
  button,
  duration = 3000,
  position = "top-right",
}: Omit<ToastProps, "id" | "timestamp"> & {
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        title={title}
        description={description}
        type={type}
        button={button}
        timestamp={new Date().toLocaleString()} // 🔹 自動補上 timestamp
      />
    ),
    { duration, position }
  );
}

// 圖示對應不同類型的通知
const iconMap: Record<string, JSX.Element> = {
  success: <CheckCircle className="text-green-500 w-5 h-5" />,
  error: <XCircle className="text-red-500 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
  info: <Info className="text-blue-500 w-5 h-5" />,
  default: <Info className="text-gray-500 w-5 h-5" />,
};

// 完全可自訂的 Toast 元件
function Toast({ id, title, description, type, button }: ToastProps) {
  // 需要檢查傳入的參數是否為 undefined，因為 undefined 不能作為物件的索引值

  return (
    <div className="flex items-center w-full max-w-sm md:max-w-[400px] p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5">
      <div className="mr-3">{iconMap[type || "default"]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {button && (
        <Button
          className="ml-4 bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 text-sm font-semibold rounded hover:bg-indigo-100 dark:hover:bg-indigo-700"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
      <button
        className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onClick={() => sonnerToast.dismiss(id)}
      >
        <X className="w-4 h-4" onClick={() => sonnerToast.dismiss(id)} />
      </button>
    </div>
  );
}

// 測試 UI
export default function SonnerToast() {
  const { addNotification } = useNotifications();

  const handleToast = (
    title: string,
    description: string,
    type: ToastType = "default",
    label?: string
  ) => {
    // 記錄通知
    addNotification(title, description, type);

    toast({
      title: title,
      description: description,
      type: type,
      button: label
        ? {
            label,
            onClick: () => alert(`操作: ${label}`),
          }
        : undefined,
    });
  };

  // 整合通知訊息的狀態管理用於追蹤歷史訊息

  return (
    <div className="flex flex-col items-center justify-center h-screen space-x-4">
      <h1 className="text-lg font-semibold">彈出提示視窗測試</h1>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <Button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() =>
            handleToast("成功！", "您的變更已成功儲存。", "success", "復原")
          }
        >
          顯示成功通知
        </Button>
        <Button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => handleToast("錯誤！", "無法連接到伺服器。", "error")}
        >
          顯示錯誤通知
        </Button>
        <Button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          onClick={() => handleToast("警告！", "您的帳戶即將到期。", "warning")}
        >
          顯示警告通知
        </Button>
        <Button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() =>
            handleToast("資訊", "這是一條普通通知。", "info", "關閉")
          }
        >
          顯示資訊通知
        </Button>
        <Button
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() =>
            handleToast("預設", "這是一條預設通知。", undefined, "關閉")
          }
        >
          顯示預設通知
        </Button>
      </div>
    </div>
  );
}
