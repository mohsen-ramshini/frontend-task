"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
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
import { Card } from "@/components/ui/card";

import {
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useUsers } from "../../api/use-get-users";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface DataTableProps<TValue> {
  columns: ColumnDef<User, TValue>[];
}

export function DataTable<TValue>({ columns }: DataTableProps<TValue>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading, isError } = useUsers(pageIndex + 1);
  const usersData = data?.data ?? [];

  const safeToLower = (value: unknown): string =>
    typeof value === "string" ? value.toLowerCase() : "";

  const table = useReactTable({
    data: usersData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: { pageIndex, pageSize: 6 },
    },
    manualPagination: true,
    pageCount: data?.total_pages ?? 1,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize: 6 });
        setPageIndex(newState.pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: (row, columnId, filterValue) => {
      const search = (filterValue ?? "").toString().toLowerCase();
      const firstName = safeToLower(row.getValue("first_name"));
      const lastName = safeToLower(row.getValue("last_name"));
      const email = safeToLower(row.getValue("email"));
      return (
        firstName.includes(search) ||
        lastName.includes(search) ||
        email.includes(search)
      );
    },
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search by first name, last name, or email..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* ✅ Mobile View */}
        <div className="sm:hidden space-y-4">
          {isLoading ? (
            <p className="text-center py-6">Loading...</p>
          ) : isError ? (
            <p className="text-center py-6 text-red-500">Error loading data.</p>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Card key={row.id} className="p-4 space-y-2">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="text-sm">
                    <span className="font-semibold block">
                      {cell.column.columnDef.header as string}
                    </span>
                    <span className="text-muted-foreground">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                ))}
              </Card>
            ))
          ) : (
            <p className="text-center py-6 text-muted-foreground">No results found.</p>
          )}
        </div>

        {/* ✅ Desktop View */}
        <div className="rounded-xl border border-muted shadow-sm overflow-x-auto hidden sm:block">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground text-sm font-semibold select-none cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-10 text-red-500">
                    Error loading data.
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer transition-colors hover:bg-muted/20"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-3 px-4 text-sm text-foreground/90 whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
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
            Page {pageIndex + 1} of {data?.total_pages ?? 1}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
              disabled={pageIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPageIndex((old) =>
                  old < (data?.total_pages ?? 1) - 1 ? old + 1 : old
                )
              }
              disabled={pageIndex >= (data?.total_pages ?? 1) - 1}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex((data?.total_pages ?? 1) - 1)}
              disabled={pageIndex >= (data?.total_pages ?? 1) - 1}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
