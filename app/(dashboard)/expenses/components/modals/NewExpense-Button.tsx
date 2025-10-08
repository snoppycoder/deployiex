"use client";
import { Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createExpenseSchema } from "../schemas";
import { useAuthContext } from "@/context/AuthContext";
import { useCreateExpenseMutation } from "../mutations";
import { useWhoAmI } from "@/hooks/useWhoAmI";
import { singleUpload } from "@/lib/utils";

export default function NewExpenseButton() {
  const { data, isLoading, isError } = useWhoAmI();
  const { session, isLoggedIn } = useAuthContext();
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState({}) as any;
  const [form, setForm] = useState({
    amount: "",
    categoryId: "",
    description: "",
    notes: "",
    date: new Date().toISOString(),
    recieptFilePath: "",
    currency: "ETB",
    userTeamId: data?.userTeamRoles[0].id || "",

    userId: session?.user.id || "",
    organizationId: data?.userTeamRoles[0].team.organization.id || "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useCreateExpenseMutation(() => {
    setForm({
      amount: "",
      categoryId: "",
      description: "",
      notes: "",
      date: new Date().toISOString(),
      recieptFilePath: "",
      currency: "ETB",
      userId: session?.user.id || "",
      userTeamId: data?.userTeamRoles[0].id || "",
      organizationId: data?.userTeamRoles[0].team.organization.id || "",
    });
  });

  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        const res = await singleUpload(file);
        console.log(res, "res aws");
        setResponse(res.filePath);
        setFileName(file.name);
      } catch (err) {
        toast.error("Failed to upload file. Please try again.");
        return;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setForm((prev) => ({
  //     ...prev,
  //     recieptFile: file, // store the actual File object
  //   }));
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) return;

    const expenseData = {
      amount: Number(form.amount),
      categoryId: form.categoryId,
      description: form.description || "",
      notes: form.notes || "",
      userId: form.userId,
      organizationId: form.organizationId,
      userTeamId: form.userTeamId || null,
      currency: form.currency || "Birr",
      date: new Date().toISOString().split("T")[0],
      receiptFile: response, // we will make an api that returns a string after uploading the file to db and we will use that string here
    };
    console.log(expenseData, "expense data");

    mutate(expenseData);

    setErrors({});
    const parsed = createExpenseSchema.safeParse(expenseData);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const e of parsed.error.issues)
        errs[e.path[0] as string] = e.message;

      setErrors(errs);
      return;
    }
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
            <form onSubmit={onSubmit}>
              <div className="w-full flex flex-col gap-2.5">
                <div className="flex w-full gap-x-2.5 ">
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="amount " className="font-semibold">
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      required
                      value={form.amount}
                      onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                      }
                      className="w-full px-2 py-2 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-1.5">
                    <label htmlFor="catagory" className="font-semibold">
                      Catagory
                    </label>
                    <input
                      type="text"
                      id="catagory"
                      required
                      value={form.categoryId}
                      onChange={(e) =>
                        setForm({ ...form, categoryId: e.target.value })
                      }
                      placeholder="Select Catagory"
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
                    required
                    type="text"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
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
                    type="text"
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
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                    }}
                    required
                    id="file-upload"
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
                  disabled={isPending}
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
