import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useModels } from "./ModelsProvider";

export function ModelVersionSelector({
  modelId,
  currentVersion,
}: {
  modelId: string;
  currentVersion: string | undefined;
}) {
  const { allModelVersionNumbers, selectModelVersion } = useModels();

  // 檢查該模型是否有對應的版本
  const hasVersions = allModelVersionNumbers[modelId]?.length > 0;

  // 取得所有版本號，若沒有則提供 ["No Version"]
  const numbers = hasVersions
    ? [...allModelVersionNumbers[modelId]]
    : ["No Versions"];

  // 需要對 numbers 進行重新排序 將版本數最大的字串排在第一位 陣列資料為 "1.0", "1.1", "1.2", "2.2" 等等
  numbers.sort((a, b) => {
    const parseVersion = (v: string) =>
      (v.startsWith("v") ? v.slice(1) : v) // 只有 "v" 開頭才移除
        .split(".")
        .map(Number);

    const aParts = parseVersion(a);
    const bParts = parseVersion(b);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      // 若遭遇短版本 1.1 則補零，例如 1.1 變成 [1,1,0]
      const numA = aParts[i] ?? 0;
      const numB = bParts[i] ?? 0;
      if (numA !== numB) {
        return numB - numA; // 讓最大版本數（最新）排在前面
      }
    }
    return 0;
  });

  // 預設顯示最新版本（取第一個）
  // const latestVersion = hasVersions ? numbers[0] : "No Version";

  if (!currentVersion) {
    currentVersion = "No Versions";
  }

  return (
    <Select
      value={currentVersion} // 使用 `row` 內的版本，而非全域狀態
      onValueChange={(newVersion) => selectModelVersion(modelId, newVersion)}
      disabled={!hasVersions} // 當沒有版本時禁用
    >
      <SelectTrigger className="w-[180px] pl-2">
        <SelectValue
          placeholder={numbers.length > 0 ? "Select Version" : "No Versions"}
        />
      </SelectTrigger>
      {numbers.length > 0 && (
        <SelectContent>
          {numbers.map((n) => (
            <SelectItem key={n} value={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
}
