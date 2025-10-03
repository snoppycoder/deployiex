"use client";

import { useEffect, useMemo, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Plus, Search } from "lucide-react";
import DataTable from "~/component/table";
import { getOrganizationColumns } from "./components/columns";
import { useOrganizations } from "./components/queries";
import {
	useDeleteOrganizationMutation,
	useUpdateOrganizationStatusMutation,
} from "./components/mutations";
import type { OrganizationRow } from "./components/types";
import { CreateOrganizationModal } from "./components/modals/CreateOrganizationModal";
import { EditOrganizationModal } from "./components/modals/EditOrganizationModal";

export default function OrganizationsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const order: "asc" | "desc" = "asc";

	const { data, isLoading, refetch } = useOrganizations({
		page,
		limit,
		q: searchTerm || undefined,
		order,
	});
	const rows = data?.rows ?? [];
	const pagination = data?.pagination as any;

	// Reset to first page when search changes
	useEffect(() => {
		setPage(1);
	}, [searchTerm]);

	const { mutate: deleteOrg } = useDeleteOrganizationMutation(() => refetch());
	const { mutate: toggleStatus } = useUpdateOrganizationStatusMutation(() =>
		refetch()
	);

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editing, setEditing] = useState<OrganizationRow | null>(null);

	const onDelete = (id: string) => deleteOrg(id);
	const onStatusToggle = (id: string) => toggleStatus(id);
	const onEdit = (o: OrganizationRow) => setEditing(o);

	const columns = useMemo(
		() => getOrganizationColumns({ onEdit, onStatusToggle, onDelete }),
		[]
	);

	return (
		<div className="space-y-6">
			{/* Breadcrumb */}
			<div className="flex items-center space-x-2 text-sm text-muted-foreground">
				<span>Admin</span>
				<span>/</span>
				<span className="text-foreground">Organizations</span>
			</div>

			{/* Page header */}
			<div className="flex md:items-center md:flex-row flex-col md:justify-between">
				<div>
					<h1 className="text-3xl font-bold text-foreground">Organizations</h1>
					<p className="text-muted-foreground">
						Manage organizations and their settings
					</p>
				</div>
				<div>
					<Button
						className="mt-2 md:mt-0"
						onClick={() => setIsCreateOpen(true)}
					>
						<Plus className="h-4 w-4 mr-2" /> Add Organization
					</Button>
				</div>
			</div>

			{/* Search */}
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Building2 className="h-5 w-5" /> Organization List
					</CardTitle>
					<CardDescription>
						View and manage all organizations in the system
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-2 mb-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search organizations..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>

					{/* Table */}
					<DataTable columns={columns} data={rows} />
					{/* TODO: add pagination controls using pagination info */}
				</CardContent>
			</Card>

			{/* Modals */}
			<CreateOrganizationModal
				open={isCreateOpen}
				onOpenChange={setIsCreateOpen}
				onSuccess={() => refetch()}
			/>
			<EditOrganizationModal
				open={!!editing}
				onOpenChange={(v) => !v && setEditing(null)}
				organization={editing}
				onSuccess={() => refetch()}
			/>
		</div>
	);
}
