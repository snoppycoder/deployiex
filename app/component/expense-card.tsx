type ExpenseCardProps = {
  title: string;
  amount: number;
  detail: string;
  type: "Pending" | "Approved" | "Total";
  isLogo?: boolean;
  Logo?: React.ReactNode;
};

export default function ExpenseCard({
  title,
  detail,
  amount,
  type,
  Logo,
  isLogo,
}: ExpenseCardProps) {
  const amountColor =
    type === "Pending"
      ? "text-yellow-500"
      : type === "Approved"
      ? "text-green-500"
      : "text-black";
  return (
    <div className="w-64 px-4 py-6 flex flex-col border border-gray-300 rounded-lg hover:shadow-lg gap-y-4">
      <div className="w-full py-2 flex justify-between items-start">
        {title}
        <div className={`${isLogo} ? "block" : "hidden" `}>{Logo}</div>
      </div>
      <div className="gap-y-2">
        <div className={`w-full font-semibold text-xl ${amountColor}`}>
          {amount} Birr
        </div>
        <div className="w-full text-md">{detail}</div>
      </div>
    </div>
  );
}
