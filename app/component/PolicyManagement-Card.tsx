type PolicyManagementCardProp = {
  title: string;
  amount: string;
  detail: string;
  color?: string;
  status: "Stable" | "Improving" | "Declining";
};

export default function PolicyManagementCard({
  title,
  detail,
  amount,
  color,
  status,
}: PolicyManagementCardProp) {
  let statusColor = "text-white bg-red-200";
  if (status === "Stable") {
    statusColor = "text-black bg-gray-200";
  } else if (status == "Improving") {
    statusColor = "text-white bg-black";
  }
  return (
    <div className="w-36 md:w-48 xl:w-56 px-4 py-2 md:px-4 md:py-6 flex flex-col border border-gray-300 rounded-lg hover:shadow-lg gap-y-4">
      <div className="w-full py-2 flex justify-between items-start">
        {title}
      </div>
      <div className="gap-y-2.5">
        <div className={`w-full text-xl ${color}`}>
          <span className="text-2xl font-medium">{amount}</span>
        </div>

        <div className="w-full text-sm text-gray-400">{detail}</div>
        <div
          className={`inline-block text-sm  px-2 py-1 font-semibold rounded-md ${statusColor} mt-6`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
