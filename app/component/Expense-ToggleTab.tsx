"use client";

import { useEffect, useState } from "react";
import DataTable from "./table";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash } from "lucide-react";
import ExpenseCard from "./expense-card";
import {
  useExpenseByUser,
  useExpenseInfoByUser,
} from "../(dashboard)/expenses/components/queries";

import { getExpenseColumns } from "../(dashboard)/expenses/components/column";
import { useRouter } from "next/navigation";
import { useWhoAmI } from "@/hooks/useWhoAmI";
import { expenseControllerRemove } from "../api/gen";

export default function ExpenseTabSwitcher() {
  const { data: user, isLoading, isError } = useWhoAmI();
  const router = useRouter();
  const userId = user?.id;

  const { data: expenses, ...others } = useExpenseByUser(userId);
  if (expenses) {
    console.log(expenses, "expenses here");
  }

  const { data: expenseInfo, ...rest } = useExpenseInfoByUser(userId);

  const [activeTab, setActiveTab] = useState("live-view");

  function onEdit(id: string): void {
    throw new Error("Function not implemented.");
  }

  async function onDelete(id: string): Promise<void> {
    await expenseControllerRemove({ path: { id } });
    others.refetch();
  }

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
            {expenses ? (
              <DataTable
                columns={getExpenseColumns({
                  onEdit: onEdit,
                  // pass boolean as expected
                  onDelete: onDelete,
                })}
                data={expenses}
              />
            ) : (
              <div>Loading...</div> //just a workaround
            )}
          </div>
        )}
        {activeTab === "summary" && (
          <div className="w-full flex justify-between">
            <ExpenseCard
              title={"Total Submitted"}
              amount={`${expenseInfo?.totalNumberOfExpenses}`}
              detail={`${expenseInfo?.totalNumberOfExpenses} expenses`}
              type={"Total"}
            />
            <ExpenseCard
              title={"Approved Amount"}
              amount={`${expenseInfo?.approvedAmount}`}
              detail={`${expenseInfo?.totalNumberOfApprovedExpenses} expenses`}
              type={"Approved"}
            />
            <ExpenseCard
              title={"Pending Amount"}
              amount={`${expenseInfo?.pendingAmount}`}
              detail={`${expenseInfo?.totalNumberOfPendingExpenses} expenses`}
              type={"Pending"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
