import { ModelVersion } from "./ModelsColumns";

/**
 * 更新指定模型的版本
 * @param modelId - 目標模型的 ID
 * @param version - 指定的版本
 * @param modelVersions - 該模型的所有版本數據
 * @returns ModelVersion（更新後的模型物件）
 */

export function getModelVersion(
  modelId: string,
  version: string,
  modelVersions: ModelVersion[]
): ModelVersion {
  // 查找指定模型的版本
  const selectedVersion = modelVersions.find(
    (v) => v.modelId === modelId && v.version === version
  )!;

  return selectedVersion;
}
