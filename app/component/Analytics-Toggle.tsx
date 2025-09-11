"use client";
import { useState } from "react";
import PendingApprovalCard from "./Pending-Approval-Card";
import IncomeTable from "./income-table";
import PieChartComponent from "./pie-chart";
import BarChartComponent from "./bar-chart";
import { Progress } from "@/components/ui/progress";
import EmployeeCard from "./EmployeeCard";
export default function AnalyticsTabSwitcher() {
  const [activeTab, setActiveTab] = useState("overview");
  const employees = [
    // this is just a mock data we will use axios later on just wanted to test on the ui
    {
      fullName: "Alice Johnson",
      amount: 12500,
      department: "Finance",
      numberOfExpenses: 14,
    },
    {
      fullName: "Benjamin Carter",
      amount: 9800,
      department: "Marketing",
      numberOfExpenses: 10,
    },
    {
      fullName: "Clara Kim",
      amount: 8700,
      department: "Engineering",
      numberOfExpenses: 8,
    },
    {
      fullName: "Daniel Smith",
      amount: 7500,
      department: "Human Resources",
      numberOfExpenses: 6,
    },
    {
      fullName: "Emily Nguyen",
      amount: 6200,
      department: "Sales",
      numberOfExpenses: 12,
    },
  ];

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
            <div className=" w-full flex flex-col xl:grid xl:grid-cols-2 gap-x-4">
              <div className="w-full px-2  border border-gray-300 rounded-lg">
                <div className="m-3 font-medium">
                  <span className="font-semibold text-lg">
                    Monthly Expense Trend <br />
                  </span>
                  <span className="text-gray-400">
                    Your expense patterns over the last 6 months
                  </span>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[430px] h-[300px]">
                    <BarChartComponent />
                  </div>
                </div>
              </div>
              <div className="w-full px-2  border border-gray-300 rounded-lg">
                <div className="m-3 font-medium">
                  <span className="font-semibold text-lg">
                    Expense Categories <br />
                  </span>
                  <span className="font-sm text-gray-400">
                    Breakdown of expenses by category this month
                  </span>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[280px]">
                    <PieChartComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-2.5 p-2 border border-gray-300 rounded-lg">
              <div className="m-3 font-medium">
                <span className="font-semibold text-lg">
                  Top Spenders <br />
                </span>
                <span className="text-gray-400">
                  Employees with highest expense submissions this month
                </span>
              </div>
              {employees.map((val, index) => {
                return (
                  <ul>
                    <li key={index}>
                      <EmployeeCard
                        fullName={val.fullName}
                        rank={index}
                        amount={val.amount}
                        department={val.department}
                        numberOfExpenses={val.numberOfExpenses}
                      />
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === "trends" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Trends</h1>
            <div className="w-full flex justify-center items-center">
              <div className="w-full ">
                <BarChartComponent />
              </div>
            </div>
          </div>
        )}
        {activeTab === "departments" && (
          <div className="w-full">
            <h1 className="font-semibold text-lg">Departments</h1>
            <div className="flex flex-col w-full p-4 mt-2.5 gap-y-4">
              <div className="flex flex-col gap-y-2.5">
                <div className="flex justify-between">
                  <div>Engineering</div>
                  <div className="flex gap-x-2">
                    <div className="text-gray-500 py-0.5">
                      1850 Birr / 2000 Birr
                    </div>
                    <div className="px-1 py-0.5 text-sm bg-black text-white rounded-md">
                      150 Birr under
                    </div>
                  </div>
                </div>
                <Progress value={60}></Progress>
              </div>
              <div className="flex flex-col gap-y-2.5">
                <div className="flex justify-between">
                  <div>HR</div>
                  <div className="flex gap-x-2">
                    <div className="text-gray-500 py-0.5">
                      1850 Birr / 2000 Birr
                    </div>
                    <div className="px-1 py-0.5 text-sm bg-black text-white rounded-md">
                      150 Birr under
                    </div>
                  </div>
                </div>
                <Progress value={80}></Progress>
              </div>
              <div className="flex flex-col gap-y-2.5">
                <div className="flex justify-between">
                  <div>Markeing</div>
                  <div className="flex gap-x-2">
                    <div className="text-gray-500 py-0.5">
                      1850 Birr / 2000 Birr
                    </div>
                    <div className="px-1 py-0.5 text-sm bg-black text-white rounded-md">
                      150 Birr under
                    </div>
                  </div>
                </div>
                <Progress value={40}></Progress>
              </div>
              <div className="flex flex-col gap-y-2.5">
                <div className="flex justify-between">
                  <div>Finance</div>
                  <div className="flex gap-x-2">
                    <div className="text-gray-500 py-0.5">
                      1850 Birr / 2000 Birr
                    </div>
                    <div className="px-1 py-0.5 text-sm bg-black text-white rounded-md">
                      150 Birr under
                    </div>
                  </div>
                </div>
                <Progress value={30}></Progress>
              </div>
              <div className="flex flex-col gap-y-2.5">
                <div className="flex justify-between">
                  <div>Sales</div>
                  <div className="flex gap-x-2">
                    <div className="text-gray-500 py-0.5">
                      1850 Birr / 2000 Birr
                    </div>
                    <div className="px-1 py-0.5 text-sm bg-black text-white rounded-md">
                      150 Birr under
                    </div>
                  </div>
                </div>
                <Progress value={70}></Progress>
              </div>
            </div>
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
