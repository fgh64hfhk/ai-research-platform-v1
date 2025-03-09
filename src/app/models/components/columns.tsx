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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// 模型類型
export type Model = {
  id: string; // 唯一標識符
  name: string; // 模型名稱
  language: string; // 使用的程式語言
  description?: string; // 可選：模型描述
};

// 模型版本類型
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

// 模型版本的 key-Value 結構
export type ModelVersionRecord = Record<string, ModelVersion[]>;

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
    case "Scheduled":
      return "bg-orange-500 text-white hover:bg-orange-100 hover:text-orange-500";
    case "Inactive":
      return "bg-lime-500 text-white hover:bg-lime-100 hover:text-lime-500";
    default:
      return "bg-gray-100 text-black hover:bg-black hover:text-white"; // 預設樣式
  }
};

export function getModelColumns(
  modelVersions: Record<string, ModelVersion[]>,
  selectedVersions: Record<string, string>,
  onSelectedVersionChange: (modelId: string, version: string) => void
): ColumnDef<Model>[] {
  return [
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
      filterFn: "includesString",
      cell: () => {

      },
    },
    {
      accessorKey: "version",
      header: () => <div className="text-left">Version</div>,
      enableHiding: false,
      cell: ({ row }) => {
        const modelId = row.original.id; // 取得當前模型的 ID

        const versions = modelVersions[modelId] || []; // 若無版本，回傳空陣列

        const latestVersion = versions.length > 0 ? versions[0].version : "N/A";

        // 在 DataTable 外部建立 useState 來管理 selectedVersions
        const selectedVersion = selectedVersions[modelId] || latestVersion;

        return versions.length > 0 ? (
          <Select
            value={selectedVersion}
            onValueChange={(newVersion) =>
              onSelectedVersionChange(modelId, newVersion)
            }
          >
            <SelectTrigger className="w-[180px] pl-2">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Version</SelectLabel>
                {modelVersions[modelId]?.map((v) => (
                  <SelectItem key={v.version} value={v.version}>
                    {v.version}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <div className="text-left">No Versions Available</div> // ✅ 確保沒有版本的模型仍然顯示
        );
      },
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
      sortingFn: (rowA, rowB) => {
        const modelIdA = rowA.original.id;
        const modelIdB = rowB.original.id;

        const selectedVersionA =
          selectedVersions[modelIdA] || modelVersions[modelIdA]?.[0]?.version;
        const selectedVersionB =
          selectedVersions[modelIdB] || modelVersions[modelIdB]?.[0]?.version;

        const versionDataA = modelVersions[modelIdA]?.find(
          (v) => v.version === selectedVersionA
        );
        const versionDataB = modelVersions[modelIdB]?.find(
          (v) => v.version === selectedVersionB
        );

        const trainingTimeA = versionDataA?.trainingTime ?? 0;
        const trainingTimeB = versionDataB?.trainingTime ?? 0;

        return trainingTimeA - trainingTimeB;
      },
      cell: ({ row }) => {
        const modelId = row.original.id;
        const selectedVersion =
          selectedVersions[modelId] || modelVersions[modelId]?.[0]?.version;
        const versionData = modelVersions[modelId]?.find(
          (v) => v.version === selectedVersion
        );

        const minutes = versionData?.trainingTime;

        if (typeof minutes !== "number" || isNaN(minutes))
          return <div className="text-left">Invalid Time</div>;

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
      sortingFn: (rowA, rowB) => {
        const modelIdA = rowA.original.id;
        const modelIdB = rowB.original.id;

        const selectedVersionA =
          selectedVersions[modelIdA] || modelVersions[modelIdA]?.[0]?.version;
        const selectedVersionB =
          selectedVersions[modelIdB] || modelVersions[modelIdB]?.[0]?.version;

        const versionDataA = modelVersions[modelIdA]?.find(
          (v) => v.version === selectedVersionA
        );
        const versionDataB = modelVersions[modelIdB]?.find(
          (v) => v.version === selectedVersionB
        );

        const buildDateA = versionDataA?.buildDate ?? "19700101";
        const buildDateB = versionDataB?.buildDate ?? "19700101";

        const dateA = new Date(
          `${buildDateA.slice(0, 4)}-${buildDateA.slice(
            4,
            6
          )}-${buildDateA.slice(6, 8)}`
        );
        const dateB = new Date(
          `${buildDateB.slice(0, 4)}-${buildDateB.slice(
            4,
            6
          )}-${buildDateB.slice(6, 8)}`
        );

        return dateA.getTime() - dateB.getTime();
      },
      cell: ({ row }) => {
        const modelId = row.original.id;
        const selectedVersion =
          selectedVersions[modelId] || modelVersions[modelId]?.[0]?.version;
        const versionData = modelVersions[modelId]?.find(
          (v) => v.version === selectedVersion
        );

        const invalid = "Invalid Data";

        const rawDate = versionData?.buildDate;
        if (
          typeof rawDate !== "string" ||
          rawDate.length !== 8 ||
          isNaN(Number(rawDate))
        ) {
          return <div className="text-left">{invalid}</div>;
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
          return <div className="text-left">{invalid}</div>;
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
      sortingFn: (rowA, rowB) => {
        const modelIdA = rowA.original.id;
        const modelIdB = rowB.original.id;

        const selectedVersionA =
          selectedVersions[modelIdA] || modelVersions[modelIdA]?.[0]?.version;
        const selectedVersionB =
          selectedVersions[modelIdB] || modelVersions[modelIdB]?.[0]?.version;

        const versionDataA = modelVersions[modelIdA]?.find(
          (v) => v.version === selectedVersionA
        );
        const versionDataB = modelVersions[modelIdB]?.find(
          (v) => v.version === selectedVersionB
        );

        const statusA = versionDataA?.status ?? "Default";
        const statusB = versionDataB?.status ?? "Default";

        const statusOrder: Record<string, number> = {
          "Deployment Failed": 1,
          Deployed: 2,
          Training: 3,
          "Deployment Canceled": 4,
          "Pending Deployment": 5,
          Scheduled: 6,
          Inactive: 7,
          Default: 8, // ensure unknown statuses are last
        };

        return (statusOrder[statusA] || 99) - (statusOrder[statusB] || 99);
      },
      cell: ({ row }) => {
        const modelId = row.original.id;
        const selectedVersion =
          selectedVersions[modelId] || modelVersions[modelId]?.[0]?.version;
        const versionData = modelVersions[modelId]?.find(
          (v) => v.version === selectedVersion
        );
        const status = versionData?.status;
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
}

// export const versionColumns: ColumnDef<ModelVersion>[] = [
//   {
//     accessorKey: "version",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         className="pl-0"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Version
//         <ArrowUpDown />
//       </Button>
//     ),
//     enableHiding: false,
//   },
//   {
//     accessorKey: "modifiedDate",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         className="pl-0"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Modified Date
//         <ArrowUpDown />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const rawDate = row.getValue("modifiedDate");
//       if (
//         typeof rawDate !== "string" ||
//         rawDate.length !== 8 ||
//         isNaN(Number(rawDate))
//       ) {
//         return "Invalid Date";
//       }

//       const year = rawDate.slice(0, 4);
//       const month = rawDate.slice(4, 6);
//       const day = rawDate.slice(6, 8);
//       const formattedDate = `${year}-${month}-${day}`;

//       const dateObject = new Date(formattedDate);

//       if (
//         dateObject.getFullYear().toString() !== year ||
//         (dateObject.getMonth() + 1).toString().padStart(2, "0") !== month ||
//         dateObject.getDate().toString().padStart(2, "0") !== day
//       ) {
//         return "Invalid Date";
//       }

//       return <div className="text-left">{formattedDate}</div>;
//     },
//   },
//   {
//     accessorKey: "modifiedType",
//     header: () => <div className="text-left">Modified Type</div>,
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         className="pl-0"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Status
//         <ArrowUpDown />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const status = row.original.status || "Inactive";
//       return <Badge className={getVersionStatusColor(status)}>{status}</Badge>;
//     },
//   },
//   {
//     id: "actions",
//     header: () => <div className="text-left">Actions</div>,
//     cell: ({ row }) => {
//       const version = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="center">
//             <DropdownMenuItem
//               onClick={() =>
//                 navigator.clipboard.writeText(
//                   `${version.modelId}-${version.version}`
//                 )
//               }
//             >
//               <Clipboard className="mr-2 h-4 w-4" />
//               Copy Model-Version ID: {`${version.modelId}-${version.version}`}
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <History className="mr-2 h-4 w-4" />
//               Model Version History
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <Trash className="mr-2 h-4 w-4 text-red-500" />
//               Delete
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Pencil className="mr-2 h-4 w-4" />
//               Edit
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//     enableHiding: false,
//   },
// ];
