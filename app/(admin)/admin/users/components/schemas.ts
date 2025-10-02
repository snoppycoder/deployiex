import { z } from "zod";

export const inviteSchema = z.object({
	email: z.string().email("Enter a valid email"),
	organizationId: z.string().min(1, "Organization is required"),
	roleId: z.string().min(1, "Role is required"),
	teamId: z.string().min(1, "Team is required"),
});

export const editUserSchema = z.object({
	name: z.string().optional(),
	email: z
		.string()
		.email("Enter a valid email")
		.or(z.literal("").transform(() => undefined))
		.optional(),
	username: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	role: z.enum(["Admin", "Owner", "Staff"]).optional(),
});

export type InviteForm = z.infer<typeof inviteSchema>;
export type EditUserForm = z.infer<typeof editUserSchema>;
