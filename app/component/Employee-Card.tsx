type EmployeeCardProp = {
  fullName: string;
  rank: number;
  amount: number;
  department: string;
  numberOfExpenses: number;
};
export default function EmployeeCard(Props: EmployeeCardProp) {
  return (
    <div className="w-full p-2 flex justify-between bg-gray-100 mb-2.5 rounded-lg">
      <div className="flex items-center gap-x-2.5">
        <div className="flex justify-center items-center bg-black rounded-full h-8 w-8 p-2 text-sm text-white">
          {Props.rank}
        </div>
        <div className="flex flex-col gap-y-1">
          <div>{Props.fullName}</div>
          <div>
            {Props.department} &#11825; {Props.numberOfExpenses} Expenses
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>{Props.amount} Birr</div>
        <div>Total spent</div>
      </div>
    </div>
  );
}
