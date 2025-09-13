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
import TransactionCard from "../component/Transaction-Card";
import PolicyManagementCard from "../component/PolicyManagement-Card";
import PolicyTabSwitcher from "../component/Policy-Toggle";

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
      <div className=" w-full grid grid-cols-2 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
        <PolicyManagementCard
          title={"Travel"}
          amount={"94%"}
          color="text-orange-400"
          detail={"2 violations"}
          status={"Stable"}
        />
        <PolicyManagementCard
          title={"Travel"}
          amount={"98"}
          color="text-green-400"
          detail={"+12% more than last month"}
          status={"Stable"}
        />
        <PolicyManagementCard
          title={"Travel"}
          amount={"94%"}
          color="text-orange-400"
          detail={"2 violations"}
          status={"Stable"}
        />
        <PolicyManagementCard
          title={"Travel"}
          amount={"98"}
          color="text-green-400"
          detail={"+12% more than last month"}
          status={"Stable"}
        />
      </div>
      <PolicyTabSwitcher />
    </div>
  );
}
