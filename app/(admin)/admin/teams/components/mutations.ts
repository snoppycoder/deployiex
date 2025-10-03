import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { teamControllerCreate, teamControllerRemove } from "~/api/gen/sdk.gen";
import type { CreateTeamDto } from "~/api/gen/types.gen";

export function useCreateTeamMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (body: CreateTeamDto) => teamControllerCreate({ body }),
		onSuccess: () => {
			toast.success("Team created");
			onSuccess?.();
		},
		onError: (err: any) => toast.error(err?.message || "Failed to create team"),
	});
}

export function useDeleteTeamMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (id: string) => teamControllerRemove({ path: { id } }),
		onSuccess: () => {
			toast.success("Team deleted");
			onSuccess?.();
		},
		onError: (err: any) => toast.error(err?.message || "Failed to delete team"),
	});
}
