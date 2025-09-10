"use client";
import { useState } from "react";
export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState("live-view");

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
          </div>
        )}
        {activeTab === "summary" && (
          <div className="w-full">Here are your Summary...</div>
        )}
      </div>
    </div>
  );
}
