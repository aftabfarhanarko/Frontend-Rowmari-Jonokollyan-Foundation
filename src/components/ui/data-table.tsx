"use client"

import * as React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Inbox,
} from "lucide-react"

export type SortDirection = "asc" | "desc"

export interface TableColumn<T> {
  id?: string
  header: React.ReactNode | ((context: { column: TableColumn<T> }) => React.ReactNode)
  accessorKey?: keyof T | string
  cell?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  align?: "left" | "center" | "right"
  className?: string
  headerClassName?: string
  width?: string | number
}

export interface DataTableProps<T> {
  /** Array of column definitions */
  columns: TableColumn<T>[]
  /** Array of row data items */
  data: T[]
  /** Unique key extractor for row keys (defaults to row.id or index) */
  keyExtractor?: (row: T, index: number) => string | number

  /** Optional title shown above the table */
  title?: React.ReactNode
  /** Optional subtitle or description */
  description?: React.ReactNode
  /** Additional actions to show in the top toolbar (e.g. Add Button, Export) */
  actions?: React.ReactNode

  /** Enable search input */
  searchable?: boolean
  /** Keys in row object to search against (defaults to all string/number values) */
  searchKey?: keyof T | (keyof T)[]
  /** Custom placeholder for search input */
  searchPlaceholder?: string
  /** Controlled search query */
  searchValue?: string
  /** Callback when search input changes */
  onSearchChange?: (query: string) => void

  /** Enable pagination */
  pagination?: boolean
  /** Items per page (default: 10) */
  pageSize?: number
  /** Available page size options */
  pageSizeOptions?: number[]
  /** Controlled current page (1-indexed) */
  currentPage?: number
  /** Callback when page changes */
  onPageChange?: (page: number) => void
  /** Total count for server-side pagination */
  totalCount?: number

  /** Default sort state */
  defaultSort?: { key: keyof T | string; direction: SortDirection }
  /** Callback when sort column changes */
  onSortChange?: (sort: { key: string; direction: SortDirection } | null) => void

  /** Loading state indicator */
  isLoading?: boolean
  /** Number of skeleton rows while loading (default: 5) */
  loadingRows?: number

  /** Custom message or node when data is empty */
  emptyMessage?: React.ReactNode
  /** Custom empty state icon */
  emptyIcon?: React.ReactNode

  /** Callback when a row is clicked */
  onRowClick?: (row: T, index: number) => void
  /** Custom class for each row (can be a function) */
  rowClassName?: string | ((row: T, index: number) => string)

  /** Table visual variants */
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  compact?: boolean

  /** Optional caption at bottom of table */
  caption?: string
  /** Custom footer node */
  footer?: React.ReactNode
  /** Whether to show results count in pagination bar */
  showCount?: boolean

  /** Custom wrapper classes */
  className?: string
  containerClassName?: string
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data = [],
  keyExtractor,
  title,
  description,
  actions,
  searchable = false,
  searchKey,
  searchPlaceholder = "অনুসন্ধান করুন...",
  searchValue: controlledSearchValue,
  onSearchChange,
  pagination = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  currentPage: controlledCurrentPage,
  onPageChange,
  totalCount,
  defaultSort,
  onSortChange,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = "কোনো তথ্য পাওয়া যায়নি",
  emptyIcon,
  onRowClick,
  rowClassName,
  striped = false,
  bordered = true,
  hoverable = true,
  compact = false,
  caption,
  footer,
  showCount = true,
  className,
  containerClassName,
}: DataTableProps<T>) {
  // Search state
  const [internalSearch, setInternalSearch] = React.useState("")
  const isSearchControlled = controlledSearchValue !== undefined
  const currentSearch = isSearchControlled ? controlledSearchValue : internalSearch

  // Sort state
  const [sortState, setSortState] = React.useState<{
    key: string
    direction: SortDirection
  } | null>(
    defaultSort ? { key: String(defaultSort.key), direction: defaultSort.direction } : null
  )

  // Pagination state
  const [internalPage, setInternalPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(initialPageSize)
  const isPageControlled = controlledCurrentPage !== undefined
  const currentPage = isPageControlled ? controlledCurrentPage : internalPage

  const handleSearchChange = (val: string) => {
    if (!isSearchControlled) {
      setInternalSearch(val)
    }
    onSearchChange?.(val)
    // Reset to page 1 on search
    if (!isPageControlled) {
      setInternalPage(1)
    }
  }

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return
    const key = String(column.accessorKey || column.id)
    if (!key) return

    let nextSort: { key: string; direction: SortDirection } | null = null

    if (!sortState || sortState.key !== key) {
      nextSort = { key, direction: "asc" }
    } else if (sortState.direction === "asc") {
      nextSort = { key, direction: "desc" }
    } else {
      nextSort = null
    }

    setSortState(nextSort)
    onSortChange?.(nextSort)
  }

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!currentSearch.trim()) return data

    const query = currentSearch.toLowerCase().trim()

    return data.filter((item) => {
      if (searchKey) {
        const keys = Array.isArray(searchKey) ? searchKey : [searchKey]
        return keys.some((k) => {
          const val = item[k]
          return val !== undefined && val !== null && String(val).toLowerCase().includes(query)
        })
      }

      // Default: Search across all values in the row
      return Object.values(item).some((val) => {
        if (val === undefined || val === null) return false
        if (typeof val === "object") return false
        return String(val).toLowerCase().includes(query)
      })
    })
  }, [data, currentSearch, searchKey])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortState) return filteredData

    const { key, direction } = sortState
    const targetColumn = columns.find((c) => String(c.accessorKey || c.id) === key)

    return [...filteredData].sort((a, b) => {
      let aVal = targetColumn?.accessorKey ? a[targetColumn.accessorKey as keyof T] : a[key]
      let bVal = targetColumn?.accessorKey ? b[targetColumn.accessorKey as keyof T] : b[key]

      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1

      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal
      }

      const aStr = String(aVal).toLowerCase()
      const bStr = String(bVal).toLowerCase()

      if (aStr < bStr) return direction === "asc" ? -1 : 1
      if (aStr > bStr) return direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortState, columns])

  // Paginate data
  const totalItems = totalCount !== undefined ? totalCount : sortedData.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const paginatedData = React.useMemo(() => {
    if (!pagination || totalCount !== undefined) {
      // If server-side paginated or pagination disabled, use full sortedData
      return sortedData
    }
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, pagination, totalCount, currentPage, pageSize])

  const setPage = (pageNumber: number) => {
    const validPage = Math.min(Math.max(1, pageNumber), totalPages)
    if (!isPageControlled) {
      setInternalPage(validPage)
    }
    onPageChange?.(validPage)
  }

  const getRowKey = (row: T, index: number) => {
    if (keyExtractor) return keyExtractor(row, index)
    if ("id" in row && (typeof row.id === "string" || typeof row.id === "number")) {
      return row.id
    }
    if ("_id" in row && (typeof row._id === "string" || typeof row._id === "number")) {
      return row._id
    }
    return index
  }

  // Calculate results range display
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const isSearchActive = searchable || !!searchKey

  return (
    <div className={cn("w-full space-y-3", containerClassName)}>
      {/* Table Header / Toolbar (Title, Search, Action Buttons) */}
      {(title || description || isSearchActive || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <div className="text-base font-semibold text-foreground tracking-tight">
                {title}
              </div>
            )}
            {description && (
              <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isSearchActive && (
              <div className="relative min-w-[200px] max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  value={currentSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="pl-8 pr-8 h-9 text-xs sm:text-sm bg-background"
                />
                {currentSearch && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            )}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div
        className={cn(
          "rounded-lg overflow-hidden bg-background",
          bordered && "border border-border shadow-xs",
          className
        )}
      >
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}

          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent border-b border-border">
              {columns.map((column, idx) => {
                const colKey = String(column.accessorKey || column.id || idx)
                const isSorted = sortState?.key === colKey
                const sortDir = isSorted ? sortState.direction : null

                return (
                  <TableHead
                    key={colKey}
                    style={column.width ? { width: column.width } : undefined}
                    className={cn(
                      "font-semibold text-foreground text-xs uppercase tracking-wider",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.sortable &&
                        "cursor-pointer select-none transition-colors hover:text-foreground/80 hover:bg-muted/70",
                      compact ? "h-8 px-2.5" : "h-10 px-3",
                      column.headerClassName
                    )}
                    onClick={() => column.sortable && handleSort(column)}
                  >
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        column.align === "center" && "justify-center w-full",
                        column.align === "right" && "justify-end w-full"
                      )}
                    >
                      <span>
                        {typeof column.header === "function"
                          ? column.header({ column })
                          : column.header}
                      </span>
                      {column.sortable && (
                        <span className="shrink-0 text-muted-foreground">
                          {sortDir === "asc" ? (
                            <ArrowUp className="size-3.5 text-primary" />
                          ) : sortDir === "desc" ? (
                            <ArrowDown className="size-3.5 text-primary" />
                          ) : (
                            <ArrowUpDown className="size-3.5 opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading State Skeleton */}
            {isLoading ? (
              Array.from({ length: loadingRows }).map((_, rIdx) => (
                <TableRow key={`skeleton-row-${rIdx}`} className="border-b border-border/50">
                  {columns.map((col, cIdx) => (
                    <TableCell
                      key={`skeleton-cell-${rIdx}-${cIdx}`}
                      className={cn(compact ? "p-2" : "p-3")}
                    >
                      <Skeleton className="h-4 w-full max-w-[85%] rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              /* Empty State */
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-44 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    {emptyIcon || (
                      <div className="p-3 rounded-full bg-muted/60 text-muted-foreground/70">
                        <Inbox className="size-6" />
                      </div>
                    )}
                    <span className="text-sm font-medium">{emptyMessage}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              /* Rows */
              paginatedData.map((row, rIdx) => {
                const key = getRowKey(row, rIdx)
                const isEven = rIdx % 2 === 0
                const resolvedRowClass =
                  typeof rowClassName === "function" ? rowClassName(row, rIdx) : rowClassName

                return (
                  <TableRow
                    key={key}
                    onClick={() => onRowClick?.(row, rIdx)}
                    className={cn(
                      "transition-colors border-b border-border/60",
                      striped && !isEven && "bg-muted/20",
                      hoverable && "hover:bg-muted/40",
                      onRowClick && "cursor-pointer active:bg-muted/60",
                      resolvedRowClass
                    )}
                  >
                    {columns.map((column, cIdx) => {
                      const colKey = String(column.accessorKey || column.id || cIdx)
                      let cellContent: React.ReactNode = null

                      if (column.cell) {
                        cellContent = column.cell(row, rIdx)
                      } else if (column.accessorKey) {
                        const val = row[column.accessorKey as keyof T]
                        cellContent = val !== undefined && val !== null ? String(val) : "—"
                      }

                      return (
                        <TableCell
                          key={colKey}
                          className={cn(
                            "text-sm",
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right",
                            compact ? "py-2 px-2.5" : "py-3 px-3",
                            column.className
                          )}
                        >
                          {cellContent}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>

          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>{footer}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Pagination Controls */}
      {pagination && !isLoading && totalItems > 0 && (
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between px-1 text-xs text-muted-foreground">
          {showCount && (
            <div>
              দেখাচ্ছে <span className="font-medium text-foreground">{startItem}</span> থেকে{" "}
              <span className="font-medium text-foreground">{endItem}</span> (মোট{" "}
              <span className="font-medium text-foreground">{totalItems}</span> টি)
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {/* Page Size Selector */}
            {pageSizeOptions.length > 1 && (
              <div className="flex items-center gap-1.5">
                <span>প্রতি পৃষ্ঠায়:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    const newSize = Number(e.target.value)
                    setPageSize(newSize)
                    setPage(1)
                  }}
                  className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {pageSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Page Nav Buttons */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                  title="First Page"
                >
                  <ChevronsLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                  title="Previous Page"
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <div className="px-2 font-medium text-foreground text-xs">
                  {currentPage} / {totalPages}
                </div>

                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="h-8 w-8 p-0"
                  title="Next Page"
                >
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setPage(totalPages)}
                  disabled={currentPage >= totalPages}
                  className="h-8 w-8 p-0"
                  title="Last Page"
                >
                  <ChevronsRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default DataTable
