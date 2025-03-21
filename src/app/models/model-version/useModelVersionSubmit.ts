import { useCallback } from "react";
import { useModels } from "../ModelsProvider";

import { z } from "zod";
import { versionParametersFormSchema } from "./useModelVersionValidation";

import {
  Model,
  ModelVersion,
  ModelWithVersion,
  ModelStatus,
} from "../ModelsColumns";

export function useModelVersionSubmit() {
  const { addFinalModel } = useModels();

  const submitModelVersion = useCallback(
    async (
      values: z.infer<typeof versionParametersFormSchema>
    ): Promise<boolean> => {
      try {
        // 1️⃣ 從 sessionStorage 取得 Model Summary
        const modelSummary = sessionStorage.getItem("tempModel");
        if (!modelSummary) {
          console.error("❌ 找不到 Model Summary");
          return false;
        }
        const modelData: Model = JSON.parse(modelSummary);

        // 2️⃣ 創建 ModelWithVersion
        const newModelVersion: ModelVersion = {
          modelId: modelData.id,
          version: values.version.version,
          modifiedDate: values.version.modifiedDate,
          modifiedType: values.version.modifiedType,
          trainingTime: values.version.trainingTime,
          buildDate: values.version.buildDate,
          status:
            ModelStatus[
              values.version.status as unknown as keyof typeof ModelStatus
            ] || ModelStatus.PENDING_DEPLOYMENT,
        };

        // 3️⃣ 提取 parameters，並生成獨立的 parametersId
        const parametersId = crypto.randomUUID();
        const parameters = {
          parametersId,
          ...values.parameters,
          modelVersionId: `${newModelVersion.modelId}-${newModelVersion.version}`,
        };

        // 4️⃣ 製作 ModelWithVersion 存入資料庫
        const newModelWithVersion: ModelWithVersion = {
          ...modelData,
          modelVersion: newModelVersion,
        };

        console.log(
          `📩 提交模型版本:\n${JSON.stringify(newModelWithVersion, null, 2)}`
        );
        console.log(`📩 提交參數表:\n${JSON.stringify(parameters, null, 2)}`);

        addFinalModel(newModelWithVersion);

        return true; // 提交成功
      } catch (error) {
        console.error("❌ 提交失敗:", error);
        return false;
      }
    },
    [addFinalModel]
  );

  return { submitModelVersion };
}
