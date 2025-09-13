type AnalyticsCardProp = {
  title: string;
  amount: string;
  detail: string;
  color?: string;
  isLogo?: boolean;
  Logo?: React.ReactNode;
};

export default function AnalyticsCard({
  title,
  detail,
  amount,
  color,
  Logo,
  isLogo,
}: AnalyticsCardProp) {
  return (
    <div className="w-38 md:w-48 xl:w-56 px-2 py-4 md:px-4 md:py-6 flex flex-col border border-gray-300 rounded-lg hover:shadow-lg gap-y-4">
      <div className="w-full text-md md:text-lg py-0 md:py-2 flex justify-between items-start">
        {title}
        <div className={`${isLogo} ? "block" : "hidden" `}>{Logo}</div>
      </div>
      <div className="gap-y-1">
        <div className={`w-full text-lg md:text-xl ${color}`}>
          <span className="text-2xl font-medium">{amount}</span>
        </div>

        <div className="w-full text-sm text-gray-400">{detail}</div>
      </div>
    </div>
  );
}
