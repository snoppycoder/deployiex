"use client";

import { useState } from "react";
import DataTable from "./table";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash } from "lucide-react";
import ExpenseCard from "./expense-card";
export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState("live-view");

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

  return (
    <div className="w-full p-4">
      <div className="w-48 flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          className={`flex-1 py-2 text-sm font-medium transition-all ${
            activeTab === "live-view"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("live-view")}
        >
          Live View
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium transition-all ${
            activeTab === "summary"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </button>
      </div>

      <div className="mt-4 p-4 border border-gray-300 rounded-lg">
        {activeTab === "live-view" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Expense List</h1>
            <span className="text-gray-600 font-medium">
              All your submitted expenses and their current status
            </span>
            <DataTable columns={columns} data={data} />
          </div>
        )}
        {activeTab === "summary" && (
          <div className="w-full flex justify-between">
            <ExpenseCard
              title={"Total Submitted"}
              amount={550.49}
              detail={"4 expenses"}
              type={"Total"}
            />
            <ExpenseCard
              title={"Approved Amount"}
              amount={205.5}
              detail={"2 expenses"}
              type={"Approved"}
            />
            <ExpenseCard
              title={"Total Submitted"}
              amount={45}
              detail={"1 expense"}
              type={"Pending"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
