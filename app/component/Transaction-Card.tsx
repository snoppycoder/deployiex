import { CircleCheckBig, Clock, Receipt, X } from "lucide-react";
import React from "react";

type TransactionCardProps = {
  title: string;
  detail: string;
  date: string;
  amount: number;
  status: "Approved" | "Pending" | "Rejected" | string; // optional stricter typing
};

export default function TransactionCard({
  title,
  detail,
  date,
  amount,
  status,
}: TransactionCardProps) {
  return (
    <div className="w-full p-4 flex items-center justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-50 rounded-full">
          <Receipt size={24} className="text-primary-600 hidden md:block" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm md:text-md font-medium text-gray-800">
            {title}
          </span>
          <span className="text-sm text-gray-500">
            {detail} · {date}
          </span>
          <span className="text-xs md:hidden text-gray-500">{amount} Birr</span>
        </div>
      </div>

      <div className="flex items-end gap-x-4">
        <span className="font-semibold text-gray-800 hidden md:inline text-md">
          {amount} Birr
        </span>
        <span
          className={`text-xs md:text-sm font-medium px-2 py-1 rounded-md  ${
            status == "Pending"
              ? "bg-gray-200 text-black"
              : "bg-black text-white"
          } `}
        >
          {status === "Pending" && (
            <Clock className="hidden md:inline mr-1" size={14} />
          )}
          {status === "Approved" && (
            <CircleCheckBig className="hidden md:inline mr-1" size={14} />
          )}
          {status === "Rejected" && (
            <X className="hidden md:inline mr-1" size={14} />
          )}
          {status}
        </span>
      </div>
    </div>
  );
}
