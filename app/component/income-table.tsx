"use client";
import {
  ArrowUpRight,
  DollarSign,
  Eye,
  Plus,
  Receipt,
  SquarePen,
  Trash,
} from "lucide-react";
import ExpenseCard from "./expense-card";
import { Table } from "@/components/ui/table";
import DataTable from "../component/table";
import { ColumnDef } from "@tanstack/react-table";
const columns: ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: "Description",
    header: "Description",
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    cell: ({ getValue }) => `$${getValue<number>()}`, // format as currency
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-white text-black rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer">
          <Eye className="w-4 h-4"></Eye>
        </button>
        <button className="px-3 py-2  bg-white text-black  rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer">
          <SquarePen className="w-4 h-4" />
        </button>
        <button className="px-2 py-1  bg-white text-black  rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer ">
          <Trash className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
const data = [
  // this will be fetched from an api or a graphql
  {
    Description: "Lunch with team",
    Category: "Food",
    Amount: 45,
    Date: "2025-09-10",
    Status: "Approved",
  },
  {
    Description: "Taxi fare",
    Category: "Transport",
    Amount: 20,
    Date: "2025-09-09",
    Status: "Pending",
  },
  {
    Description: "Taxi fare",
    Category: "Transport",
    Amount: 20,
    Date: "2025-09-09",
    Status: "Pending",
  },
];
export default function IncomeTable() {
  return <DataTable columns={columns} data={data} />;
}
