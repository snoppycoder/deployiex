export type OrganizationRow = {
	id: string;
	name: string;
	industry: string;
	ownerName?: string;
	planName?: string;
	subscriptionStatus?: "active" | "inactive" | "canceled" | "past_due";
	status: "Active" | "Inactive";
	createdAt?: string;
};
