// 引入必要的模組
"use client";

import { createColumns } from "./createColumns";

import { DataTableColumnHeader } from "./ColumnHeader";

import { ModelVersionSelector } from "./ModelVersionSelect";

// 定義數據類型 (Model Type)
export type Model = {
  id: string;
  name: string;
  language: string;
  description: string;
};

// 定義數據類型 (Model Version Type)
export type ModelVersion = {
  modelId: string; // 對應的模型 ID
  version: string; // 版本號
  modifiedDate: string; // 修改日期
  modifiedType: string; // 變更類型
  trainingTime: number; // 訓練時間
  buildDate: string; // 構建日期
  status?:
    | "Deployment Failed"
    | "Deployed"
    | "Training"
    | "Deployment Canceled"
    | "Pending Deployment"
    | "Scheduled"
    | "Inactive"
    | undefined;
};

export type ModelWithVersion = Model & {
  modelVersion?: ModelVersion; // 最新版本
};

// 定義表格列 (columns 設置)
export const columns = createColumns<ModelWithVersion>([
  {
    accessorKey: "name",
    header: "Model Name",
  },
  { accessorKey: "language", header: "Language" },
  {
    accessorKey: "modelVersion.version",
    header: "Version",
    cell: ({ row }) => (
      <ModelVersionSelector
        modelId={row.original.id}
        currentVersion={row.original.modelVersion?.version}
      />
    ),
  },
  {
    accessorKey: "modelVersion.modifiedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Modified" />
    ),
    cell: ({ row }) => row.original.modelVersion?.modifiedDate || "N/A",
  },
  {
    accessorKey: "modelVersion.trainingTime",
    header: "Training Time (hrs)",
    cell: ({ row }) => {
      const time = row.original.modelVersion?.trainingTime ?? 0;
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      return time !== 0 ? `${hours}h ${minutes}m` : "N/A";
    },
  },
  {
    accessorKey: "modelVersion.buildDate",
    header: "Build Date",
    cell: ({ row }) => row.original.modelVersion?.buildDate || "N/A",
  },
  {
    accessorKey: "modelVersion.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.modelVersion?.status || "Unknown";
      return (
        <span
          className={`status-badge ${status.toLowerCase().replace(/\s/g, "-")}`}
        >
          {status}
        </span>
      );
    },
  },
]);
