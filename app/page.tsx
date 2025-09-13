import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Plus,
  Receipt,
} from "lucide-react";

import BarChartComponent from "./component/bar-chart";
import PieChartComponent from "./component/pie-chart";
import TransactionCard from "./component/Transaction-Card";
import { Progress } from "@/components/ui/progress";
import DashboardCard from "./component/Dashboard-Card";

export default function Dashboard() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 pt-6 gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-y-2.5 ">
        <div>
          <h1 className="text-2xl sm:text-3xl">Dashboard</h1>
          <span className="font-extralight text-gray-600 ">
            Welcome back! Here's your expense overview for this month.
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-8 lg:h-9 lg:px-4 px-2 py-2  text-xs text-white"
          >
            <Plus size={16} /> Add Expense
          </button>
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-white  h-8 lg:h-9 lg:px-4 px-2 py-2  text-xs text-black border border-gray-300"
          >
            <Receipt size={16} /> Scan Receipt
          </button>
        </div>
      </div>
      <div className=" w-full grid grid-cols-2 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
        <DashboardCard
          title={"Total Expense"}
          amount={"4,235.50 Birr "}
          detail={"+12% more than last month"}
          Logo={<ArrowDownRight size={18} className="text-red-500" />}
          isLogo={true}
        />
        <DashboardCard
          title={"Total Income"}
          amount={"8753.67 Birr"}
          detail={"+8% more than last month"}
          Logo={<ArrowUpRight size={18} className="text-green-500" />}
          isLogo={true}
        />
        <DashboardCard
          title={"Pending"}
          amount={"7"}
          detail={"3 requests require your action"}
          Logo={<Clock size={18} className="text-orange-300" />}
          isLogo={true}
          color={"text-orange-500"}
        />
        {/** we don't need to make a custom card for this we will just do some refactoring
         */}

        <div className="w-36 md:w-48 xl:w-56 px-2 py-4 md:px-4 md:py-6 flex flex-col border border-gray-300 rounded-lg hover:shadow-lg gap-y-4">
          <div className="w-full py-2 flex justify-between items-start">
            Budget Remaining
            <div>
              <ArrowDownRight size={18} className="text-red-500" />
            </div>
          </div>
          <div className="gap-y-1">
            <div className="w-full flex flex-col gap-y-2 text-xl">
              <span className="text-2xl font-medium">1,764.50 Birr</span>
              <Progress value={70}></Progress>
            </div>

            <div className="w-full text-sm  text-gray-400">
              72% of monthly budget used
            </div>
          </div>
        </div>
      </div>
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
            <div className="w-[300px] h-auto md:w-[460px] md:h-[300px]">
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
            <div className="w-[300px]">
              <PieChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col p-6 border border-gray-300 rounded-xl gap-y-3">
        <div className="m-3 font-medium">
          <span className="font-semibold text-lg">
            Recent Transactions <br />
          </span>
          <span className="font-sm text-gray-400">
            Your latest expense submissions and their status
          </span>
        </div>
        <TransactionCard
          title={"Business Lunch - Client Meeting"}
          detail={"Meals "}
          date={"2025-01-08"}
          amount={100}
          status={"Approved"}
        />
        <TransactionCard
          title={"Business Lunch - Client Meeting"}
          detail={"Meals "}
          date={"2025-01-08"}
          amount={100}
          status={"Pending"}
        />
        <TransactionCard
          title={"Business Lunch - Client Meeting"}
          detail={"Meals "}
          date={"2025-01-08"}
          amount={100}
          status={"Approved"}
        />
      </div>
    </div>
  );
}
