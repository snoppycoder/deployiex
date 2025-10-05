export interface ExpenseRow {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected" | "Draft";
  category: string;
}
