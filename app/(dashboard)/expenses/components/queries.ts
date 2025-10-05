import { useQuery } from "@tanstack/react-query";
import { ExpenseInfo, ExpenseRow } from "./types";

export function useExpenseByUser(
  userId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["expensesByUser", userId],

    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/expense/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }
      return res.json();
    },
    enabled: !!userId,

    select: (data) => data as ExpenseRow[],
    staleTime: 1000 * 60 * 30,
  });
}
export function useExpenseInfoByUser(
  userId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["expenseInfo", userId],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/v1/expense/expenseInfo/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch expenses info of the user");
      }
      return res.json();
    },
    select: (data) => data as ExpenseInfo,
    enabled: !!userId,
    staleTime: 1000 * 60 * 30,
  });
}
