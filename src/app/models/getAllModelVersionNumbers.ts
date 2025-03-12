import { ModelVersion } from "./ModelsColumns";

export function getAllModelVersionNumbers(
  modelVersionData: ModelVersion[]
): Record<string, string[]> {
  const allVersionNumbersMap: Record<string, string[]> = {};

  modelVersionData.forEach(({ modelId, version }) => {
    // 如果該 modelId 尚未存在於 map，則初始化為空陣列
    if (!allVersionNumbersMap[modelId]) {
      allVersionNumbersMap[modelId] = [];
    }
    // 將版本號加入對應的 modelId 陣列
    allVersionNumbersMap[modelId].push(version);
  });

  return allVersionNumbersMap;
}
