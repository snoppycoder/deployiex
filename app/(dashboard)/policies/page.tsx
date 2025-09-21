import { Plus } from "lucide-react";

import PolicyManagementCard from "../../component/PolicyManagement-Card";
import PolicyTabSwitcher from "../../component/Policy-Toggle";
import AddPolicyButton from "../../component/AddPolicy";

export default function Polices() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 pt-6 gap-4">
      <div className="w-full flex md:flex-row items-center justify-between flex-col ">
        <div>
          <h1 className="text-2xl sm:text-3xl">Policy Management</h1>
          <span className="font-extralight text-gray-600 ">
            Manage expense policies and monitor compliance across your
            organization
          </span>
        </div>
        <div className="flex gap-x-2.5 mt-2.5 md:mt-0">
          <AddPolicyButton />
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
