type DashboardCardProps = {
  title: string;
  amount: number;
  insight: string;
  icon: React.ReactNode;
  isBudget?: boolean;
};
export default function DashboardCard(Prop: DashboardCardProps) {
  // note to future self: work on the progress bar for it to be go hand in hand with the backend (budget remaining )
  return (
    <div className=" w-full flex flex-col p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium">{Prop.title}</h2>
        {Prop.icon}
      </div>
      <div className="text-xl font-medium mt-3">{Prop.amount} Birr</div>
      {Prop.isBudget && (
        <div
          role="progressbar"
          data-state="indeterminate"
          data-max="100"
          data-slot="progress"
          className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full mt-2"
        >
          <div
            data-state="indeterminate"
            data-max="100"
            data-slot="progress-indicator"
            className="bg-black h-full w-full flex-1 transition-all"
          ></div>
        </div>
      )}
      <div className="text-sm text-gray-500">{Prop.insight}</div>
    </div>
  );
}
