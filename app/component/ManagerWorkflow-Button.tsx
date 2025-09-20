"use client";
import { Plus, Settings, X } from "lucide-react";
import { useState } from "react";
import DropDown from "./dropdown";

export default function WorkflowsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-slot="button"
        className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-white hover:bg-white/90 h-8 lg:h-9 lg:px-4 px-2 py-2 text-xs text-black border border-gray-300"
      >
        <Settings size={16} /> Manage Workflows
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg  w-xl md:w-2xl">
            <h2 className="text-lg font-semibold mb-4">Submit new Income</h2>
            <span className="text-sm mb-4 text-gray-600">
              Enter the details of your business expense for approval
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 p-3 rounded cursor-pointer"
            >
              <X size={16} />
            </button>
            <form action="">
              <div className="w-full flex flex-col gap-2.5">
                <div className="flex w-full gap-x-2.5 ">
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="amount " className="font-semibold">
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="catagory" className="font-semibold">
                      Catagory
                    </label>
                    <DropDown options={["IT", "Finance", "HR", "Accountant"]} />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="description" className="font-semibold">
                    Income Source
                  </label>
                  <input
                    id="description"
                    type="number"
                    className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    placeholder="Brief description of the income source "
                  />
                </div>
                <div className="flex w-full gap-x-2.5 ">
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="client " className="font-semibold">
                      Client/Source
                    </label>
                    <input
                      id="client"
                      type="number"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="invoice-no" className="font-semibold">
                      Invoice Number
                    </label>
                    <input
                      type="number"
                      id="invoice-no"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md" //will change this to drop down
                    />
                  </div>
                </div>
                <div className="flex w-full gap-x-2.5 ">
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="date " className="font-semibold">
                      Date Received
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="status" className="font-semibold">
                      Status
                      {/* Status    will make this a dropdown */}
                    </label>
                    <input
                      type="number"
                      id="status"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md" //will change this to drop down
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="note" className="font-semibold">
                    Additional Notes
                  </label>
                  <input
                    id="note"
                    type="number"
                    className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    placeholder="Any additional detail or context "
                  />
                </div>

                <button
                  type="submit"
                  className="p-2 bg-black rounded-md text-white font-semibold"
                >
                  Add Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
