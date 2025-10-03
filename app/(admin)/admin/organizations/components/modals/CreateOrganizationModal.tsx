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
import { createOrganizationSchema } from "../schemas";
import { useCreateOrganizationMutation } from "../mutations";
import useCurrentSession from "@/hooks/useCurrentSession";
import { subscriptionPlans, useOwnerUsers } from "../queries";

const subscriptionOptions = [
	"active",
	"inactive",
	"canceled",
	"past_due",
] as const;

export function CreateOrganizationModal({
	open,
	onOpenChange,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSuccess?: () => void;
}) {
	const [name, setName] = useState("");
	const [industry, setIndustry] = useState("");
	const [ownerId, setOwnerId] = useState("");
	const [planName, setPlanName] = useState("");
	const [subscriptionStatus, setSubscriptionStatus] =
		useState<(typeof subscriptionOptions)[number]>("active");
	const [errors, setErrors] = useState<Record<string, string>>({});

	const { data: session } = useCurrentSession();
	const createdById = (session as any)?.user?.id as string | undefined;

	useEffect(() => {
		if (!open) {
			setName("");
			setIndustry("");
			setOwnerId("");
			setPlanName("");
			setSubscriptionStatus("active");
			setErrors({});
		}
	}, [open]);

	const { data: owners = [], isLoading: ownersLoading } = useOwnerUsers({
		enabled: open,
	});

	const canSubmit = useMemo(
		() =>
			name &&
			industry &&
			ownerId &&
			planName &&
			subscriptionStatus &&
			createdById,
		[name, industry, ownerId, planName, subscriptionStatus, createdById]
	);

	const { mutate: createOrg, isPending } = useCreateOrganizationMutation(() => {
		onOpenChange(false);
		onSuccess?.();
	});

	const handleSubmit = () => {
		setErrors({});
		const parsed = createOrganizationSchema.safeParse({
			name,
			industry,
			ownerId,
			planName,
			subscriptionStatus,
		});
		if (!parsed.success) {
			const errs: Record<string, string> = {};
			for (const e of parsed.error.issues)
				errs[e.path[0] as string] = e.message;
			setErrors(errs);
			return;
		}
		if (!createdById) return;
		createOrg({
			name,
			industry,
			ownerId,
			planName,
			subscriptionStatus,
			createdById,
		} as any);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create Organization</DialogTitle>
					<DialogDescription>
						Fill in the details to create a new organization.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="org-name">Name</Label>
						<Input
							id="org-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Organization name"
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label>Industry</Label>
						<Select value={industry} onValueChange={setIndustry}>
							<SelectTrigger>
								<SelectValue placeholder="Select industry" />
							</SelectTrigger>
							<SelectContent>
								{[
									"Technology",
									"Marketing",
									"Finance",
									"Healthcare",
									"Manufacturing",
									"Retail",
									"Education",
								].map((ind) => (
									<SelectItem key={ind} value={ind}>
										{ind}
									</SelectItem>
								))}
								<SelectItem value="Other">Other</SelectItem>
							</SelectContent>
						</Select>
						{errors.industry && (
							<p className="text-sm text-destructive">{errors.industry}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label>Owner</Label>
						<Select value={ownerId} onValueChange={setOwnerId}>
							<SelectTrigger>
								<SelectValue
									placeholder={
										ownersLoading ? "Loading owners…" : "Select owner"
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{owners.map((u: any) => (
									<SelectItem key={u.id} value={u.id}>
										{u.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.ownerId && (
							<p className="text-sm text-destructive">{errors.ownerId}</p>
						)}
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="grid gap-2">
							<Label>Plan</Label>
							<Select value={planName} onValueChange={setPlanName}>
								<SelectTrigger>
									<SelectValue placeholder="Select plan" />
								</SelectTrigger>
								<SelectContent>
									{subscriptionPlans.map((p) => (
										<SelectItem key={p.value} value={p.value}>
											{p.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.planName && (
								<p className="text-sm text-destructive">{errors.planName}</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label>Subscription Status</Label>
							<Select
								value={subscriptionStatus}
								onValueChange={(v) => setSubscriptionStatus(v as any)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									{subscriptionOptions.map((opt) => (
										<SelectItem key={opt} value={opt}>
											{opt}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.subscriptionStatus && (
								<p className="text-sm text-destructive">
									{errors.subscriptionStatus}
								</p>
							)}
						</div>
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
