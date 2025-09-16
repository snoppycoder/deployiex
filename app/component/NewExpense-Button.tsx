"use client";
import { Camera, Plus, Upload, X } from "lucide-react";
import { useState } from "react";

export default function NewExpenseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-slot="button"
        className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-8 lg:h-9 lg:px-4 px-2 py-2 text-xs text-white"
      >
        <Plus size={16} /> New Expense
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg  w-xl md:w-2xl">
            <h2 className="text-lg font-semibold mb-4">Submit new Expense</h2>
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
                    <input
                      type="number"
                      id="catagory"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md" //will change this to drop down
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="description" className="font-semibold">
                    Description
                  </label>
                  <input
                    id="description"
                    type="number"
                    className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    placeholder="Brief description of the expense "
                  />
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
                <div
                  className="w-full mt-2.5 border-3 border-gray-600 px-4 py-6 border-dashed flex flex-col items-center "
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload size={40} />
                  <div>Drop receipt here or click to browse</div>

                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name ?? "")
                    }
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 justify-center rounded-md bg-white text-black mt-4 text-sm font-medium px-4 py-2 cursor-pointer border border-gray-300 transition-colors"
                  >
                    Choose File
                  </label>
                  {fileName && (
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {fileName}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="p-2 bg-black rounded-md text-white font-semibold"
                >
                  Submit for approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
