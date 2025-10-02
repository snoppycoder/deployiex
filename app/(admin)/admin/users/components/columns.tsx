"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { UserRow } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

export function getUserColumns(handlers: {
	onEdit: (u: UserRow) => void;
	onStatusToggle: (id: string) => void;
	onRemoveTeam: (userId: string, team: string) => void;
	onRemoveOrg: (userId: string, org: string) => void;
	onDelete: (id: string) => void;
}): ColumnDef<UserRow>[] {
	const { onEdit, onStatusToggle, onRemoveTeam, onRemoveOrg, onDelete } =
		handlers;
	return [
		{
			id: "user",
			header: "User",
			cell: ({ row }) => {
				const u = row.original;
				return (
					<div className="flex items-center space-x-3">
						<Avatar className="h-8 w-8">
							<AvatarImage src={u.avatar || "/placeholder.svg"} alt={u.name} />
							<AvatarFallback>{u.name?.charAt(0) || "U"}</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">{u.name}</div>
							<div className="text-sm text-muted-foreground">{u.email}</div>
						</div>
					</div>
				);
			},
		},
		{
			id: "roles",
			header: "Role(s)",
			cell: ({ row }) => (
				<div className="flex flex-wrap gap-1">
					{row.original.roles.map((r) => (
						<Badge key={r} variant="secondary" className="text-xs">
							{r}
						</Badge>
					))}
				</div>
			),
		},
		{
			id: "teams",
			header: "Team(s)",
			cell: ({ row }) =>
				row.original.teams.length === 0 ? (
					<span className="text-muted-foreground">-</span>
				) : (
					<div className="flex flex-wrap gap-1">
						{row.original.teams.map((t) => (
							<Badge key={t} variant="outline" className="text-xs">
								{t}
							</Badge>
						))}
					</div>
				),
		},
		{
			id: "organizations",
			header: "Organization(s)",
			cell: ({ row }) =>
				row.original.organizations.length === 0 ? (
					<span className="text-muted-foreground">-</span>
				) : (
					<div className="flex flex-wrap gap-1">
						{row.original.organizations.map((o) => (
							<Badge key={o} variant="default" className="text-xs">
								{o}
							</Badge>
						))}
					</div>
				),
		},
		{
			id: "status",
			header: "Status",
			cell: ({ row }) => (
				<Badge
					variant={row.original.status === "Active" ? "default" : "secondary"}
				>
					{row.original.status}
				</Badge>
			),
		},
		{
			id: "lastLogin",
			header: "Last Login",
			cell: ({ row }) => (
				<span className="text-sm">{row.original.lastLogin}</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-right">Actions</div>,
			cell: ({ row }) => {
				const u = row.original;
				return (
					<div className="text-right">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => onEdit(u)}>
									<Edit className="h-4 w-4 mr-2" /> Edit User
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => onStatusToggle(u.id)}>
									{u.status === "Active" ? "Suspend" : "Activate"}
								</DropdownMenuItem>
								{u.teams.length > 0 && (
									<DropdownMenuItem
										onClick={() => onRemoveTeam(u.id, u.teams[0])}
										className="text-orange-600"
									>
										Remove from Team
									</DropdownMenuItem>
								)}
								{u.organizations.length > 0 && (
									<DropdownMenuItem
										onClick={() => onRemoveOrg(u.id, u.organizations[0])}
										className="text-orange-600"
									>
										Remove from Org
									</DropdownMenuItem>
								)}
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<DropdownMenuItem
											onSelect={(e) => e.preventDefault()}
											className="text-destructive"
										>
											<Trash2 className="h-4 w-4 mr-2" /> Delete User
										</DropdownMenuItem>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the user account and all associated data.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => onDelete(u.id)}
												className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
											>
												Delete User
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];
}
