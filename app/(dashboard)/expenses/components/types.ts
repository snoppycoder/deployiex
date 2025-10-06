export interface ExpenseRow {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected" | "Draft";
  categoryName: string;
}
export interface ExpenseInfo {
  totalAmount: number;
  approvedAmount: number;
  pendingAmount: number;
  totalNumberOfExpenses: number;
  totalNumberOfApprovedExpenses: number;
  totalNumberOfPendingExpenses: number;
}
