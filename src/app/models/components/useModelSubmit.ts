import { useCallback } from "react";
import { useModels } from "../ModelsProvider";
import { z } from "zod";

import { formSchema } from "./useModelForm";

export function useModelSubmit() {
  const { addTempModel } = useModels();

  const submitModel = useCallback(
    async (values: z.infer<typeof formSchema>): Promise<boolean> => {
      try {
        // 取得表單數據並處理
        const newModel = {
          id: crypto.randomUUID(),
          name: values.modelName,
          language: values.language,
          description: values.description || "",
        };

        console.log(`📩 提交數據:\n${JSON.stringify(newModel, null, 2)}`);
        console.log("📁 上傳的檔案:", values.file);

        // 模擬 API 提交延遲
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 實際提交
        addTempModel(newModel);

        return true; // 提交成功
      } catch (error) {
        console.error("❌ 提交失敗:", error);
        return false;
      }
    },
    [addTempModel]
  );

  return { submitModel };
}
