import { useQuery } from "@tanstack/react-query";
import { ExpenseInfo, ExpenseRow } from "./types";
import {
  expenseControllerFindByUser,
  expenseControllerGetExpenseInfo,
} from "@/app/api/gen";

export function useExpenseByUser(
  userId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["expensesByUser", userId],

    queryFn: async () => {
      if (!userId) {
        throw Error("UserId is required");
      }
      return (await expenseControllerFindByUser({ path: { userId } })).data;
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
      if (!userId) {
        throw new Error("userId is required");
      }
      return (await expenseControllerGetExpenseInfo({ path: { userId } })).data;
    },
    select: (data) => data as ExpenseInfo,
    enabled: !!userId,
    staleTime: 1000 * 60 * 30,
  });
}
