import { ArrowUpRight, DollarSign, Plus, Receipt } from "lucide-react";
import ExpenseCard from "../component/expense-card";

export default function Income() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 md:pt-6 gap-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl">Income Tracker</h1>
          <span className="font-extralight text-gray-600 ">
            Track and manage your income sources and payments
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <button
            data-slot="button"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-9 px-4 py-2   text-white"
          >
            <Plus size={18} /> Add Income
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-y-2.5 justify-between">
        <ExpenseCard
          title={"Total Income"}
          amount={550.49}
          detail={"4 expenses"}
          type={"Total"}
          isLogo={true}
          Logo={<DollarSign size={18} />}
        />
        <ExpenseCard
          title={"Recieved"}
          amount={205.5}
          detail={"Payments completed"}
          type={"Approved"}
          isLogo={true}
          Logo={<ArrowUpRight size={18} />}
        />
        <ExpenseCard
          title={"Total Submitted"}
          amount={1800}
          detail={"1 expense"}
          type={"Pending"}
        />
      </div>
    </div>
  );
}
