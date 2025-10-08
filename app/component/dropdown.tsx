"use client";
import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
type DropDownProp = {
  options: string[];
  default?: number;
};

export default function DropDown(Prop: DropDownProp) {
  const [open, setOpen] = useState(false);
  const options = Prop.options;
  const [selected, setSelected] = useState(options[Prop.default ?? 0]);

  return (
    <div className="relative w-full md:w-48 ">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 bg-gray-200 rounded-md"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600 " />
          <span className="text-sm">{selected}</span>
        </div>

        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between text-sm"
            >
              {option}
              {option == selected ? <Check className="w-4 h-4" /> : <></>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
