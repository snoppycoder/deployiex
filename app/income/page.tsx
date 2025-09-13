import {
  ArrowUpRight,
  DollarSign,
  Eye,
  Plus,
  Receipt,
  SquarePen,
  Trash,
} from "lucide-react";
import ExpenseCard from "../component/Expense-card";
import PieChartComponent from "../component/pie-chart";
import BarChartComponent, { data } from "../component/bar-chart";
import DataTable from "../component/table";
import { ColumnDef } from "@tanstack/react-table";
import IncomeTable from "../component/income-table";

export default function Income() {
  const columns: ColumnDef<(typeof data)[0]>[] = [
    {
      accessorKey: "Description",
      header: "Description",
    },
    {
      accessorKey: "Category",
      header: "Category",
    },
    {
      accessorKey: "Amount",
      header: "Amount",
      cell: ({ getValue }) => `$${getValue<number>()}`, // format as currency
    },
    {
      accessorKey: "Date",
      header: "Date",
    },
    {
      accessorKey: "Status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-white text-black rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer">
            <Eye className="w-4 h-4"></Eye>
          </button>
          <button className="px-3 py-2  bg-white text-black  rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer">
            <SquarePen className="w-4 h-4" />
          </button>
          <button className="px-2 py-1  bg-white text-black  rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer ">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];
  const data = [
    // this will be fetched from an api or a graphql
    {
      Description: "Lunch with team",
      Category: "Food",
      Amount: 45,
      Date: "2025-09-10",
      Status: "Approved",
    },
    {
      Description: "Taxi fare",
      Category: "Transport",
      Amount: 20,
      Date: "2025-09-09",
      Status: "Pending",
    },
    {
      Description: "Taxi fare",
      Category: "Transport",
      Amount: 20,
      Date: "2025-09-09",
      Status: "Pending",
    },
  ];
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
      <div className=" w-full grid grid-cols-2 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6 mb-2.5">
        <ExpenseCard
          title={"Total Income"}
          amount={"550.49 Birr"}
          detail={"All time total"}
          type={"Total"}
          isLogo={true}
          Logo={<DollarSign size={18} className="text-green-400" />}
        />
        <ExpenseCard
          title={"Recieved"}
          amount={"205.5 Birr"}
          detail={"Payments completed"}
          type={"Approved"}
          isLogo={true}
          Logo={<ArrowUpRight size={18} className="text-green-400" />}
        />
        <ExpenseCard
          title={"Total Submitted"}
          amount={"1800 Birr"}
          detail={"1 expense"}
          type={"Pending"}
        />
      </div>
      <div className=" w-full flex flex-col xl:grid xl:grid-cols-2 gap-x-4">
        <div className="w-full px-2  border border-gray-300 rounded-lg">
          <div className="m-3 font-medium">
            <span className="font-semibold text-lg">
              Monthly Income Trend <br />
            </span>
            <span className="text-gray-400">
              Your income over the last 6 months
            </span>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-[300px] h-auto md:w-[460px] md:h-[300px]">
              <BarChartComponent />
            </div>
          </div>
        </div>
        <div className="w-full px-2  border border-gray-300 rounded-lg">
          <div className="m-3 font-medium">
            <span className="font-semibold text-lg">
              Income Categories <br />
            </span>
            <span className="font-sm text-gray-400">
              Breakdown of income sources this month
            </span>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-[300px]">
              <PieChartComponent />
            </div>
          </div>
        </div>
      </div>
      <IncomeTable />
    </div>
  );
}
