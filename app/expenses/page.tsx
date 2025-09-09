import { Camera, Plus, Receipt } from "lucide-react";

export default function Expenses() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 pt-20 md:pt-6 gap-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl">Expense Management</h1>
          <span className="font-extralight text-gray-600 ">
            Submit, track, and manage your business expenses
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-white hover:bg-white/90 h-9 px-4 py-2  justify-center text-black border border-gray-300"
          >
            <Camera size={18} /> Scan Receipt
          </button>
          <button
            data-slot="button"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-9 px-4 py-2   text-white"
          >
            <Plus /> New Expense
          </button>
        </div>
      </div>
    </div>
  );
}
