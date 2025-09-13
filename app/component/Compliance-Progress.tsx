import { Progress } from "@/components/ui/progress";

type ComplianceProgressProp = {
  attribute: string;
  stats: "Improving" | "Declining" | "Stable";
  numberOfViolation: number;
  percent: number;
};
export default function ComplianceProgress(Props: ComplianceProgressProp) {
  return (
    <div className="w-full mb-4  flex flex-col gap-y-1.5">
      <div className="flex justify-between">
        <div className="flex gap-x-1">
          <div>{Props.attribute}</div>
        </div>
        <div className="flex flex-col">
          <div>{Props.percent}%</div>
          <div className="text-xs">{Props.numberOfViolation} violations</div>
        </div>
      </div>

      <Progress value={Props.percent}></Progress>
    </div>
  );
}
