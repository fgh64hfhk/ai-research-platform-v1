import { ModelVersion } from "./ModelsColumns";

/**
 * 取得所有模型的版本號列表
 *
 * @param {ModelVersion[]} modelVersionData - 所有模型的版本數據陣列
 * @returns {Record<string, string[]>} 返回一個對應模型 ID 的版本號映射表
 *
 * @example
 * const modelVersions = [
 *   { modelId: "M001", version: "v1.0" },
 *   { modelId: "M001", version: "v1.1" },
 *   { modelId: "M002", version: "v1.0" },
 * ];
 *
 * getAllModelVersionNumbers(modelVersions);
 * // 返回：
 * // {
 * //   "M001": ["v1.0", "v1.1"],
 * //   "M002": ["v1.0"]
 * // }
 */

/**
 * 優化點解析
	1.	使用 reduce() → 直接建立 allVersionNumbersMap，減少不必要的 if 檢查，提高可讀性。
	2.	使用 acc[modelId] ||= [] → 如果 acc[modelId] 尚未定義，則初始化為空陣列，簡化程式碼。
	3.	添加完整 JSDoc 註解 →
	•	@param 描述 modelVersionData 參數。
	•	@returns 描述回傳格式。
	•	@example 提供範例，讓開發者可以快速理解用法。
 */
export function getAllModelVersionNumbers(
  modelVersionData: ModelVersion[]
): Record<string, string[]> {
  return modelVersionData.reduce<Record<string, string[]>>(
    (acc, { modelId, version }) => {
      // 如果該 modelId 尚未存在於 map，則初始化為空陣列
      // 將版本號加入對應的 modelId 陣列
      (acc[modelId] ||= []).push(version);
      return acc;
    },
    {}
  );
}
