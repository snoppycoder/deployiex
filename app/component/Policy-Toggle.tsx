"use client";
import { useState } from "react";
import PolicyCard from "./Policy-Card";

export default function PolicyTabSwitcher() {
  const [activeTab, setActiveTab] = useState("policies");

  return (
    <div className="w-full p-4">
      <div className="w-96 flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          className={`w-24 flex-1  p-2 text-sm font-medium transition-all ${
            activeTab === "policies"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("policies")}
        >
          Policies
        </button>
        <button
          className={`w-24 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "violations"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("violations")}
        >
          Violations
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
        {activeTab === "policies" && (
          <div className="w-full px-2  border border-gray-300 rounded-lg">
            <div className="mb-2.5 font-medium">
              <span className="font-semibold text-lg">
                Expense Policies <br />
              </span>
              <span className="text-gray-400">
                Manage and configure your organization's expense policies
              </span>
            </div>
            <div className="flex flex-col gap-y-4">
              <PolicyCard
                title={"Travel Expenses"}
                detail={
                  "Policies for business travel including flights, hotels, and transportation"
                }
                limit={[
                  "Maximum hotel rate: $200/night",
                  "Maximum hotel rate: $200/night",
                ]}
                requirement={[
                  "Flight bookings require manager approval for amounts over $500",
                ]}
                numberOfViolations={"2"}
                numberOfCompliance={"94%"}
                createdAt={"2025-01-01"}
              />
            </div>
          </div>
        )}
        {activeTab === "violations" && (
          <div className="w-full">
            <h1>Violations</h1>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="w-full">
            <h1>Compliance</h1>
          </div>
        )}
      </div>
    </div>
  );
}
