import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ModelVersion, ModelStatus, ModelParameters } from "../ModelsColumns";

// 根據 ModelParameters 類別定義 Zod Schema
const modelParametersSchema: z.ZodType<ModelParameters> = z.object({
  modelVersionId: z.string(),
  learningRate: z.number().positive({ message: "學習率必須為正數" }),
  batchSize: z.number().positive({ message: "批次大小必須為正數" }),
  epochs: z.number().min(1, { message: "Epochs 必須至少為 1" }),
  optimizer: z.enum(["adam", "sgd", "rmsprop"], {
    message: "請選擇一個有效的優化器",
  }),
  lossFunction: z.enum(["crossentropy", "mse"], {
    message: "請選擇一個有效的損失函數",
  }),
  datasetVersion: z.string().min(1, { message: "請提供資料集版本" }),
  pretrainedModel: z.boolean(),
  augmentation: z.boolean(),
});

// 根據 ModelVersion 類別定義 Zod Schema
export const versionFormSchema: z.ZodType<ModelVersion> = z.object({
  modelId: z.string(),
  version: z.string(),
  modifiedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "請提供有效的日期格式 (YYYY-MM-DD)",
  }),
  modifiedType: z.string().min(5, { message: "請提供至少 5 個字的修改描述" }),
  trainingTime: z.number().min(1, { message: "訓練時間必須大於 0 秒" }),
  buildDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "請提供有效的日期格式 (YYYY-MM-DD)",
  }),
  status: z.nativeEnum(ModelStatus, {
    errorMap: () => ({ message: "請選擇一個有效的狀態" }),
  }),
});

export const versionParametersFormSchema = z.object({
  version: versionFormSchema,
  parameters: modelParametersSchema,
});

// 建立 React Hook Form 的 `useModelVersionForm`
export function useModelVersionForm() {
  const form = useForm<z.infer<typeof versionParametersFormSchema>>({
    resolver: zodResolver(versionParametersFormSchema),
    defaultValues: {
      version: {
        modelId: "Model_ID",
        version: "v1.0",
        modifiedDate: "2020-01-01",
        modifiedType: "這是預設描述",
        trainingTime: 2,
        buildDate: "2020-01-01",
        status: ModelStatus.PENDING_DEPLOYMENT,
      },
      parameters: {
        modelVersionId: "",
        learningRate: 0.001,
        batchSize: 32,
        epochs: 10,
        optimizer: "adam",
        lossFunction: "crossentropy",
        datasetVersion: "V1.0",
        pretrainedModel: false,
        augmentation: false,
      },
    },
  });

  return { form };
}
