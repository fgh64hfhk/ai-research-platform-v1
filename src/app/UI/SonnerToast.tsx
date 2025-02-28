"use client";

import React, { JSX } from "react";
import { toast as sonnerToast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: ToastType;
  button?: {
    label: string;
    onClick: () => void;
  };
}

// 註冊通用的 toast 組件函式，支援 成功、錯誤、警告、資訊 等類型
export function toast({
  title,
  description,
  type,
  button,
}: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={title}
      description={description}
      type={type}
      button={button}
    />
  ));
}

// 完全可自訂的 Toast 元件
function Toast({ id, title, description, type, button }: ToastProps) {
  // 動態選擇圖示與顏色
  const iconMap: Record<string, JSX.Element> = {
    success: <CheckCircle className="text-green-500 w-5 h-5" />,
    error: <XCircle className="text-red-500 w-5 h-5" />,
    warning: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
    info: <Info className="text-blue-500 w-5 h-5" />,
    default: <Info className="text-gray-500 w-5 h-5" />,
  };

  return (
    <div className="flex items-center w-full max-w-sm md:max-w-[400px] p-4 rounded-lg shadow-lg bg-white ring-1 ring-black/5">
      <div className="mr-3">{iconMap[type || "default"]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {button && (
        <Button
          className="ml-4 bg-indigo-50 text-indigo-600 px-3 py-1 text-sm font-semibold rounded hover:bg-indigo-100"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
}

export default function SonnerToast() {
  return (
    <div className="flex items-center justify-center h-screen space-x-4">
      <h1>彈出提示視窗測試</h1>
      <Button
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        onClick={() => {
          toast({
            title: "成功！",
            description: "您的變更已成功儲存。",
            type: "success",
            button: {
              label: "復原",
              onClick: () => alert("已復原！"),
            },
          });
        }}
      >
        顯示成功通知
      </Button>
      <Button
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        onClick={() =>
          toast({
            title: "錯誤！",
            description: "無法連接到伺服器。",
            type: "error",
          })
        }
      >
        顯示錯誤通知
      </Button>
      <Button
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        onClick={() =>
          toast({
            title: "警告！",
            description: "您的帳戶即將到期",
            type: "warning",
          })
        }
      >
        顯示警告通知
      </Button>
      <Button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() =>
          toast({
            title: "資訊",
            description: "這是一條普通通知。",
            type: "info",
            button: {
              label: "關閉",
              onClick: () => alert("關閉通知。"),
            },
          })
        }
      >
        顯示資訊通知
      </Button>
      <Button
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        onClick={() =>
          toast({
            title: "預設",
            description: "這是一條預設通知。",
            button: {
              label: "關閉",
              onClick: () => alert("關閉通知。"),
            },
          })
        }
      >
        顯示預設通知
      </Button>
    </div>
  );
}
