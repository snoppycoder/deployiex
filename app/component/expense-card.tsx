type ExpenseCardProps = {
  title: string;
  amount: string;
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
    <div className="w-36 md:w-48 xl:w-56 px-2 py-4 md:px-4 md:py-6 flex flex-col border border-gray-300 rounded-lg hover:shadow-lg gap-y-2.5 md:gap-y-4">
      <div className="w-full py-2 flex justify-between items-start">
        {title}
        <div className={`${isLogo} ? "block" : "hidden" `}>{Logo}</div>
      </div>
      <div className="gap-y-2">
        <div className={`w-full ${amountColor}`}>
          <span className="text-lg md:text-xl lg:text-2xl font-medium">
            {amount}
          </span>
        </div>

        <div className="w-full text-sm md:text-md">{detail}</div>
      </div>
    </div>
  );
}
