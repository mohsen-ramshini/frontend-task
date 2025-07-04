"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { id: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // نگه‌داری چندتا انتخاب‌شده (multi-select)
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());

  const safeToLower = (value: unknown): string =>
    typeof value === "string" ? value.toLowerCase() : "";

  const toggleRowSelected = (row: Row<TData>) => {
    const newSelected = new Set(selectedRowIds);
    if (newSelected.has(row.original.id)) {
      newSelected.delete(row.original.id);
    } else {
      newSelected.add(row.original.id);
    }
    setSelectedRowIds(newSelected);
  };

  const isRowSelected = (row: Row<TData>) => selectedRowIds.has(row.original.id);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = (filterValue ?? "").toString().toLowerCase();
      const firstName = safeToLower(row.getValue("first_name"));
      const lastName = safeToLower(row.getValue("last_name"));
      const email = safeToLower(row.getValue("email"));
      return firstName.includes(search) || lastName.includes(search) || email.includes(search);
    },
  });

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Global search */}
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search by first name, last name, or email..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Table container */}
        <div className="rounded-xl border border-muted shadow-sm overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground text-sm font-semibold select-none cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : null}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const selected = isRowSelected(row);
                  return (
                    <TableRow
                      key={row.id}
                      className={`cursor-pointer transition-colors ${
                        selected ? "bg-blue-100" : "hover:bg-muted/20"
                      }`}
                      onClick={() => toggleRowSelected(row)}
                    >
                      {row.getVisibleCells().map((cell) => {
                        // ستون انتخاب (checkbox)
                        if (cell.column.id === "select") {
                          return (
                            <TableCell key={cell.id} className="py-3 px-4 text-sm">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => toggleRowSelected(row)}
                                onClick={(e) => e.stopPropagation()}
                                className="cursor-pointer"
                                aria-label={`Select row ${row.original.id}`}
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={cell.id}
                            className="py-3 px-4 text-sm text-foreground/90 whitespace-nowrap"
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-4xl">🔍</span>
                      <p>No results found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2">
          <div className="text-xs text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>

            <select
              className="border rounded px-2 py-1 text-xs"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
