import { useQuery } from "@tanstack/react-query";
import {
	organizationControllerFindAllOrganizations,
	teamControllerFindByOrganization,
	roleControllerFindByOrganization,
	userControllerFindAllUsersWithRelations,
} from "~/api/gen/sdk.gen";
import type { UserRow } from "./types";

export function useOrganizations() {
	return useQuery({
		queryKey: ["organizations"],
		queryFn: async () =>
			(await organizationControllerFindAllOrganizations()).data,
		select: (result: any) => {
			const payload: any = result as any;
			let list: any[] = [];
			if (Array.isArray(payload?.data)) list = payload.data;
			else if (Array.isArray(payload)) list = payload;
			else if (Array.isArray(payload?.data?.data)) list = payload.data.data;
			return list
				.map((o: any) =>
					o && typeof o === "object"
						? { id: String(o.id), name: o.name ?? "Unnamed" }
						: null
				)
				.filter(Boolean);
		},
		staleTime: 60_000,
	});
}

export function useTeamsByOrganization(
	organizationId?: string | null,
	enabled?: boolean
) {
	return useQuery({
		queryKey: ["teamsByOrg", organizationId],
		enabled: !!organizationId && !!enabled,
		queryFn: async () =>
			(
				await teamControllerFindByOrganization({
					path: { organizationId: organizationId as string },
				})
			).data,
		select: (result: any) => {
			const payload: any = result as any;
			let list: any[] = [];
			if (Array.isArray(payload?.data)) list = payload.data;
			else if (Array.isArray(payload)) list = payload;
			else if (Array.isArray(payload?.data?.data)) list = payload.data.data;
			return list
				.map((t: any) =>
					t && typeof t === "object"
						? { id: String(t.id), name: t.name ?? "Unnamed" }
						: null
				)
				.filter(Boolean);
		},
		staleTime: 60_000,
	});
}

export function useRolesByOrganization(
	organizationId?: string | null,
	enabled?: boolean
) {
	return useQuery({
		queryKey: ["rolesByOrg", organizationId],
		enabled: !!organizationId && !!enabled,
		queryFn: async () =>
			(
				await roleControllerFindByOrganization({
					path: { organizationId: organizationId as string },
				})
			).data,
		select: (result: any) => {
			const payload: any = result as any;
			let list: any[] = [];
			if (Array.isArray(payload?.data)) list = payload.data;
			else if (Array.isArray(payload)) list = payload;
			else if (Array.isArray(payload?.data?.data)) list = payload.data.data;
			return list
				.map((r: any) =>
					r && typeof r === "object"
						? { id: String(r.id), name: r.name ?? "Unnamed" }
						: null
				)
				.filter(Boolean);
		},
		staleTime: 60_000,
	});
}

export function useUsersWithRelations(params: {
	page: number;
	limit: number;
	order: "asc" | "desc";
	q?: string;
	organizationId?: string;
	teamId?: string;
	role?: "Admin" | "Owner" | "Staff";
	status?: boolean;
}) {
	const { page, limit, order, q, organizationId, teamId, role, status } =
		params;
	return useQuery({
		queryKey: [
			"users",
			{ page, limit, order, q, organizationId, teamId, role, status },
		],
		queryFn: async () =>
			(
				await userControllerFindAllUsersWithRelations({
					query: {
						page,
						limit,
						order,
						q,
						organizationId,
						teamId,
						role,
						status,
					},
				})
			).data,
		meta: { persist: true },
		select: (result: any) => {
			const payload: any = result as any;
			let list: any[] = [];
			let pagination: any = undefined;
			if (Array.isArray(payload?.data?.data)) {
				list = payload.data.data.flatMap((p: any) => p?.data ?? []);
				pagination =
					payload.data.data[0]?.pagination ?? payload?.data?.pagination;
			} else if (Array.isArray(payload?.data)) {
				list = payload.data;
				pagination = payload?.pagination ?? payload?.data?.pagination;
			}
			const rows: UserRow[] = list.map((u: any) => {
				const teamRoles = Array.isArray(u.userTeamRoles) ? u.userTeamRoles : [];
				const teams = teamRoles
					.map((tr: any) => tr?.team?.name)
					.filter(Boolean) as string[];
				const orgsFromTeams = teamRoles
					.map((tr: any) => tr?.team?.organization?.name)
					.filter(Boolean) as string[];
				const orgsOwned = Array.isArray(u.organizationsOwned)
					? (u.organizationsOwned
							.map((o: any) => o?.name)
							.filter(Boolean) as string[])
					: [];
				const organizations = Array.from(
					new Set([...orgsFromTeams, ...orgsOwned])
				);
				const rolesTop = typeof u.role === "string" ? [u.role] : [];
				const rolesTeam = teamRoles
					.map((tr: any) => tr?.role?.name)
					.filter(Boolean) as string[];
				const roles = Array.from(new Set([...rolesTop, ...rolesTeam]));
				return {
					id: u.id,
					name:
						u.username ||
						`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() ||
						u.email,
					email: u.email,
					username: u.username ?? "",
					firstName: u.firstName ?? "",
					lastName: u.lastName ?? "",
					roles,
					teams: Array.from(new Set(teams)),
					organizations,
					status: u.isActive ? "Active" : "Inactive",
					lastLogin: "-",
					avatar: u.image || "/placeholder.svg?height=32&width=32",
				} as UserRow;
			});
			const total = pagination?.total ?? pagination?.itemCount ?? undefined;
			const currentPage =
				pagination?.page ?? pagination?.currentPage ?? undefined;
			const perPage = pagination?.limit ?? pagination?.perPage ?? undefined;
			const totalPages =
				pagination?.totalPages ??
				(total && perPage ? Math.ceil(total / perPage) : undefined);
			return {
				rows,
				pagination: { total, page: currentPage, limit: perPage, totalPages },
			};
		},
		staleTime: 30_000,
	});
}
