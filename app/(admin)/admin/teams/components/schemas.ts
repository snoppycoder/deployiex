import { z } from "zod";

export const createTeamSchema = z.object({
	name: z.string().min(2, "Team name is required"),
	organizationId: z.string().min(1, "Organization is required"),
});

export const updateTeamSchema = z.object({
	name: z.string().min(2, "Team name is required"),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
