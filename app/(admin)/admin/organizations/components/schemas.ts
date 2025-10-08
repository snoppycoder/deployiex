import { z } from "zod";

export const createOrganizationSchema = z.object({
	name: z.string().min(1, "Name is required"),
	industry: z.string().min(1, "Industry is required"),
	ownerId: z.string().min(1, "Owner is required"),
	planName: z.string().min(1, "Plan is required"),
	subscriptionStatus: z
		.enum(["active", "inactive", "canceled", "past_due"])
		.default("active"),
});

export const updateOrganizationSchema = z.object({
	name: z.string().optional(),
	industry: z.string().optional(),
	ownerId: z.string().optional(),
	planName: z.string().optional(),
	subscriptionStatus: z
		.enum(["active", "inactive", "canceled", "past_due"])
		.optional(),
});

export type CreateOrganizationForm = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationForm = z.infer<typeof updateOrganizationSchema>;
