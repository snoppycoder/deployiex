import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	authControllerAdminUpdateUser,
	userControllerDeleteUser,
	invitationControllerCreate,
} from "~/api/gen/sdk.gen";
import type { CreateInvitationDto } from "~/api/gen/types.gen";

export function useEditUserMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (payload: {
			id: string;
			email?: string;
			username?: string;
			firstName?: string;
			lastName?: string;
			password?: string;
			role?: "Admin" | "Owner" | "Staff";
		}) => {
			const { id, ...body } = payload;
			return authControllerAdminUpdateUser({ path: { id }, body: body as any });
		},
		onSuccess: () => {
			toast.success("User updated");
			onSuccess?.();
		},
		onError: (err: any) => {
			toast.error(err?.message || "Failed to update user");
		},
	});
}

export function useDeleteUserMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (id: string) =>
			userControllerDeleteUser({ path: { id } }),
		onSuccess: () => {
			toast.success("User deleted");
			onSuccess?.();
		},
		onError: (err: any) => {
			toast.error(err?.message || "Failed to delete user");
		},
	});
}

export function useCreateInvitationMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (
			payload: Omit<CreateInvitationDto, "status"> & {
				status?: CreateInvitationDto["status"];
			}
		) => {
			const body: CreateInvitationDto = {
				...payload,
				status: payload.status ?? "pending",
			} as CreateInvitationDto;
			return invitationControllerCreate({ body });
		},
		onSuccess: () => {
			toast.success("Invitation created");
			onSuccess?.();
		},
		onError: (err: any) => {
			toast.error(err?.message || "Failed to create invitation");
		},
	});
}
