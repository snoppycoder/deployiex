type PolicyComplianceCardProp = {
  order: 0 | 1 | 2;
  value: number;
  status: "Excellent" | "Needs Attention" | "Good";
};
export default function PolicyComplianceCard(Props: PolicyComplianceCardProp) {
  // [border-style, background-style, logo, title, verbose]
  const styleMap: Record<number, string[]> = {
    0: [
      "border-green-500",
      "bg-green-100",
      "Receipt Compliance",
      "✓",
      `${Props.value}% of expenses have receipts`,
      "bg-green-500",
    ],
    1: [
      "border-orange-500",
      "bg-orange-100",
      "Approval Time",
      "!",
      `Average ${Props.value} days processing time`,
      "bg-orange-500",
    ],
    2: [
      "border-red-500",
      "bg-red-100",
      "Policy Violations",
      "X",
      `${Props.value} violations this month`,
      "bg-red-500",
    ],
  };
  return (
    <div
      className={`w-full mb-2.5 p-4 flex justify-between ${
        styleMap[Props.order][1]
      } border ${styleMap[Props.order][0]}   rounded-sm `}
    >
      <div className="flex gap-x-4 items-center">
        <div
          className={`h-8 w-8 rounded-full flex justify-center items-center text-white ${
            styleMap[Props.order][5]
          }  `}
        >
          {styleMap[Props.order][3]}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <div className="font-semibold">{styleMap[Props.order][2]}</div>
          <div>{styleMap[Props.order][4]}</div>
        </div>
      </div>
      <div className="text-white bg-black rounded-sm px-2 h-6 text-sm">
        {Props.status}
      </div>
    </div>
  );
}
