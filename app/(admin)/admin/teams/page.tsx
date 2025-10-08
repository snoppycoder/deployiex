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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Users } from "lucide-react";
import DataTable from "~/component/table";
import { getTeamColumns } from "./components/columns";
import { useOrganizationsForSelect, useTeams } from "./components/queries";
import { useDeleteTeamMutation } from "./components/mutations";
import type { TeamRow } from "./components/types";
import { CreateTeamModal } from "./components/modals/CreateTeamModal";

export default function TeamsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [organizationId, setOrganizationId] = useState<string>("all");
	const order: "asc" | "desc" = "asc";

	const { data, isLoading, refetch } = useTeams({
		page,
		limit,
		q: searchTerm || undefined,
		order,
		organizationId: organizationId === "all" ? undefined : organizationId,
	});
	const rows = data?.rows ?? [];
	const pagination = data?.pagination as any;

	useEffect(() => {
		setPage(1);
	}, [searchTerm, organizationId]);

	const { mutate: deleteTeam } = useDeleteTeamMutation(() => refetch());

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editing, setEditing] = useState<TeamRow | null>(null);

	const onDelete = (id: string) => deleteTeam(id);
	const onEdit = (t: TeamRow) => setEditing(t); // Edit modal TBD

	const { data: orgs = [] } = useOrganizationsForSelect();

	const displayRows = useMemo(() => {
		const nameById = new Map(orgs.map((o: any) => [String(o.id), o.name]));
		return rows.map((r) => ({
			...r,
			organizationName:
				(nameById.get(String(r.organizationId)) as string | undefined) ??
				undefined,
		}));
	}, [rows, orgs]);

	const columns = useMemo(() => getTeamColumns({ onEdit, onDelete }), []);

	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-2 text-sm text-muted-foreground">
				<span>Admin</span>
				<span>/</span>
				<span className="text-foreground">Teams</span>
			</div>

			<div>
				<h1 className="text-3xl font-bold text-foreground">Teams & Roles</h1>
				<p className="text-muted-foreground">
					Manage teams and roles across organizations
				</p>
			</div>

			<Tabs defaultValue="teams" className="space-y-6">
				<TabsList>
					<TabsTrigger value="teams">Teams</TabsTrigger>
					<TabsTrigger value="roles">Roles</TabsTrigger>
				</TabsList>

				<TabsContent value="teams" className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold">Teams</h2>
							<p className="text-sm text-muted-foreground">
								Manage teams and their members
							</p>
						</div>
						<Button onClick={() => setIsCreateOpen(true)}>
							<Plus className="h-4 w-4 mr-2" /> Add Team
						</Button>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5" /> Team List
							</CardTitle>
							<CardDescription>View and manage all teams</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 mb-4">
								<div className="relative flex-1 max-w-sm">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search teams..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
								<div className="w-full md:w-64">
									<Select
										value={organizationId}
										onValueChange={setOrganizationId}
									>
										<SelectTrigger>
											<SelectValue placeholder="Filter by organization" />
										</SelectTrigger>
										<SelectContent>
												<SelectItem value="all">All organizations</SelectItem>
											{orgs.map((o: any) => (
												<SelectItem key={o.id} value={o.id}>
													{o.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<DataTable columns={columns} data={displayRows} />
						</CardContent>
					</Card>

					<CreateTeamModal
						open={isCreateOpen}
						onOpenChange={setIsCreateOpen}
						onSuccess={() => refetch()}
					/>
				</TabsContent>

				<TabsContent value="roles">
					<Card>
						<CardHeader>
							<CardTitle>Roles</CardTitle>
							<CardDescription>
								Manage roles per organization and team
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Roles management will be implemented similarly.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
