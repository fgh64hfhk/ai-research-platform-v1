// 引入必要的模組
"use client";

import { createColumns } from "./createColumns";

import { DataTableColumnHeader } from "./ColumnHeader";

import { ModelVersionSelector } from "./ModelVersionSelect";
import { ModelStatusBadge } from "./ModelStatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatDate } from "./formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Clipboard,
  Trash,
  Pencil,
  History,
} from "lucide-react";

// 定義數據類型 (Model Type)
export type Model = {
  id: string;
  name: string;
  language: string;
  description: string;
};

// 定義模型版本的狀態 ENUM
export enum ModelStatus {
  DEPLOYMENT_FAILED = "Deployment Failed",
  DEPLOYED = "Deployed",
  TRAINING = "Training",
  DEPLOYMENT_CANCELED = "Deployment Canceled",
  PENDING_DEPLOYMENT = "Pending Deployment",
  SCHEDULED = "Scheduled",
  INACTIVE = "Inactive",
}

// 定義數據類型 (Model Version Type)
export type ModelVersion = {
  modelId: string; // 對應的模型 ID
  version: string; // 版本號
  modifiedDate: string; // 修改日期
  modifiedType: string; // 變更類型
  trainingTime: number; // 訓練時間
  buildDate: string; // 構建日期
  status?: ModelStatus;
};

export type ModelWithVersion = Model & {
  modelVersion?: ModelVersion; // 最新版本
};

// 定義模型參數的類型 (Model Parameters Type)
export type ModelParameters = {
  modelVersionId: string; // 綁定的模型版本 ID
  learningRate: number; // 學習率
  batchSize: number; // 訓練批次大小
  epochs: number; // 訓練週期數
  optimizer: "adam" | "sgd" | "rmsprop"; // 優化器選項
  lossFunction: "crossentropy" | "mse"; // 損失函數
  datasetVersion: string; // 資料集版本
  pretrainedModel: boolean; // 是否使用預訓練模型
  augmentation: boolean; // 是否啟用數據增強
};

// 定義表格列 (columns 設置)
export const columns = createColumns<ModelWithVersion>([
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Model Name",
    enableHiding: false,
    cell: ({ row }) => {
      const modelId = row.original.id;
      const modelName = row.original.name;
      return (
        <Button variant="link" className="text-blue-500 hover:underline pl-0">
          {modelId} - {modelName}
        </Button>
      );
    },
  },
  {
    accessorKey: "language",
    header: "Language",
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        {row.original.language.charAt(0).toUpperCase() +
          row.original.language.slice(1)}
      </div>
    ),
  },
  {
    accessorKey: "modelVersion.version",
    header: "Version",
    enableHiding: false,
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
    cell: ({ row }) => {
      const date = row.original.modelVersion?.modifiedDate;
      return date ? <div>{date}</div> : <div>查無日期資料</div>;
    },
  },
  {
    accessorKey: "modelVersion.trainingTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Training Time (hrs)" />
    ),
    cell: ({ row }) => {
      const time = row.original.modelVersion?.trainingTime ?? 0;
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      return time !== 0 ? `${hours}h ${minutes}m` : "N/A";
    },
  },
  {
    accessorKey: "modelVersion.buildDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Build Date" />
    ),
    cell: ({ row }) => (
      <div>{formatDate(row.original.modelVersion?.buildDate)}</div>
    ),
  },
  {
    accessorKey: "modelVersion.status",
    header: "Status",
    cell: ({ row }) => {
      return <ModelStatusBadge status={row.original.modelVersion?.status} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const model = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => console.log("Copy Click")}>
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Model ID: {model.id}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              Model Version History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Delete Click")}>
              <Trash className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit Click")}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]);
