"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function AddExpenseButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-slot="button"
        className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-8 lg:h-9 lg:px-4 px-2 py-2 text-xs text-white"
      >
        <Plus size={16} /> Add Expense
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 p-3 rounded hover:bg-gray-300"
            >
              <X size={16} />
            </button>

            <div>Needs to be decided</div>
          </div>
        </div>
      )}
    </>
  );
}
