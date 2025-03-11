import { ColumnDef } from "@tanstack/react-table";

/**
 * 泛型函數來創建列結構
 * @param keys - 需要顯示的資料鍵值與標題
 * @returns 可用於 react-table 的 columns 陣列
 */
export function createColumns<T extends object>(
  keys: { accessorKey: keyof T; header: string }[]
): ColumnDef<T>[] {
  return keys.map(({ accessorKey, header }) => ({
    accessorKey,
    header,
  }));
}
