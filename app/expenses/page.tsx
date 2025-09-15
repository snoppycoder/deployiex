import { Camera, Filter, Plus, Receipt, Search } from "lucide-react";
import ExpenseTabSwitcher from "../component/Expense-ToggleTab";
import DropDown from "../component/dropdown";
import ScanReciept from "../component/ScanReciept-Button";
import NewExpenseButton from "../component/NewExpense-Button";

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
          <ScanReciept />
          <NewExpenseButton />
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
          <DropDown
            options={["All Status", "Approved", "Pending", "Rejected"]}
          ></DropDown>
        </div>
      </div>
      <div className="w-full">
        <ExpenseTabSwitcher />
      </div>
    </div>
  );
}
