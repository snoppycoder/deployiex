import {
  ArrowDownRight,
  Camera,
  ChartColumnIncreasing,
  Download,
  Plus,
  Target,
  TrendingDown,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";

import DropDown from "../component/dropdown";
import DashboardCard from "../component/dashboard-card";
import AnalyticsCard from "../component/Analytics-Card";
import { tree } from "next/dist/build/templates/app-page";

export default function Analytics() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 md:pt-6 gap-4">
      <div className="w-full grid grid-rows-2 md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl">Analytics & Reports</h1>
          <span className="font-extralight text-gray-600 ">
            Comprehensive insights into your financial data and spending
            patterns
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <DropDown
            options={[
              "Last month",
              "Last three month",
              "Last six month",
              "Last Year",
            ]}
            default={2}
          ></DropDown>
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-9 px-4 py-2   text-white"
          >
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
        <DashboardCard
          title={"Total Expense"}
          amount={1_245.67}
          detail={"+12% more than last month"}
          Logo={<TrendingDown size={18} className="text-red-500" />}
          isLogo={true}
          type="Total"
          isNotCurrency={false}
        />
        <AnalyticsCard
          title={"Budget Utilization"}
          amount={84.7}
          isLogo={true}
          isPercent={true}
          Logo={<Target size={18} className="text-blue-500" />}
          detail={"Expense approval time"}
          type={"Total"}
        />
        <DashboardCard
          title={"Net Income"}
          amount={4_515}
          detail={"Income minus expenses"}
          Logo={<TrendingUp size={18} className="text-green-500" />}
          isLogo={true}
          type="Total"
          isNotCurrency={false}
        />

        <AnalyticsCard
          title={"Avg Processing Time"}
          amount={2.5}
          detail={"Expense approval time"}
          Logo={<ChartColumnIncreasing size={18} className="text-indigo-500" />}
          isLogo={true}
          type="Total"
          isPercent={false}
        />
      </div>
    </div>
  );
}
