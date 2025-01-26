"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DotsHorizontalIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { STATUSES } from "~/constants";
import { DATA } from "~/data";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => (
      <div className="flex items-center">
        <div className="h-11 w-11 flex-shrink-0">
          <Image
            alt="test"
            src={
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            height={44}
            width={44}
            className="h-11 w-11 rounded-full"
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{props.getValue()}</div>
          <div className="mt-1 text-gray-500">lindsay.walton@example.com</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (props) => <p className="font-medium text-gray-900">{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => (
      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        {props.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];
const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold leading-6 text-gray-900">User Groups</h1>
          <p className="mt-2 text-sm text-gray-700">
            You can manage all permissions and settings here of all internal users for your practice.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button variant="primary">Add user</Button>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-5">
        <DataTableSearch columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        <DataTableFilter columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      </div>
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          {header.column.columnDef.header}
                        </th>
                      ))}
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  );
                })}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id} className="whitespace-nowrap py-5 text-sm text-gray-500">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                      <td className="text-gray-500">
                        <Link href="user/id">View profile</Link>
                      </td>
                      <td className="relative whitespace-nowrap py-5 pr-8 text-right text-sm font-medium  space-x-2">
                        <DropDownMenuTest />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;

export function DropDownMenuTest() {
  return (
    <Sheet>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          <DropdownMenuItem>
            <SheetTrigger asChild>
              <Button variant="ghost" className="font-normal p-1">
                Update Roles
              </Button>
            </SheetTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" className="font-normal p-1">
              Update status
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Roles</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p>Hello World</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const DataTableSearch = ({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: Array<{ id: string; value: string }>;
  setColumnFilters: Dispatch<SetStateAction<Array<{ id: string; value: string }>>>;
}) => {
  const staffName = columnFilters.find((f) => f.id === "name")?.value ?? "";
  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div>
      <Input
        placeholder="Search name..."
        className="h-8 w-40 lg:w-64"
        value={staffName}
        onChange={(e) => onFilterChange("name", e.target.value)}
      />
    </div>
  );
};

export const DataTableFilter = ({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: Array<{ id: string; value: string }>;
  setColumnFilters: Dispatch<SetStateAction<Array<{ id: string; value: string }>>>;
}) => {
  const filterStatuses = columnFilters.find((f) => f.id === "status")?.value || [];
  return (
    <Popover>
      <PopoverTrigger>
        <Button aria-label="Toggle columns" variant="outline-shad-cn" size="sm" className="ml-auto hidden h-8 lg:flex">
          <MixerHorizontalIcon className="mr-2 size-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {/* <p>Filter By:</p> */}
          <div className="space-y-2">
            <p className="font-bold">Status</p>
            <div className="space-y-2">
              {STATUSES.map((status) => (
                <div className="flex items-center space-x-2" key={status.id}>
                  <Checkbox
                    id="terms2"
                    onClick={() =>
                      setColumnFilters((prev) => {
                        const statuses = prev.find((filter) => filter.id === "status")?.value;
                        if (!statuses) {
                          return prev.concat({
                            id: "status",
                            value: [status.name],
                          });
                        }

                        return prev.map((f) =>
                          f.id === "status"
                            ? {
                                ...f,
                                value: filterStatuses.includes(status.name)
                                  ? statuses.filter((s) => s !== status.name)
                                  : statuses.concat(status.name),
                              }
                            : f
                        );
                      })
                    }
                  />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
