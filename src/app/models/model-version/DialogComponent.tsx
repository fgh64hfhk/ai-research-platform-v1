"use client";

import { useCallback, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Upload } from "lucide-react";

interface DialogComponentProps {
  title: string; // 可變標題
  description?: string; // 可變描述
  children: ReactNode; // 表單或內容
  onSubmitAction: () => Promise<boolean>; // 提交時的行為
  submitButtonLabel?: string; // 允許變更提交按鈕文字
  cancelButtonLabel?: string; // 允許變更取消按鈕文字
  triggerButtonLabel?: string; // 允許變更觸發對話框的按鈕
  triggerButtonDisable?: boolean;
  size?: "sm" | "md" | "lg"; // 可變大小
  open: boolean;
  onOpenAction: (isOpen: boolean) => void;
}

export default function DialogComponent({
  title,
  description,
  children,
  onSubmitAction,
  submitButtonLabel = "確認",
  cancelButtonLabel = "取消",
  triggerButtonLabel = "開啟",
  triggerButtonDisable = true,
  size = "md",
  open,
  onOpenAction,
}: DialogComponentProps) {
  const handleSubmit = useCallback(async () => {
    const success = await onSubmitAction();
    if (success) {
      onOpenAction(false);
    }
  }, [onSubmitAction, onOpenAction]);

  return (
    <Dialog open={open} onOpenChange={onOpenAction}>
      <DialogTrigger asChild>
        <Button
          disabled={triggerButtonDisable}
          variant="secondary"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Upload className="w-5 h-5" />
          {triggerButtonLabel}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`sm:max-w-${size} max-h-[80vh] overflow-y-auto flex flex-col justify-between`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* 這裡是傳遞進來的表單組件 */}
        {children}

        <DialogFooter>
          <div className="flex justify-end mt-4 space-x-2">
            <DialogClose asChild>
              <Button variant="outline">{cancelButtonLabel}</Button>
            </DialogClose>
            <Button variant="secondary" onClick={handleSubmit}>
              {submitButtonLabel}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
