"use client";

import { useState } from "react";
import PendingApprovalCard from "./Pending-Approval-Card";
import IncomeTable from "./income-table";
export default function ApprovalTabSwitcher() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="w-full p-4">
      <div className="w-72 flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          className={`w-36 flex-1  p-2 text-sm font-medium transition-all ${
            activeTab === "pending"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Approval
        </button>
        <button
          className={`w-36 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "approval"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("approval")}
        >
          Approval History
        </button>
      </div>

      <div className="mt-4 p-4 border border-gray-300 rounded-lg">
        {activeTab === "pending" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Pending Approvals</h1>
            <span className="text-gray-600 font-light">
              Expenses waiting for your approval
            </span>
            <div className="flex-col gap-y-4">
              <PendingApprovalCard
                title={"Business Lunch - Client Meeting"}
                date={"2025-01-08"}
                detail={"Important client meeting to discuss Q1 strategy"}
                catagory={"Meals"}
                amount={100}
                fullName={"John Doe"}
                status={"Normal"}
              />
              <PendingApprovalCard
                title={"Business Lunch - Client Meeting"}
                date={"2025-01-08"}
                detail={"Important client meeting to discuss Q1 strategy"}
                catagory={"Meals"}
                amount={100}
                fullName={"John Doe"}
                status={"Normal"}
              />
              <PendingApprovalCard
                title={"Business Lunch - Client Meeting"}
                date={"2025-01-08"}
                detail={"Important client meeting to discuss Q1 strategy"}
                catagory={"Meals"}
                amount={100}
                fullName={"John Doe"}
                status={"Normal"}
              />
              <PendingApprovalCard
                title={"Business Lunch - Client Meeting"}
                date={"2025-01-08"}
                detail={"Important client meeting to discuss Q1 strategy"}
                catagory={"Meals"}
                amount={100}
                fullName={"John Doe"}
                status={"High"}
              />
            </div>
          </div>
        )}
        {activeTab === "approval" && (
          <div className="w-full">
            <IncomeTable></IncomeTable>
          </div>
        )}
      </div>
    </div>
  );
}
