"use client";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import DropDown from "../../../../component/dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryType } from "../types";
import { useWhoAmI } from "@/hooks/useWhoAmI";
import { useCategoryByOrganization } from "../queries";

export default function AddPolicyButton() {
  const { data: userData, ...rest } = useWhoAmI();

  const [isOpen, setIsOpen] = useState(false);
  const organizationId = userData?.userTeamRoles[0]?.team.organization.id;
  const { data: categories } = useCategoryByOrganization(organizationId);
  const [selected, setSelected] = useState<string>();
  useEffect(() => {
    if (categories) setSelected(categories[0].name);
  }, [categories]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-slot="button"
        className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-8 lg:h-9 lg:px-4 px-2 py-2 text-xs text-white"
      >
        <Plus size={16} /> Create Policy
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
                    <label htmlFor="title " className="font-semibold">
                      Policy title
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="w-full px-2 py-2 bg-gray-100 rounded-md"
                      placeholder="Enter a Policy title"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="catagory" className="font-semibold">
                      Catagory
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-64 justify-between"
                        >
                          <span className="text-center">
                            {selected ?? "Select category"}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white rounded-md shadow-md mt-2 w-64">
                        {categories && categories.length > 0 ? (
                          categories.map((cat) => (
                            <DropdownMenuItem
                              key={cat.id}
                              className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-sm "
                              onSelect={() => setSelected(cat.name)}
                            >
                              {cat.name}
                            </DropdownMenuItem>
                          ))
                        ) : (
                          <DropdownMenuItem className="px-2 py-1 text-gray-400">
                            No categories
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    placeholder="Brief description of the income source "
                  />
                </div>

                <div className="flex w-full gap-x-2.5 ">
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="proprity" className="font-semibold">
                      Priority
                    </label>
                    <DropDown options={["Low", "Medium", "High"]} default={1} />
                  </div>
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
