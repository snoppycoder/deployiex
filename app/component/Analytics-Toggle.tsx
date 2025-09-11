"use client";
import { useState } from "react";
import PendingApprovalCard from "./Pending-Approval-Card";
import IncomeTable from "./income-table";
export default function AnalyticsTabSwitcher() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full p-4">
      <div className="w-96 flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          className={`w-24 flex-1  p-2 text-sm font-medium transition-all ${
            activeTab === "overview"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`w-24 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "trends"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("trends")}
        >
          Trends
        </button>
        <button
          className={`w-24 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "departments"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("departments")}
        >
          Departments
        </button>
        <button
          className={`w-24 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "compliance"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("compliance")}
        >
          Compliance
        </button>
      </div>

      <div className="mt-4 p-4 border border-gray-300 rounded-lg">
        {activeTab === "overview" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Overview</h1>
          </div>
        )}
        {activeTab === "trends" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Trends</h1>
          </div>
        )}
        {activeTab === "departments" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Departments</h1>
          </div>
        )}
        {activeTab === "compliance" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Compliance</h1>
          </div>
        )}
      </div>
    </div>
  );
}
