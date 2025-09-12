type PolicyStatCardProp = {
  title: string;
  amount: number;
};
export default function PolicyStatCard(Props: PolicyStatCardProp) {
  return (
    <div className="w-36 xl:w-48 px-2 py-3 flex flex-col border border-gray-300 rounded-lg hover:shadow-md gap-y-4">
      <div>{Props.title}</div>
      <div className="text-lg font-semibold">{Props.amount}</div>
    </div>
  );
}
