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
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-50 rounded-full">
          <Receipt size={24} className="text-primary-600" />
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{title}</span>
          <span className="text-sm text-gray-500">
            {detail} · {date}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-end gap-x-4">
        <span className="font-semibold text-gray-800">${amount}</span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-md  ${
            status == "Pending"
              ? "bg-gray-200 text-black"
              : "bg-black text-white"
          } `}
        >
          {status === "Pending" && <Clock className="inline mr-1" size={14} />}
          {status === "Approved" && (
            <CircleCheckBig className="inline mr-1" size={14} />
          )}
          {status === "Rejected" && <X className="inline mr-1" size={14} />}
          {status}
        </span>
      </div>
    </div>
  );
}
