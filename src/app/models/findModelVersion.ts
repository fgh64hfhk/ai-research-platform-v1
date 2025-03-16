import { ModelVersion } from "./ModelsColumns";

/**
 * 根據模型 ID 和版本號獲取對應的模型版本
 *
 * @param {string} modelId - 目標模型的 ID
 * @param {string} version - 指定的版本號
 * @param {ModelVersion[]} modelVersions - 所有模型的版本數據陣列
 * @returns {ModelVersion} 返回找到的 `ModelVersion` 物件
 *
 * @throws 若找不到對應版本，則拋出錯誤
 *
 * @example
 * const modelVersions = [
 *   { modelId: "M001", version: "v1.0", status: "Deployed" },
 *   { modelId: "M001", version: "v1.1", status: "Pending" },
 * ];
 *
 * findModelVersion("M001", "v1.1", modelVersions);
 * // 返回:
 * // { modelId: "M001", version: "v1.1", status: "Pending" }
 */
export function findModelVersion(
  modelId: string,
  version: string,
  modelVersions: ModelVersion[]
): ModelVersion {
  const foundVersion = modelVersions.find(
    (v) => v.modelId === modelId && v.version === version
  );

  if (!foundVersion) {
    throw new Error(`Model version ${version} for model ${modelId} not found.`);
  }

  return foundVersion;
}
