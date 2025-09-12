"use client";
import { useState } from "react";
import PieChartComponent from "./pie-chart";
import BarChartComponent from "./bar-chart";
import { Progress } from "@/components/ui/progress";
import EmployeeCard from "./Employee-Card";

import PolicyComplianceCard from "./PolicyCompliance-Card";
import PolicyStatCard from "./PolicyStat-Card";
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
                  <div className="w-[290px] h-[220px] lg:w-[430px] lg:h-[300px]">
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
            <div className="w-full flex justify-center items-center">
              <div className="w-full ">
                <BarChartComponent />
              </div>
            </div>
          </div>
        )}
        {activeTab === "departments" && (
          <div className="w-full">
            <div className="flex flex-col w-full p-4 mt-2.5 gap-y-4">
              <div className="flex flex-col gap-y-2.5">
                <div className="flex justify-between">
                  <div>Engineering</div>
                  <div className="flex gap-x-2">
                    <div className="text-gray-500 py-0.5">
                      1850 Birr / 2000 Birr
                    </div>
                    <div className="hidden md:block px-1 py-0.5 text-sm bg-black text-white rounded-md">
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
                    <div className="hidden md:block px-1 py-0.5 text-sm bg-black text-white rounded-md">
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
                    <div className="hidden md:block px-1 py-0.5 text-sm bg-black text-white rounded-md">
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
                    <div className="hidden md:block px-1 py-0.5 text-sm bg-black text-white rounded-md">
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
                    <div className="hidden md:block px-1 py-0.5 text-sm bg-black text-white rounded-md">
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
            <div className="w-full grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
              <PolicyStatCard title="Policy Violation" amount={3} />
              <PolicyStatCard title="Missing Receipts" amount={1} />
              <PolicyStatCard title="Late Submissions" amount={5} />
              <PolicyStatCard title="Approval Time (days)" amount={2} />
            </div>

            <div className="w-full mt-2.5 p-4 border border-gray-300 rounded-lg">
              <div className="mb-2.5">
                <h1 className="font-semibold text-lg">
                  Policy Compliance Overview
                </h1>
                <span className="text-gray-600 font-light">
                  Track compliance with company expense policies
                </span>
              </div>
              <PolicyComplianceCard order={0} value={98} status={"Excellent"} />
              <PolicyComplianceCard order={1} value={98} status={"Excellent"} />
              <PolicyComplianceCard order={2} value={98} status={"Excellent"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
