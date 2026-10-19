"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { SearchBox } from "./SearchBox"
import { EmptyState } from "./EmptyState"
import { Pagination } from "./Pagination"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  isLoading?: boolean
  onSearch?: (query: string) => void
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onSort?: (key: string, direction: "asc" | "desc") => void
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable,
  searchPlaceholder = "Cari...",
  emptyMessage = "Tidak ada data",
  isLoading,
  onSearch,
  page,
  totalPages,
  onPageChange,
  onSort,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("space-y-4", className)}>
      {searchable && onSearch && (
        <div className="flex items-center justify-between">
          <div className="w-full max-w-sm">
            <SearchBox
              placeholder={searchPlaceholder}
              value=""
              onChange={(v) => onSearch(v)}
            />
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "h-10 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground",
                    col.sortable && "cursor-pointer select-none"
                  )}
                  onClick={() => {
                    if (col.sortable && onSort) onSort(col.key, "asc")
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <ArrowUpDown className="size-3" />}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className="px-4 py-3">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="px-4 py-12">
                  <EmptyState
                    icon="FileSearch"
                    title={emptyMessage}
                  />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={(row as Record<string, unknown>).id as string ?? rowIndex}>
                  {columns.map((col) => {
                    const value = (row as Record<string, unknown>)[col.key]
                    return (
                      <TableCell key={col.key} className="px-4 py-3 text-sm">
                        {col.render
                          ? col.render(value, row)
                          : String(value ?? "-")}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {page !== undefined && totalPages !== undefined && onPageChange && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
