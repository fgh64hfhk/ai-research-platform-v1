"use client";

import DialogComponent from "./DialogComponent";
import AddModelVersionFormUI from "./AddModelVersionFormUI";

import { useModelVersionForm } from "./useModelVersionValidation";
import { useModelVersionSubmit } from "./useModelVersionSubmit";
import { useEffect, useState } from "react";
import { Model } from "../ModelsColumns";

export default function AddModelVersionLogic() {
  // 初始化表單
  const { form } = useModelVersionForm();
  const { submitModelVersion } = useModelVersionSubmit();

  const [open, setOpen] = useState(false);

  const [btnDisable, setBtnDisable] = useState(true);
  const [model, setModel] = useState<Model | null>(null);

  // 監聽 sessionStorageUpdated 事件來自動開啟對話匡
  useEffect(() => {
    const handleStorageUpdate = () => {
      const tempModel = sessionStorage.getItem("tempModel");
      const hasOpened = sessionStorage.getItem("hasOpenedVersionDialog");

      if (tempModel && hasOpened !== "true") {
        const parsedModel = JSON.parse(tempModel);

        setOpen(true);
        setBtnDisable(false);
        setModel(parsedModel);
        sessionStorage.setItem("hasOpenedVersionDialog", "true");
      }
    };

    window.addEventListener("sessionStorageUpdated", handleStorageUpdate);
    return () => {
      window.removeEventListener("sessionStorageUpdated", handleStorageUpdate);
    };
  }, []);

  // 提交表單的邏輯
  const handleSubmit = async () => {
    const isValid = await form.trigger(); // 先驗證表單
    if (!isValid) return false;

    setBtnDisable(true);
    return await submitModelVersion(form.getValues());
  };

  return (
    <DialogComponent
      title={`新增模型版本（${model?.name}）`}
      description="請輸入此版本的基本資訊，點擊「新增」來儲存。"
      onSubmitAction={handleSubmit}
      submitButtonLabel="儲存"
      cancelButtonLabel="取消"
      triggerButtonLabel="新增模型版本"
      size="lg"
      open={open}
      onOpenAction={setOpen}
      triggerButtonDisable={btnDisable}
    >
      <AddModelVersionFormUI form={form} />
    </DialogComponent>
  );
}
