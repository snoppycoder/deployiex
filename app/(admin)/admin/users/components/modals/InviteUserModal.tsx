"use client";

import { useMemo, useState } from "react";
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
import { Mail } from "lucide-react";
import useCurrentSession from "@/hooks/useCurrentSession";
import { toast } from "sonner";
import { inviteSchema } from "../schemas";
import {
	useOrganizations,
	useRolesByOrganization,
	useTeamsByOrganization,
} from "../queries";
import { useCreateInvitationMutation } from "../mutations";

export function InviteUserModal({
	open,
	onOpenChange,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSuccess?: () => void;
}) {
	const { data: organizations = [], isLoading: orgsLoading } =
		useOrganizations();
	const [email, setEmail] = useState("");
	const [organizationId, setOrganizationId] = useState<string>("");
	const [roleId, setRoleId] = useState<string>("");
	const [teamId, setTeamId] = useState<string>("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	const { data: roles = [], isLoading: rolesLoading } = useRolesByOrganization(
		organizationId,
		open && !!organizationId
	);
	const { data: teams = [], isLoading: teamsLoading } = useTeamsByOrganization(
		organizationId,
		open && !!organizationId
	);

	const canSubmit = useMemo(
		() => !!email && !!organizationId && !!roleId && !!teamId,
		[email, organizationId, roleId, teamId]
	);

	const { mutate: createInvitation, isPending } = useCreateInvitationMutation(
		() => {
			reset();
			onOpenChange(false);
			onSuccess?.();
		}
	);

	const { data: session } = useCurrentSession();

	const reset = () => {
		setEmail("");
		setOrganizationId("");
		setRoleId("");
		setTeamId("");
		setErrors({});
	};

	const handleSubmit = () => {
		setErrors({});
		const parsed = inviteSchema.safeParse({
			email,
			organizationId,
			roleId,
			teamId,
		});
		if (!parsed.success) {
			const errs: Record<string, string> = {};
			for (const e of parsed.error.issues)
				errs[e.path[0] as string] = e.message;
			setErrors(errs);
			return;
		}
		// Call API: /api/v1/invitation with status pending
		const invitedById = (session as any)?.user?.id as string | undefined;
		if (!invitedById) {
			toast.error(
				"Unable to determine current user. Please re-login and try again."
			);
			return;
		}
		createInvitation({
			teamId,
			email,
			roleId,
			invitedById,
			status: "pending",
		});
	};

	return (
		<Dialog open={open} onOpenChange={(v) => onOpenChange(v)}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Invite User</DialogTitle>
					<DialogDescription>
						Send an invitation to a new user to join the system.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="inv-email">Email</Label>
						<Input
							id="inv-email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email address"
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="inv-org">Organization</Label>
						<Select
							value={organizationId}
							onValueChange={(v) => {
								setOrganizationId(v);
								setRoleId("");
								setTeamId("");
							}}
						>
							<SelectTrigger id="inv-org">
								<SelectValue
									placeholder={
										orgsLoading
											? "Loading organizations…"
											: "Select organization"
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{organizations.map((o: any) => (
									<SelectItem key={o.id} value={o.id}>
										{o.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.organizationId && (
							<p className="text-sm text-destructive">
								{errors.organizationId}
							</p>
						)}
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="grid gap-2">
							<Label>Role</Label>
							<Select
								value={roleId}
								disabled={!organizationId || rolesLoading || roles.length === 0}
								onValueChange={setRoleId}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											!organizationId
												? "Select organization first"
												: rolesLoading
												? "Loading roles…"
												: roles.length === 0
												? "No roles available"
												: "Select role"
										}
									/>
								</SelectTrigger>
								<SelectContent>
									{roles.map((r: any) => (
										<SelectItem key={r.id} value={r.id}>
											{r.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.roleId && (
								<p className="text-sm text-destructive">{errors.roleId}</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label>Team</Label>
							<Select
								value={teamId}
								disabled={!organizationId || teamsLoading || teams.length === 0}
								onValueChange={setTeamId}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											!organizationId
												? "Select organization first"
												: teamsLoading
												? "Loading teams…"
												: teams.length === 0
												? "No teams available"
												: "Select team"
										}
									/>
								</SelectTrigger>
								<SelectContent>
									{teams.map((t: any) => (
										<SelectItem key={t.id} value={t.id}>
											{t.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.teamId && (
								<p className="text-sm text-destructive">{errors.teamId}</p>
							)}
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={!canSubmit || isPending}>
						<Mail className="h-4 w-4 mr-2" />
						{isPending ? "Sending…" : "Send Invite"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
