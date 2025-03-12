// 引入必要的模組
"use client";

import { createColumns } from "@/app/payments/createColumns";

import { DataTableColumnHeader } from "./ColumnHeader";

// 定義數據類型 (Payment Type)
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  date: string;
};

// 定義表格列 (columns 設置)
export const columns = createColumns<Payment>([
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "date", header: "Date" },
]);
