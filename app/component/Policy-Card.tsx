import {
  CircleCheck,
  Eye,
  Pen,
  ShieldAlert,
  SquarePen,
  Trash,
} from "lucide-react";

type PolicyCardProp = {
  title: string;
  detail: string;
  limit: string[];
  requirement: string[];
  numberOfViolations: string;
  numberOfCompliance: string;
  createdAt: string;
};

export default function PolicyCard({
  title,
  detail,
  createdAt,
  limit,
  requirement,
  numberOfViolations,
  numberOfCompliance,
}: PolicyCardProp) {
  return (
    <div className="w-full mb-2.5 px-4 py-3 flex md:flex-row md:justify-between flex-col gap-y-4 border border-gray-300 rounded-lg hover:shadow-lg ">
      <div className="w-full flex flex-col gap-y-1">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="w-full text-sm  text-gray-400">{detail}</div>
        <div className="flex flex-row gap-x-2.5 md:gap-x-0 md:justify-between">
          <div className="text-sm font-medium flex md:gap-x-2.5">
            <Pen size={16} className="hidden md:block" />
            Updated at: {createdAt}
          </div>
          <div className="text-sm font-medium flex md:gap-x-2.5">
            <ShieldAlert size={16} className="hidden md:block" />
            {numberOfViolations} violations
          </div>
          <div className="text-sm font-medium flex md:gap-x-2.5">
            <CircleCheck size={16} className="hidden md:block" />
            {numberOfCompliance} of compliance
          </div>
        </div>
        <div>
          <h2 className="text-md text-gray-600">Policy Rule:</h2>
          <ul className="list-none list-inside ">
            {limit.map((val, index) => (
              <li
                key={index}
                className="p-2 text-gray-700 bg-gray-100 rounded-md mb-2.5"
              >
                <span className="font-semibold">Limit</span>: {val}
              </li>
            ))}
          </ul>
          <ul className="list-none list-inside ">
            {requirement.map((val, index) => (
              <li
                key={index}
                className="p-2 text-gray-700 bg-gray-100 rounded-md mb-2.5"
              >
                <span className="font-semibold">Requirement</span>: {val}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-full w-64 flex gap-x-4 justify-center items-center">
        <div className=" px-2 cursor-pointer py-1 w-8 h-8 border rounded-lg border-gray-300 flex justify-center items-center-safe">
          <Eye size={18}></Eye>
        </div>
        <div className=" px-2 cursor-pointer py-1 w-8 h-8 border rounded-lg border-gray-300 flex justify-center items-center-safe">
          <SquarePen size={18} />
        </div>
        <div className=" px-2 cursor-pointer py-1 w-8 h-8 border rounded-lg border-gray-300 flex justify-center items-center-safe">
          <Trash size={18} />
        </div>
      </div>
    </div>
  );
}
