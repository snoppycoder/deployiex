export interface ExpenseRow {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected" | "Draft";
  categoryId: string; // we will may be match it with a title
}
export interface ExpenseInfo {
  totalAmount: number;
  approvedAmount: number;
  pendingAmount: number;
  totalNumberOfExpenses: number;
  totalNumberOfApprovedExpenses: number;
  totalNumberOfPendingExpenses: number;
}
