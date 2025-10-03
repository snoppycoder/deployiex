"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createTeamSchema } from "../schemas";
import { useCreateTeamMutation } from "../mutations";
import { useOrganizationsForSelect } from "../queries";

export function CreateTeamModal({
	open,
	onOpenChange,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSuccess?: () => void;
}) {
	const [name, setName] = useState("");
	const [organizationId, setOrganizationId] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (!open) {
			setName("");
			setOrganizationId("");
			setErrors({});
		}
	}, [open]);

	const { data: orgs = [], isLoading: orgsLoading } =
		useOrganizationsForSelect();

	const canSubmit = useMemo(
		() => name && organizationId,
		[name, organizationId]
	);

	const { mutate: createTeam, isPending } = useCreateTeamMutation(() => {
		onOpenChange(false);
		onSuccess?.();
	});

	const handleSubmit = () => {
		setErrors({});
		const parsed = createTeamSchema.safeParse({ name, organizationId });
		if (!parsed.success) {
			const errs: Record<string, string> = {};
			for (const e of parsed.error.issues)
				errs[e.path[0] as string] = e.message;
			setErrors(errs);
			return;
		}
		createTeam({ name, organizationId });
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create Team</DialogTitle>
					<DialogDescription>
						Add a new team to an organization.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="team-name">Team Name</Label>
						<Input
							id="team-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter team name"
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label>Organization</Label>
						<Select value={organizationId} onValueChange={setOrganizationId}>
							<SelectTrigger>
								<SelectValue
									placeholder={
										orgsLoading
											? "Loading organizations…"
											: "Select organization"
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{orgs.map((o: any) => (
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
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={!canSubmit || isPending}>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
