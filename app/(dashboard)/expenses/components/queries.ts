import { useQuery } from "@tanstack/react-query";
import { ExpenseRow } from "./types";

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
