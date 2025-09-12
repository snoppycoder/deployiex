import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Plus,
  Receipt,
} from "lucide-react";
import DashboardCard from "../component/Dashboard-Card";
import BarChartComponent from "../component/bar-chart";
import PieChartComponent from "../component/pie-chart";
import TransactionCard from "../component/transactioncard";
import PolicyManagementCard from "../component/PolicyManagement-Card";

export default function Polices() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 pt-6 gap-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl">Policy Management</h1>
          <span className="font-extralight text-gray-600 ">
            Manage expense policies and monitor compliance across your
            organization
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-9 px-4 py-2   text-white"
          >
            <Plus size={18} /> Create Policy
          </button>
        </div>
      </div>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
        <PolicyManagementCard
          title={"Travel"}
          amount={"1_245.67"}
          detail={"+12% more than last month"}
          status={"Stable"}
        />
        <PolicyManagementCard
          title={"Travel"}
          amount={"1_245.67"}
          detail={"+12% more than last month"}
          status={"Stable"}
        />
        <PolicyManagementCard
          title={"Travel"}
          amount={"1_245.67"}
          detail={"+12% more than last month"}
          status={"Improving"}
        />
        <PolicyManagementCard
          title={"Travel"}
          amount={"1_245.67"}
          detail={"+12% more than last month"}
          status={"Stable"}
        />
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
            <div className="w-[460px] h-[300px]">
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
