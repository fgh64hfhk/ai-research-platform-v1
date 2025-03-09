"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { ModelVersion } from "./columns";

interface DataTableProps<TData, TValue> {
  columnsAction: (
    modelVersions: Record<string, ModelVersion[]>,
    selectedVersions: Record<string, string>,
    onSelectedVersionChange: (modelId: string, version: string) => void,
    onModelClick: (modelId: string) => void,
    onModelEditAction: (model: string, newData: Partial<TData>) => void,
    onModelDeleteAction: (model: string) => void
  ) => ColumnDef<TData, TValue>[];
  model: TData[];
  modelVersions: Record<string, ModelVersion[]>; // ✅ 傳入模型版本
  filterColumnKey: keyof TData; // 允許傳入要篩選的欄位名稱
  filterPlaceholder?: string; // 可選的 Placeholder 設定
  description?: string;
  onModelClickAction: (model: string) => void;
}

const modelReducer = (
  state: TData[],
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "DELETE_MODEL":
      return state.filter((model) => model.id !== action.payload);
    case "EDIT_MODEL":
      return state.map((model) =>
        model.id === action.payload.id
          ? {
              ...model,
              ...action.payload.data,
            }
          : model
      );
    default:
      return state;
  }
};

export function DataTable<TData, TValue>({
  columnsAction,
  model,
  modelVersions,
  filterColumnKey,
  filterPlaceholder = "Filter data",
  description,
  onModelClickAction,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // 整合 selectedVersions 進入 useReactTable 的 state
  const [selectedVersions, setSelectedVersions] = React.useState<
    Record<string, string>
  >({});

  // 提供一個函式來更新選擇的版本
  const onSelectedVersionChange = (modelId: string, version: string) => {
    setSelectedVersions((prev) => ({ ...prev, [modelId]: version }));
  };

  const [modelState, dispatch] = React.useReducer(modelReducer, model);

  const handleDelete = async (modelId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (!confirmed) return;

    try {
      dispatch({
        type: "DELETE_MODEL",
        payload: modelId,
      });

      alert(`Model deleted successfully! - ${modelId}`);
    } catch (error) {
      console.error("Failed to delete model", error);
      alert("Failed to delete the model.");
    }
  };

  const handleEdit = async (modelId: string, newData: Partial<TData>) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (!confirmed) return;

    try {
      dispatch({
        type: "EDIT_MODEL",
        payload: {
          id: modelId,
          data: newData,
        },
      });
      alert(`Model updated successfully! - ${modelId}`);
    } catch (error) {
      console.error("Failed to delete model", error);
      alert("Failed to delete the model.");
    }
  };

  const table = useReactTable({
    data: modelState,
    columns: columnsAction(
      modelVersions,
      selectedVersions,
      onSelectedVersionChange,
      onModelClickAction,
      handleEdit,
      handleDelete
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const firstModel = model[0] as { modelId: string };

  return (
    <div>
      <div className="grid grid-cols-2 py-4 gap-4">
        {description && (
          <h2 className="col-span-2 mb-3 pl-2 text-2xl font-bold text-gray-800 dark:text-white">
            {description} - {firstModel?.modelId}
          </h2>
        )}

        <Input
          placeholder={filterPlaceholder}
          value={
            (table
              .getColumn(filterColumnKey.toString())
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(filterColumnKey.toString())
              ?.setFilterValue(event.target.value)
          }
          className="justify-self-start w-64 px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mr-5">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {
                      column.id
                        .replace(/([A-Z])/g, " $1") // "model Version History"
                        .replace(/^./, (str) => str.toUpperCase()) // "Model Version History"
                    }
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Badge variant="secondary">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
