"use client";
import { forwardRef, useImperativeHandle } from "react";
import { useModelForm } from "./useModelForm";
import { useModelSubmit } from "./useModelSubmit";
import AddModelFormUI from "./AddModelFormUI";

const AddModelFormLogic = forwardRef((_, ref) => {
  const { form } = useModelForm();
  const { submitModel } = useModelSubmit();

  // 設定給父組件的提交方法
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      try {
        let success = false;
        await form.handleSubmit(async (data) => {
          success = await submitModel(data); // 確保 submitModel 正確執行
        })();
        return success; // 根據 submitModel 的結果回傳成功或失敗
      } catch (error) {
        console.error("提交失敗:", error);
        return false; // 提交失敗
      }
    },
  }));

  return <AddModelFormUI form={form} />;
});

AddModelFormLogic.displayName = "AddModelFormLogic";

export default AddModelFormLogic;
