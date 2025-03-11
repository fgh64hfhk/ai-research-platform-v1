// 引入必要的模組
"use client";

import { createColumns } from "./createColumns";

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

export type ModelWithLatestVersion = Model & {
  latestVersion?: ModelVersion; // 最新版本
};

// 定義表格列 (columns 設置)
export const columns = createColumns<ModelWithLatestVersion>([
  { accessorKey: "name", header: "Model Name" },
  { accessorKey: "language", header: "Language" },
  {
    accessorKey: "latestVersion.version",
    header: "Latest Version",
    cell: ({ row }) => row.original.latestVersion?.version || "N/A",
  },
  {
    accessorKey: "latestVersion.modifiedDate",
    header: "Last Modified",
    cell: ({ row }) => row.original.latestVersion?.modifiedDate || "N/A",
  },
  {
    accessorKey: "latestVersion.trainingTime",
    header: "Training Time (hrs)",
    cell: ({ row }) => {
      const time = row.original.latestVersion?.trainingTime ?? 0;
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      return time !== 0 ? `${hours}h ${minutes}m` : "N/A";
    },
  },
  {
    accessorKey: "latestVersion.buildDate",
    header: "Build Date",
    cell: ({ row }) => row.original.latestVersion?.buildDate || "N/A",
  },
  {
    accessorKey: "latestVersion.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.latestVersion?.status || "Unknown";
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
