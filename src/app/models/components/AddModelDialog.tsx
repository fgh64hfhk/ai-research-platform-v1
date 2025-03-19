"use client";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Upload } from "lucide-react";

import AddModelFormLogic from "./AddModelFormLogic";

/**
 *
 * `AddModelDialog` 組件僅負責顯示新增模型的對話框
 * 表單提交邏輯應交由 `AddModelForm.tsx` 處理。
 * @returns 只包含視窗樣式的對話框
 */

export default function AddModelDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<{ submitForm: () => Promise<boolean> } | null>(null);

  const handleSubmit = async () => {
    if (formRef.current) {
      const isSuccess = await formRef.current.submitForm();
      if (isSuccess) {
        setIsOpen(false); // 提交成功後關閉對話框
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Upload className="w-5 h-5" />
            新增模型
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle>新增模型</DialogTitle>
            <DialogDescription>
              請輸入模型的基本資訊，點擊「新增」來儲存。
            </DialogDescription>
          </DialogHeader>

          {/* 只顯示 AddModelForm，不處理提交邏輯 */}
          <AddModelFormLogic ref={formRef} />

          <div className="flex justify-end mt-4 space-x-2">
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button variant="secondary" onClick={handleSubmit}>
              新增模型
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
