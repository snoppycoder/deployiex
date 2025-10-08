import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { expensePolicyControllerCreate } from "~/api/gen/sdk.gen";
import type { CreateExpensePolicyDto } from "~/api/gen/types.gen";

export function useCreateExpensePolicyMutations() {
  return useMutation({
    mutationFn: async (payload: CreateExpensePolicyDto) => {
      return expensePolicyControllerCreate({ body: payload });
    },
    onSuccess: () => {
      toast("Successfully added the expense policy");
      return;
    },
    onError: (error) => {
      toast("Error while creating the expense policy");
      console.log(error);
      return;
    },
  });
}
