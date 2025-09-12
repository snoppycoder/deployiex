import {
  CircleCheckBig,
  Clock,
  Plus,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import ExpenseCard from "../component/expense-card";
import ApprovalTabSwitcher from "../component/Approval-ToggleTab";

export default function Approval() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 md:pt-6 gap-4">
      <div className="w-full flex md:flex-row items-center justify-between flex-col ">
        <div>
          <h1 className="text-2xl sm:text-3xl">Income Tracker</h1>
          <span className="font-extralight text-gray-600 ">
            Track and manage your income sources and payments
          </span>
        </div>
        <div className="flex gap-x-2.5 mt-2.5 md:mt-0">
          <button
            data-slot="button"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-white h-9 px-5 py-2  border border-gray-300 text-black"
          >
            <Settings size={18} className="mr-2" /> Manage Workflows
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
        <ExpenseCard
          title={"Pending Approvals"}
          amount={"3"}
          type={"Total"}
          isLogo={true}
          Logo={<Clock className="text-orange-300" size={18} />}
          detail={"Awaiting your review"}
        ></ExpenseCard>
        <ExpenseCard
          title={"High Priority"}
          amount={"3"}
          type={"Total"}
          isLogo={true}
          Logo={<ShieldAlert className="text-red-300" size={18} />}
          detail={"Urgent review needed"}
        ></ExpenseCard>
        <ExpenseCard
          title={"Total Amount"}
          amount={"857.89 Birr"}
          type={"Total"}
          isLogo={true}
          Logo={<Users className="text-blue-300" size={18} />}
          detail={"Pending Approval"}
        ></ExpenseCard>
        <ExpenseCard
          title={"Approved Today"}
          amount={"12"}
          isLogo={true}
          Logo={<CircleCheckBig className="text-green-300" size={18} />}
          detail={"Processed successfully"}
          type={"Total"}
        ></ExpenseCard>
      </div>
      <ApprovalTabSwitcher />
    </div>
  );
}
