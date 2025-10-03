import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { expenseControllerCreate } from "~/api/gen/sdk.gen";

export function useCreateExpenseMutation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (payload: {
      amount: number;
      catagoryId: string;
      description: string;
      notes?: string;
      recieptFilePath: string;
      currency: string;
      userTeamId: string | null;
      organizationId: string;
      userId: string;
    }) => {
      return expenseControllerCreate({
        body: {
          amount: payload.amount,
          catagoryId: payload.catagoryId,
          description: payload.description,
          organizationId: payload.organizationId,
          date: new Date().toISOString(),
          userTeamId: payload.userTeamId,
          userId: payload.userId,
          currency: payload.currency,
          receiptUrl: payload.recieptFilePath,
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
