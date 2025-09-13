import {
  Pen,
  ShieldAlert,
  CircleCheck,
  Eye,
  SquarePen,
  Trash,
} from "lucide-react";

type PolicyViolationCardProp = {
  title: string;
  employeeName: string;
  policyName: string;
  date: string;
  amount: number;
  limit: number;
  status: "Pending" | "Resolved";
  priority: "Low" | "Medium" | "High";
  violationReason: string;
};

export default function PolicyViolationCard(Props: PolicyViolationCardProp) {
  let colorCombo = "bg-gray-100 text-black";
  if (Props.priority == "Low") {
    colorCombo = "bg-black text-white";
  } else if (Props.priority == "High") {
    colorCombo = "bg-red-300 text-white";
  }
  return (
    <div className="w-full  mb-2.5 mt-2.5 px-4 py-3 flex md:flex-row md:justify-between flex-col gap-y-4 border border-gray-300 rounded-lg hover:shadow-lg ">
      <div className="w-full flex flex-col gap-y-2.5">
        <div className="flex gap-x-6">
          <h1 className="text-lg font-semibold">{Props.title}</h1>
          <div
            className={`inline-flex justify-center items-center p-1 font-semibold rounded-md ${colorCombo} text-xs`}
          >
            {Props.priority}
          </div>
          <div
            className={`inline-flex justify-center items-center font-semibold p-1 rounded-md  border border-gray-200 text-black text-xs`}
          >
            {Props.status}
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="text-sm  text-gray-800">
            Employee: {Props.employeeName}
          </div>
          <div className="text-sm  text-gray-800">
            Policy: {Props.policyName}
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="text-sm font-semibold text-gray-800">
            Violation: {Props.violationReason}
          </div>
          <div className="text-sm  text-gray-800">Date: {Props.date}</div>
        </div>
        <div className="flex gap-x-2.5">
          <div className="text-sm  text-gray-800">
            Amount: {Props.amount} Birr
          </div>
          <div className="text-sm  text-gray-800">
            Limit: {Props.limit} Birr
          </div>
        </div>
      </div>
      <div className="h-full w-72 flex gap-x-4 justify-end items-center">
        <div className=" px-2 cursor-pointer py-1 w-8 h-8 border rounded-lg border-gray-300 flex justify-center items-center-safe">
          <Eye size={18}></Eye>
        </div>

        <button
          className={`${
            Props.status == "Pending" ? "block" : "hidden"
          } bg-black text-white px-2 py-1.5 rounded-md text-sm font-semibold cursor-pointer`}
        >
          Resolve
        </button>
      </div>
    </div>
  );
}
