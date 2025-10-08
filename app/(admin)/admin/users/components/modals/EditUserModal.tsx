"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { editUserSchema } from "../schemas";
import type { UserRow } from "../types";
import { useEditUserMutation } from "../mutations";

export function EditUserModal({
	open,
	onOpenChange,
	user,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	user: UserRow | null;
	onSuccess?: () => void;
}) {
	const [form, setForm] = useState({
		name: "",
		email: "",
		username: "",
		firstName: "",
		lastName: "",
		role: "" as "Admin" | "Owner" | "Staff" | "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const { mutate, isPending } = useEditUserMutation(onSuccess);

	useEffect(() => {
		if (user) {
			setForm({
				name: user.name || "",
				email: user.email || "",
				username: user.username || "",
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				role: (user.roles?.[0] as any) || "",
			});
			setErrors({});
		}
	}, [user]);

	const onSubmit = () => {
		setErrors({});
		const parsed = editUserSchema.safeParse(form);
		if (!parsed.success) {
			const errs: Record<string, string> = {};
			for (const e of parsed.error.issues)
				errs[e.path[0] as string] = e.message;
			setErrors(errs);
			return;
		}
		if (!user) return;
		const role =
			form.role === "Admin" || form.role === "Owner" || form.role === "Staff"
				? form.role
				: undefined;
		mutate({
			id: user.id,
			email: form.email || undefined,
			username: form.username || undefined,
			firstName: form.firstName || undefined,
			lastName: form.lastName || undefined,
			role,
		});
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={(v) => !isPending && onOpenChange(v)}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
					<DialogDescription>
						Update user details and assignments.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="edit-name">Name</Label>
						<Input
							id="edit-name"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							placeholder="Enter user name"
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="edit-email">Email</Label>
						<Input
							id="edit-email"
							type="email"
							value={form.email}
							onChange={(e) => setForm({ ...form, email: e.target.value })}
							placeholder="Enter email address"
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="edit-username">Username</Label>
						<Input
							id="edit-username"
							value={form.username}
							onChange={(e) => setForm({ ...form, username: e.target.value })}
							placeholder="Enter username"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="edit-firstname">First name</Label>
						<Input
							id="edit-firstname"
							value={form.firstName}
							onChange={(e) => setForm({ ...form, firstName: e.target.value })}
							placeholder="Enter first name"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="edit-lastname">Last name</Label>
						<Input
							id="edit-lastname"
							value={form.lastName}
							onChange={(e) => setForm({ ...form, lastName: e.target.value })}
							placeholder="Enter last name"
						/>
					</div>
					<div className="grid gap-2">
						<Label>Role</Label>
						<Select
							value={form.role}
							onValueChange={(v) => setForm({ ...form, role: v as any })}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">Admin</SelectItem>
								<SelectItem value="Owner">Owner</SelectItem>
								<SelectItem value="Staff">Staff</SelectItem>
							</SelectContent>
						</Select>
						{errors.role && (
							<p className="text-sm text-destructive">{errors.role}</p>
						)}
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isPending}
					>
						Cancel
					</Button>
					<Button onClick={onSubmit} disabled={isPending}>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
