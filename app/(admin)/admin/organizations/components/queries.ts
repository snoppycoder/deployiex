import { useQuery } from "@tanstack/react-query";
import {
	organizationControllerFindAllOrganizations,
	organizationControllerFindOrganization,
	userControllerFindAllUsersWithRelations,
} from "~/api/gen/sdk.gen";
import type { OrganizationRow } from "./types";

export function useOrganizations(params: {
	page: number;
	limit: number;
	q?: string;
	order?: "asc" | "desc";
}) {
	const { page, limit, q, order = "asc" } = params;
	return useQuery({
		queryKey: ["organizations", { page, limit, q, order }],
		queryFn: async () =>
			(
				await organizationControllerFindAllOrganizations({
					query: { page, limit, q, order },
				})
			).data,
		select: (result: any) => {
			const payload = result as any;
			const list = Array.isArray(payload?.data) ? payload.data : [];
			const pagination = payload?.pagination ?? undefined;
			const rows: OrganizationRow[] = list.map((o: any) => ({
				id: String(o.id),
				name: o.name,
				industry: o.industry,
				ownerName: o.owner?.name ?? undefined,
				planName: o.planName,
				subscriptionStatus: o.subscriptionStatus,
				status: o.isActive ? "Active" : "Inactive",
				createdAt: o.createdAt,
			}));
			return { rows, pagination } as {
				rows: OrganizationRow[];
				pagination?: any;
			};
		},
		staleTime: 30_000,
	});
}

export function useOrganization(id?: string) {
	return useQuery({
		queryKey: ["organization", id],
		enabled: !!id,
		queryFn: async () =>
			(
				await organizationControllerFindOrganization({
					path: { id: id as string },
				})
			).data,
		staleTime: 30_000,
	});
}

// Owners (role=Owner) selector data
export function useOwnerUsers(options?: { enabled?: boolean }) {
	const enabled = options?.enabled ?? true;
	return useQuery({
		queryKey: ["owner-users"],
		enabled,
		queryFn: async () =>
			(
				await userControllerFindAllUsersWithRelations({
					query: { role: "Owner", limit: 50, page: 1 },
				})
			).data,
		select: (result: any) => {
			const payload: any = result;
			// normalize list similar to users page mapping
			let list: any[] = [];
			if (Array.isArray(payload?.data?.data)) {
				list = payload.data.data.flatMap((p: any) => p?.data ?? []);
			} else if (Array.isArray(payload?.data)) {
				list = payload.data;
			}
			// return items with id+name for selects
			return list
				.map((u: any) => ({
					id: String(u.id),
					name:
						u.username ||
						`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() ||
						u.email,
				}))
				.filter((u: any) => !!u.id && !!u.name);
		},
		staleTime: 30_000,
	});
}

export const subscriptionPlans = [
	{ label: "Basic", value: "basic" },
	{ label: "Standard", value: "standard" },
	{ label: "Enterprise", value: "enterprise" },
];
