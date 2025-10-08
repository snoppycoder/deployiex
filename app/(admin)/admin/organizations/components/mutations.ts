import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	organizationControllerCreateOrganization,
	organizationControllerUpdateOrganization,
	organizationControllerDeleteOrganization,
	organizationControllerUpdateOrganizationStatus,
} from "~/api/gen/sdk.gen";
import type {
	CreateOrganizationDto,
	UpdateOrganizationDto,
} from "~/api/gen/types.gen";

export function useCreateOrganizationMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (body: CreateOrganizationDto) =>
			organizationControllerCreateOrganization({ body }),
		onSuccess: () => {
			toast.success("Organization created");
			onSuccess?.();
		},
		onError: (err: any) =>
			toast.error(err?.message || "Failed to create organization"),
	});
}

export function useUpdateOrganizationMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (payload: { id: string; body: UpdateOrganizationDto }) =>
			// Cast to any due to generated types marking `path` as never despite URL using {id}
			(organizationControllerUpdateOrganization as any)({
				path: { id: payload.id },
				body: payload.body,
			}),
		onSuccess: () => {
			toast.success("Organization updated");
			onSuccess?.();
		},
		onError: (err: any) =>
			toast.error(err?.message || "Failed to update organization"),
	});
}

export function useDeleteOrganizationMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (id: string) =>
			organizationControllerDeleteOrganization({ path: { id } }),
		onSuccess: () => {
			toast.success("Organization deleted");
			onSuccess?.();
		},
		onError: (err: any) =>
			toast.error(err?.message || "Failed to delete organization"),
	});
}

export function useUpdateOrganizationStatusMutation(onSuccess?: () => void) {
	return useMutation({
		mutationFn: async (id: string) =>
			// Cast to any due to generated types marking `path` as never despite URL using {id}
			(organizationControllerUpdateOrganizationStatus as any)({ path: { id } }),
		onSuccess: () => {
			toast.success("Organization status updated");
			onSuccess?.();
		},
		onError: (err: any) =>
			toast.error(err?.message || "Failed to update status"),
	});
}
