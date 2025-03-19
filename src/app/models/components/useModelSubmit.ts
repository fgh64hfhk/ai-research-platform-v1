import { useCallback } from "react";
import { useModels } from "../ModelsProvider";
import { z } from "zod";

import { formSchema } from "./useModelForm";

export function useModelSubmit() {
  const { addTempModel } = useModels();

  const submitModel = useCallback(
    (values: z.infer<typeof formSchema>) => {
      // 取得表單數據並處理
      const newModel = {
        id: crypto.randomUUID(),
        name: values.modelName,
        language: values.language,
        description: values.description || "",
      };

      console.log(`📩 提交數據:\n${JSON.stringify(newModel, null, 2)}`);
      console.log("📁 上傳的檔案:", values.file);

      // 實際提交
      addTempModel(newModel);
    },
    [addTempModel]
  );

  return { submitModel };
}
