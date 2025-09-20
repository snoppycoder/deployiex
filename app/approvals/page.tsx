import {
  CircleCheckBig,
  Clock,
  Plus,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";

import ApprovalTabSwitcher from "../component/Approval-ToggleTab";
import ExpenseCard from "../component/expense-card";
import WorkflowsButton from "../component/ManagerWorkflow-Button";

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
          <WorkflowsButton />
        </div>
      </div>
      <div className=" w-full grid grid-cols-2 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6">
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
