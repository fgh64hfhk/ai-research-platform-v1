import { Model, ModelVersion, ModelWithLatestVersion } from "./ModelsColumns";

/**
 * 找出每個模型的最新版本
 * @param models - 所有模型數據
 * @param modelVersions - 所有模型版本數據
 * @returns ModelWithLatestVersion[]（包含最新版本的模型陣列）
 */

export function getLatestModelVersions(
  models: Model[],
  modelVersions: ModelVersion[]
): ModelWithLatestVersion[] {
  // 建立一個 Map 來存放每個 modelId 的最新版本
  const latestVersionsMap: Record<string, ModelVersion> = {};
  // 遍歷所有版本數據，找到每個模型的最新版本
  modelVersions.forEach((version) => {
    const { modelId, modifiedDate } = version;
    // 若 Map 中尚無此 modelId，或找到更新的 modifiedDate，則更新 Map
    if (
      !latestVersionsMap[modelId] ||
      new Date(modifiedDate) > new Date(latestVersionsMap[modelId].modifiedDate)
    ) {
      latestVersionsMap[modelId] = version;
    }
  });
  // 建立最終的 ModelWithLatestVersion 陣列
  return models.map((model) => ({
    ...model,
    latestVersion: latestVersionsMap[model.id] || null, // 若無對應版本則為 null
  }));
}
