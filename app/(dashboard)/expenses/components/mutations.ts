import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { expenseControllerCreate } from "~/api/gen/sdk.gen";

export function useCreateExpenseMutation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (payload: {
      amount: number;
      categoryId: string;
      date: string;
      description?: string;
      notes?: string;
      currency: string;
      userTeamId: string | null;
      organizationId?: string | null;
      userId: string;
      receiptFile?: string | null;
    }) => {
      return expenseControllerCreate({
        body: {
          amount: payload.amount,
          categoryId: payload.categoryId,
          // description: payload.description,
          organizationId: payload.organizationId ?? null,
          date: payload.date,
          userTeamId: payload.userTeamId,
          userId: payload.userId,
          currency: payload.currency,
          receiptUrl: payload.receiptFile as string,
          status: "draft",
        },
      });
    },
    onSuccess: () => {
      toast.success("Expense created");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Error creating expense");
      console.error(error);
    },
  });
}
