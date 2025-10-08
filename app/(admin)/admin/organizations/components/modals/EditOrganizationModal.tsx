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
import { updateOrganizationSchema } from "../schemas";
import { useUpdateOrganizationMutation } from "../mutations";
import { subscriptionPlans } from "../queries";
import type { OrganizationRow } from "../types";

const subscriptionOptions = [
	"active",
	"inactive",
	"canceled",
	"past_due",
] as const;

export function EditOrganizationModal({
	open,
	onOpenChange,
	organization,
	onSuccess,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	organization?: OrganizationRow | null;
	onSuccess?: () => void;
}) {
	const [name, setName] = useState(organization?.name ?? "");
	const [industry, setIndustry] = useState(organization?.industry ?? "");
	const [planName, setPlanName] = useState(organization?.planName ?? "");
	const [subscriptionStatus, setSubscriptionStatus] = useState<
		(typeof subscriptionOptions)[number]
	>(organization?.subscriptionStatus ?? "active");
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (open) {
			setName(organization?.name ?? "");
			setIndustry(organization?.industry ?? "");
			setPlanName(organization?.planName ?? "");
			setSubscriptionStatus(
				(organization?.subscriptionStatus as any) ?? "active"
			);
			setErrors({});
		}
	}, [open, organization]);

	const canSubmit = useMemo(() => !!organization?.id, [organization]);

	const { mutate: updateOrg, isPending } = useUpdateOrganizationMutation(() => {
		onOpenChange(false);
		onSuccess?.();
	});

	const handleSubmit = () => {
		setErrors({});
		const parsed = updateOrganizationSchema.safeParse({
			name,
			industry,
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
		if (!organization?.id) return;
		updateOrg({
			id: organization.id,
			body: { name, industry, planName, subscriptionStatus } as any,
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit Organization</DialogTitle>
					<DialogDescription>
						Update organization details below.
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
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
