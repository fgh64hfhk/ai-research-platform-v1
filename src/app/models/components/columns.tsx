"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  ArrowUpDown,
  Clipboard,
  History,
  Trash,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export type Model = {
  id: string; // 唯一標識符
  name: string; // Model Name
  version: string; // Version
  language: string; // Language
  trainingTime: number; // Training Time in minutes
  buildDate: string; // Build Date (日期格式: YYYYMMDD)
  status?:
    | "Deployment Failed"
    | "Deployed"
    | "Training"
    | "Deployment Canceled"
    | "Pending Deployment"
    | undefined;
};

export type ModelVersion = {
  modelId: string; // 關聯的 Model ID
  version: string; // 版本號
  modifiedDate: string; // YYYYMMDD 格式
  modifiedType: string; // 變更類型
  status: "Scheduled" | "Deployed" | "Failed" | "Inactive"; // 狀態
};

const getModelStatusColor = (status: string | undefined) => {
  switch (status) {
    case "Deployment Failed":
      return "bg-red-500 text-white hover:bg-red-100 hover:text-red-500"; // ❌
    case "Deployed":
      return "bg-green-500 text-white hover:bg-green-100 hover:text-green-500"; // ✅
    case "Training":
      return "bg-yellow-500 text-white hover:bg-yellow-100 hover:text-yellow-500"; // ⏳
    case "Deployment Canceled":
      return "bg-gray-500 text-white hover:bg-gray-100 hover:text-gray-500"; // 🚫
    case "Pending Deployment":
      return "bg-blue-500 text-white hover:bg-blue-100 hover:text-blue-500"; // ⚪
    default:
      return "bg-gray-100 text-black hover:bg-black hover:text-white"; // 預設樣式
  }
};

const getVersionStatusColor = (status: string) => {
  switch (status) {
    case "Failed":
      return "bg-red-500 text-white hover:bg-red-100 hover:text-red-500"; // ❌ 失敗
    case "Deployed":
      return "bg-green-500 text-white hover:bg-green-100 hover:text-green-500"; // ✅ 已部署
    case "Scheduled":
      return "bg-blue-500 text-white hover:bg-blue-100 hover:text-blue-500"; // ⏳ 預定創建
    case "Inactive":
      return "bg-gray-500 text-white hover:bg-gray-100 hover:text-gray-500"; // 🚫 未啟用
    default:
      return "bg-gray-100 text-black hover:bg-black hover:text-white"; // 預設樣式
  }
};

export const columns: ColumnDef<Model>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
    header: () => <div className="text-left">Model Name</div>,
    enableHiding: false,
  },
  {
    accessorKey: "version",
    header: () => <div className="text-left">Version</div>,
    enableHiding: false,
  },
  {
    accessorKey: "language",
    header: () => <div className="text-left">Language</div>,
    enableHiding: false,
  },
  {
    accessorKey: "trainingTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Training Time
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const minutes = row.getValue("trainingTime");
      if (typeof minutes !== "number" || isNaN(minutes)) return "Invalid Time";

      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const formattedTime =
        hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;

      return <div className="text-left">{formattedTime}</div>;
    },
  },
  {
    accessorKey: "buildDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Build Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue("buildDate");
      if (
        typeof rawDate !== "string" ||
        rawDate.length !== 8 ||
        isNaN(Number(rawDate))
      ) {
        return "Invalid Date";
      }

      const year = rawDate.slice(0, 4);
      const month = rawDate.slice(4, 6);
      const day = rawDate.slice(6, 8);
      const formattedDate = `${year}-${month}-${day}`;

      const dateObject = new Date(formattedDate);

      if (
        dateObject.getFullYear().toString() !== year ||
        (dateObject.getMonth() + 1).toString().padStart(2, "0") !== month ||
        dateObject.getDate().toString().padStart(2, "0") !== day
      ) {
        return "Invalid Date";
      }

      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const s = status || "Default";
      return <Badge className={getModelStatusColor(s)}>{s}</Badge>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Actions</div>,
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(model.id)}
            >
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Model ID: {model.id}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              Model Version History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];

export const versionColumns: ColumnDef<ModelVersion>[] = [
  {
    accessorKey: "version",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Version
        <ArrowUpDown />
      </Button>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "modifiedDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Modified Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue("modifiedDate");
      if (
        typeof rawDate !== "string" ||
        rawDate.length !== 8 ||
        isNaN(Number(rawDate))
      ) {
        return "Invalid Date";
      }

      const year = rawDate.slice(0, 4);
      const month = rawDate.slice(4, 6);
      const day = rawDate.slice(6, 8);
      const formattedDate = `${year}-${month}-${day}`;

      const dateObject = new Date(formattedDate);

      if (
        dateObject.getFullYear().toString() !== year ||
        (dateObject.getMonth() + 1).toString().padStart(2, "0") !== month ||
        dateObject.getDate().toString().padStart(2, "0") !== day
      ) {
        return "Invalid Date";
      }

      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "modifiedType",
    header: () => <div className="text-left">Modified Type</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status || "Inactive";
      return <Badge className={getVersionStatusColor(status)}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {
      const version = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `${version.modelId}-${version.version}`
                )
              }
            >
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Model-Version ID: {`${version.modelId}-${version.version}`}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              Model Version History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
