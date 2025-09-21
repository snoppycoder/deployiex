"use client";
import {
  ChartColumnIncreasing,
  Download,
  Target,
  TrendingDown,
  TrendingUp,
  Check,
  ChevronDown,
  Filter,
} from "lucide-react";

import AnalyticsCard from "../../component/Analytics-Card";

import AnalyticsTabSwitcher from "../../component/Analytics-Toggle";
import { useState } from "react";
import DashboardCard from "../../component/dashboard-card";

export default function Analytics() {
  const [open, setOpen] = useState(false);
  const options = [
    "Last month",
    "Last three month",
    "Last six month",
    "Last Year",
  ];
  const [selected, setSelected] = useState(options[2]);
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 md:pt-6 gap-4">
      <div className="w-full flex lg:flex-row lg:items-center justify-between flex-col ">
        <div>
          <h1 className="text-2xl sm:text-3xl">Analytics & Reports</h1>
          <span className="font-extralight text-gray-600 ">
            Comprehensive insights into your financial data and spending
            patterns
          </span>
        </div>
        <div className="flex gap-x-2.5 mt-3.5 mb-2.5">
          <div className="relative w-full md:w-48 ">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-200 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600 " />
                <span className="text-sm">{selected}</span>
              </div>

              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between text-sm"
                  >
                    {option}
                    {option == selected ? <Check className="w-4 h-4" /> : <></>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-9 px-4 py-2   text-white"
          >
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>
      <div className=" w-full grid grid-cols-2 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
        <DashboardCard
          title={"Total Expense"}
          amount={"1,245.67 Birr"}
          detail={"+12% more than last month"}
          Logo={<TrendingDown size={16} className="text-red-500" />}
          isLogo={true}
          color="text-black"
        />
        <AnalyticsCard
          title={"Budget Utilization"}
          amount={"84.7%"}
          isLogo={true}
          Logo={<Target size={16} className="text-blue-500" />}
          detail={"Expense approval time"}
        />
        <DashboardCard
          title={"Net Income"}
          amount={"4,515 Birr"}
          detail={"Income minus expenses"}
          Logo={<TrendingUp size={16} className="text-green-500" />}
          isLogo={true}
        />

        <AnalyticsCard
          title={"Avg Processing Time"}
          amount={"2.5"}
          detail={"Expense approval time"}
          Logo={<ChartColumnIncreasing size={16} className="text-indigo-500" />}
          isLogo={true}
        />
      </div>
      <AnalyticsTabSwitcher />
    </div>
  );
}
