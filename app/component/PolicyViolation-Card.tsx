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
  if (Props.priority === "Low") {
    colorCombo = "bg-black text-white";
  } else if (Props.priority === "High") {
    colorCombo = "bg-red-300 text-white";
  }

  return (
    <div className="w-full mb-2.5 mt-2.5 p-4 flex flex-col md:flex-row md:justify-between gap-y-4 border border-gray-300 rounded-lg hover:shadow-lg">
      {/* Content */}
      <div className="flex-1 flex flex-col gap-y-2.5">
        <div className="flex flex-wrap gap-2 md:gap-x-6 items-start">
          <h1 className="text-md md:text-lg font-semibold">{Props.title}</h1>
          <div
            className={`inline-block p-1 font-semibold rounded-md ${colorCombo} text-xs`}
          >
            {Props.priority}
          </div>
          <div
            className={`inline-flex justify-center items-center font-semibold p-1 rounded-md border border-gray-200 text-black text-xs`}
          >
            {Props.status}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-x-6 text-sm text-gray-800">
          <div>Employee: {Props.employeeName}</div>
          <div>Policy: {Props.policyName}</div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-x-6 text-sm text-gray-800">
          <div className="font-semibold">
            Violation: {Props.violationReason}
          </div>
          <div>Date: {Props.date}</div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-x-2.5 text-sm text-gray-800">
          <div>Amount: {Props.amount} Birr</div>
          <div>Limit: {Props.limit} Birr</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex md:flex-col flex-row gap-2 md:gap-y-2 items-start md:items-end mt-2 md:mt-0">
        <div className="cursor-pointer w-10 h-10 border rounded-lg flex justify-center items-center">
          <Eye size={18} />
        </div>

        {Props.status === "Pending" && (
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer">
            Resolve
          </button>
        )}
      </div>
    </div>
  );
}
