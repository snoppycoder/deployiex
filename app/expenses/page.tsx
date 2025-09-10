import { Camera, Filter, Plus, Receipt, Search } from "lucide-react";
import Dropdown from "../component/dropdown";

export default function Expenses() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-2 md:pt-6 gap-4">
      <div className="w-full grid grid-rows-2 md:flex items-center justify-between">
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
      <div className="w-full flex flex-col md:flex-row gap-2.5 px-2 py-4 border border-gray-300 rounded-lg">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search expenses..."
            className="pl-9 w-full px-3 py-2 bg-gray-200 rounded-lg outline-none"
          />
        </div>
        <div className="w-full md:w-48">
          <Dropdown />
        </div>
      </div>
    </div>
  );
}
