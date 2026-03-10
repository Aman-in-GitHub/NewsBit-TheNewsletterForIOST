import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center py-4">
          <input
            placeholder="Filter news"
            value={
              (table.getColumn("title")?.getFilterValue() as string)?.trim() ??
              ""
            }
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-dark shadow-sm outline-0 ring-1 ring-inset ring-white placeholder:text-neutral-500 dark:text-light dark:ring-white/10 dark:placeholder:text-neutral-400 sm:text-sm sm:leading-6"
          />
        </div>

        <Select
          onValueChange={(val: string) =>
            table.getColumn("title")?.setFilterValue(val)
          }
        >
          <SelectTrigger className="mb-6 h-[2.55rem] w-[250px] rounded-md border-0 bg-white/5 text-dark shadow-sm ring-1 ring-inset ring-white dark:text-light dark:ring-white/10 lg:mb-0 lg:w-[200px]">
            <SelectValue placeholder="Select a branch" />
          </SelectTrigger>
          <SelectContent className="font-text">
            <SelectGroup>
              <SelectLabel>Branch</SelectLabel>
              <SelectItem value=" ">All</SelectItem>
              <SelectItem value="BIT">BIT</SelectItem>
              <SelectItem value="B.Sc.CSIT">CSIT</SelectItem>
              <SelectItem value="MIT">MIT</SelectItem>
              <SelectItem value="M.Sc.CSIT">M.Sc.CSIT</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-md border dark:border-[#333]">
        <Table>
          <TableHeader className="select-none bg-[#f4f4f4] dark:bg-darkAccent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-subHeading">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="dark:bg-dark dark:text-white">
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
                        cell.getContext(),
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
      <div className="flex select-none items-center justify-between py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-dark dark:bg-darkAccent dark:text-light"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-dark dark:bg-darkAccent dark:text-light"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
