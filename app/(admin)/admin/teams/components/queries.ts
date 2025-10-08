import { useQuery } from "@tanstack/react-query";
import {
	teamControllerFindAll,
	teamControllerFindByOrganization,
	teamControllerFindOne,
	organizationControllerFindAllOrganizations,
} from "~/api/gen/sdk.gen";
import type { TeamRow } from "./types";

// Fetch organizations for select (id + name)
export function useOrganizationsForSelect() {
	return useQuery({
		queryKey: ["orgs-select"],
		queryFn: async () =>
			(
				await organizationControllerFindAllOrganizations({
					query: { page: 1, limit: 50, order: "asc" },
				})
			).data,
		select: (res: any) => {
			const payload: any = res;
			const list = Array.isArray(payload?.data) ? payload.data : [];
			return list.map((o: any) => ({ id: String(o.id), name: o.name }));
		},
		staleTime: 30_000,
	});
}

// Teams list. If organizationId provided, use that endpoint with pagination and query; otherwise fetch all (non-paginated in spec).
export function useTeams(params: {
	page?: number;
	limit?: number;
	q?: string;
	order?: "asc" | "desc";
	organizationId?: string;
}) {
	const { page = 1, limit = 10, q, order = "asc", organizationId } = params;
	return useQuery({
		queryKey: ["teams", { page, limit, q, order, organizationId }],
		queryFn: async () => {
			if (organizationId) {
				return (
					await teamControllerFindByOrganization({
						path: { organizationId },
						query: { page, limit, q, order },
					})
				).data;
			}
			return (await teamControllerFindAll()).data;
		},
		select: (result: any) => {
			// When by organization: result is OffsetPaginatedDto with data: Array<OffsetPaginatedTeamDto>
			// Otherwise: could be array of TeamDto
			let rows: TeamRow[] = [];
			let pagination: any = undefined;
			if (Array.isArray(result)) {
				rows = (result as any[]).map((t: any) => ({
					id: String(t.id),
					name: t.name,
					organizationId: String(t.organizationId),
					createdAt: t.createdAt,
				}));
			} else if (result && typeof result === "object") {
				pagination = result.pagination ?? undefined;
				const pages = Array.isArray(result.data) ? result.data : [];
				const flatten = pages.flatMap((p: any) =>
					Array.isArray(p?.data) ? p.data : []
				);
				rows = flatten.map((t: any) => ({
					id: String(t.id),
					name: t.name,
					organizationId: String(t.organizationId),
					createdAt: t.createdAt,
				}));
			}
			return { rows, pagination } as { rows: TeamRow[]; pagination?: any };
		},
		staleTime: 15_000,
	});
}

export function useTeam(id?: string) {
	return useQuery({
		queryKey: ["team", id],
		enabled: !!id,
		queryFn: async () =>
			(await teamControllerFindOne({ path: { id: id as string } })).data,
		staleTime: 30_000,
	});
}
