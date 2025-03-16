"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // 實作分頁功能
  getPaginationRowModel,
  // 實作排序功能
  SortingState,
  getSortedRowModel,
  // 實作篩選功能
  ColumnFiltersState,
  getFilteredRowModel,
  // 實作隱藏欄位功能
  VisibilityState,
} from "@tanstack/react-table";

// 導入 UI 組件
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 定義表格類型
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// 通用表格組件（封裝 tanstack-table）
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // 排序狀態管理
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // 篩選狀態管理
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // 隱藏欄位狀態管理
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // 列選取的狀態管理
  const [rowSelection, setRowSelection] = React.useState({});
  // 分頁設置狀態管理
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    // 載入核心功能模組
    getCoreRowModel: getCoreRowModel(),
    // 載入分頁功能模組
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    // 載入排序功能模組
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // 載入篩選功能模組
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // 載入欄位隱藏模組
    onColumnVisibilityChange: setColumnVisibility,
    // 載入列選取模組
    onRowSelectionChange: setRowSelection,
    // 載入表格狀態模組
    state: {
      // 排序狀態
      sorting,
      // 篩選狀態
      columnFilters,
      // 欄位隱藏狀態
      columnVisibility,
      // 選取列的狀態
      rowSelection,
      // 分頁狀態
      pagination,
    },
  });

  return (
    <>
      {/* 操作區域 */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Model Name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="justify-self-start w-64 px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Visibility Columns
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
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.slice(5)}
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
                  colSpan={columns.length}
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
        {/* 選取列顯示區 */}
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {/* 切換分頁區 */}
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
    </>
  );
}
