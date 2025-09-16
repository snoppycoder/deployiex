"use client";
import { Camera, Download, Plus, Upload, X } from "lucide-react";
import { useState } from "react";

export default function ScanReciept() {
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
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-white hover:bg-white/90 h-9 px-4 py-2  justify-center text-black border border-gray-300"
      >
        <Camera size={18} /> Scan Receipt
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <h2 className="text-lg font-semibold mb-2">AI Receipt Scanner</h2>
            <span className="text-gray-800 text-sm">
              Upload a receipt image and our AI will automatically extract
              expense details
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 p-3 rounded hover:bg-gray-300"
            >
              <X size={16} />
            </button>

            <div
              className="w-full mt-2.5 border-3 border-gray-600 px-4 py-6 border-dashed flex flex-col items-center "
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload size={40} />
              <div>Drop your receipt image here or click to browse</div>
              <div>Supports JPG, PNG, PDF up to 10MB</div>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 justify-center rounded-md bg-white text-black mt-4 text-sm font-medium px-4 py-2 cursor-pointer border border-gray-300 transition-colors"
              >
                <Camera size={18} />
                Upload File
              </label>
              {fileName && (
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {fileName}
                </span>
              )}
            </div>
            <div className="mt-4 bg-gray-100 rounded-lg p-4 leading-relaxed">
              <h1 className="font-semibold">AI-Extracted Data Preview</h1>
              <span>
                Upload a receipt to see automatic data extraction in action
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
