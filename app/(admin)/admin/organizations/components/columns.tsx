"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { OrganizationRow } from "./types";
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

export function getOrganizationColumns(handlers: {
	onEdit: (o: OrganizationRow) => void;
	onStatusToggle: (id: string) => void;
	onDelete: (id: string) => void;
}): ColumnDef<OrganizationRow>[] {
	const { onEdit, onStatusToggle, onDelete } = handlers;
	return [
		{
			accessorKey: "name",
			header: "Organization",
			cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
		},
		{
			accessorKey: "industry",
			header: "Industry",
			cell: ({ row }) => (
				<span className="text-sm">{row.original.industry}</span>
			),
		},
		{
			id: "owner",
			header: "Owner",
			cell: ({ row }) => (
				<span className="text-sm text-muted-foreground">
					{row.original.ownerName || "-"}
				</span>
			),
		},
		{
			id: "plan",
			header: "Plan",
			cell: ({ row }) => (
				<span className="text-sm text-muted-foreground">
					{row.original.planName || "-"}
				</span>
			),
		},
		{
			id: "subscription",
			header: "Subscription",
			cell: ({ row }) => (
				<Badge variant="secondary" className="text-xs">
					{row.original.subscriptionStatus ?? "-"}
				</Badge>
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
			id: "createdAt",
			header: "Created",
			cell: ({ row }) => (
				<span className="text-sm">
					{row.original.createdAt
						? new Date(row.original.createdAt).toLocaleDateString()
						: "-"}
				</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-right">Actions</div>,
			cell: ({ row }) => {
				const o = row.original;
				return (
					<div className="text-right">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => onEdit(o)}>
									<Edit className="h-4 w-4 mr-2" /> Edit
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => onStatusToggle(o.id)}>
									{o.status === "Active" ? "Suspend" : "Activate"}
								</DropdownMenuItem>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<DropdownMenuItem
											onSelect={(e) => e.preventDefault()}
											className="text-destructive"
										>
											<Trash2 className="h-4 w-4 mr-2" /> Delete
										</DropdownMenuItem>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the organization and related data.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => onDelete(o.id)}
												className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
											>
												Delete
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
