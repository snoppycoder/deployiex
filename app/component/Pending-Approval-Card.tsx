import { CircleCheckBig, CircleX, Eye } from "lucide-react";
type ApprovalCardProps = {
  title: string;
  date: string;
  detail: string;
  catagory: string;
  amount: number;
  fullName: string;
  status: "High" | "Normal";
};

export default function PendingApprovalCard(Props: ApprovalCardProps) {
  const [firstName, ...rest] = Props.fullName.split(" ");
  const lastName = rest.join(" ");
  const initials: string = `${firstName[0] ?? ""}${lastName[0] ?? ""}`;
  return (
    <div className="w-full px-4 py-4 flex flex-col md:flex-row md:justify-between gap-y-4 border border-gray-200 mt-2.5 rounded-lg ">
      <div className="flex gap-x-4">
        <div className="hidden h-12 w-12 rounded-full bg-gray-200 md:flex justify-center items-center">
          {initials}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row gap-y-2.5 gap-x-4 p-2">
            <h1 className="font-semibold leading-relaxed text-md md:text-lg">
              {Props.title}
            </h1>
            <div
              className={`inline-block p-1 rounded-md text-center text-black font-semibold text-sm ${
                Props.status == "High" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {Props.status}
            </div>
          </div>

          <div className="font-medium text-gray-600 text-sm px-2">
            Submitted by {Props.fullName} | {Props.date}
          </div>
          <div className="font-medium text-gray-600 text-sm px-2">
            Catagory: {Props.catagory} | Amount: {Props.amount} Birr
          </div>
          <div className="mt-2.5 rounded-md py-2 px-2 bg-gray-200 text-sm">
            {Props.detail}
          </div>
        </div>
      </div>

      <div className="flex gap-x-1">
        <button
          data-slot="button"
          className="inline-flex items-center justify-center gap-x-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-white hover:bg-gray-200 h-6 md:h-8 px-2 py-1 md:px-4 md:py-2  text-black border border-gray-200"
        >
          <Eye size={16}></Eye> View
        </button>
        <button
          data-slot="button"
          className="inline-flex items-center justify-center gap-x-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-white hover:bg-gray-200 h-6 md:h-8 px-2 py-2 md:px-4 md:py-2   text-black border border-gray-200"
        >
          <CircleX size={16} /> Reject
        </button>
        <button
          data-slot="button"
          className="inline-flex items-center justify-center gap-x-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-black hover:bg-black/90 h-6 md:h-8 px-2 py-2 md:px-4 md:py-2 text-white"
        >
          <CircleCheckBig size={16} /> Approve
        </button>
      </div>
    </div>
  );
}
