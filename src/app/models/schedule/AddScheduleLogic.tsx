"use client";

import { useState } from "react";
import { BaseDialog } from "./BaseDialog";
import { AddScheduleFormUI } from "./AddScheduleFormUI";
import { Button } from "@/components/ui/button";

import { useScheduleSubmit } from "./useScheduleSubmit";
import { ScheduleFormValues } from "./scheduleSchema";

export const AddScheduleLogic = () => {
  const [open, setOpen] = useState(false);

  const { submitSchedule } = useScheduleSubmit();

  // 實作提交的邏輯
  const handleSubmit = async (values: ScheduleFormValues) => {
    const result = await submitSchedule(values);

    if (result.success) {
      setOpen(false); // 成功提交後關閉對話匡
      console.log("✅ 排程已加入：", result);
    } else {
      console.error("❌ 排程加入失敗：", result.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        新增訓練排程
      </Button>

      <BaseDialog
        open={open}
        onOpenChange={setOpen}
        title="新增訓練排程"
        description="請填寫排程的資訊"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button form="schedule-form" type="submit">
              提交排程
            </Button>
          </>
        }
      >
        <AddScheduleFormUI onSubmit={handleSubmit} />
      </BaseDialog>
    </div>
  );
};
