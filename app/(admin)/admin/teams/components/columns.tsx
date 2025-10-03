"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { TeamRow } from "./types";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export function getTeamColumns(actions: {
	onEdit: (row: TeamRow) => void;
	onDelete: (id: string) => void;
}): ColumnDef<TeamRow>[] {
	return [
		{
			accessorKey: "name",
			header: "Team Name",
			cell: ({ row }) => (
				<span className="font-medium">{row.original.name}</span>
			),
		},
		{
			accessorKey: "organizationName",
			header: "Organization",
			cell: ({ row }) =>
				row.original.organizationName ?? row.original.organizationId,
		},
		{
			accessorKey: "createdAt",
			header: "Created",
			cell: ({ row }) =>
				row.original.createdAt
					? new Date(row.original.createdAt).toLocaleDateString()
					: "-",
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const t = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => actions.onEdit(t)}>
								<Pencil className="h-4 w-4 mr-2" /> Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => actions.onDelete(t.id)}
								className="text-destructive"
							>
								<Trash2 className="h-4 w-4 mr-2" /> Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
}
