type DashboardCardProp = {
  title: string;
  amount: number;
  detail: string;
  type: "Pending" | "Approved" | "Total";
  isLogo?: boolean;
  Logo?: React.ReactNode;
  isNotCurrency?: boolean;
};

export default function DashboardCard({
  title,
  detail,
  amount,
  type,
  Logo,
  isLogo,
  isNotCurrency,
}: DashboardCardProp) {
  const amountColor =
    type === "Pending"
      ? "text-yellow-500"
      : type === "Approved"
      ? "text-green-500"
      : "text-black";
  return (
    <div className="w-48 xl:w-56 px-4 py-6 flex flex-col border border-gray-300 rounded-lg hover:shadow-lg gap-y-4">
      <div className="w-full py-2 flex justify-between items-start">
        {title}
        <div className={`${isLogo} ? "block" : "hidden" `}>{Logo}</div>
      </div>
      <div className="gap-y-1">
        <div className={`w-full text-xl ${amountColor}`}>
          <span className="text-2xl font-medium">
            {isNotCurrency ? `${amount}` : `${amount} Birr`}
          </span>
        </div>

        <div className="w-full text-sm  text-gray-400">{detail}</div>
      </div>
    </div>
  );
}
