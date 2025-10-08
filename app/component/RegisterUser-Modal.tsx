"use client";

import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { authControllerRegister } from "~/api/gen/sdk.gen";
import { toast } from "sonner";

type Role = "Admin" | "Owner" | "Staff";

export function RegisterUserModal({
	open,
	onOpenChange,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSuccess?: () => void;
}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [role, setRole] = useState<Role>("Staff");

	const reset = () => {
		setEmail("");
		setPassword("");
		setUsername("");
		setFirstName("");
		setLastName("");
		setRole("Staff");
	};

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			if (!email || !password)
				throw new Error("Email and password are required");
			return authControllerRegister({
				body: {
					email,
					password,
					username: username || undefined,
					firstName: firstName || undefined,
					lastName: lastName || undefined,
					role,
				},
			});
		},
		onSuccess: () => {
			toast.success("User registered");
			reset();
			onOpenChange(false);
			onSuccess?.();
		},
		onError: (err: any) => {
			const msg = err?.message || "Registration failed";
			toast.error(msg);
		},
	});

	const onSubmit = async () => {
		try {
			await mutateAsync();
		} catch {}
	};

	return (
		<Dialog open={open} onOpenChange={(v) => !isPending && onOpenChange(v)}>
			<DialogContent className="sm:max-w-[520px]">
				<DialogHeader>
					<DialogTitle>Register User</DialogTitle>
					<DialogDescription>
						Create a new account with a chosen role.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="reg-email">Email</Label>
						<Input
							id="reg-email"
							type="email"
							placeholder="user@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={isPending}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="reg-password">Password</Label>
						<Input
							id="reg-password"
							type="password"
							placeholder="Minimum 6 characters"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={isPending}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="reg-username">Username (optional)</Label>
						<Input
							id="reg-username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							disabled={isPending}
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="reg-first">First name (optional)</Label>
							<Input
								id="reg-first"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								disabled={isPending}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="reg-last">Last name (optional)</Label>
							<Input
								id="reg-last"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								disabled={isPending}
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="reg-role">Role</Label>
						<Select value={role} onValueChange={(v) => setRole(v as Role)}>
							<SelectTrigger id="reg-role">
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">Admin</SelectItem>
								<SelectItem value="Owner">Owner</SelectItem>
								<SelectItem value="Staff">Staff</SelectItem>
							</SelectContent>
						</Select>
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
					<Button
						onClick={onSubmit}
						disabled={isPending || !email || !password}
					>
						{isPending ? "Registering..." : "Register"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
