import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().min(0, "Amount must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  // description: z
  //   .string()
  //   .min(1, "Description is required")
  //   .max(255, "Description must be less than 255 characters"),
  // recieptFilePath: z.string().url("Receipt file path must be a valid URL"),
  // recieptFilePath: z.file("This field should be a file object").nullable(),
  recieptFilePath: z.string(),
  currency: z.string().min(1, "Currency is required"),
  userTeamId: z.string().nullable(),
  organizationId: z.string().min(1, "Organization ID is required"),
  userId: z.string().min(1, "User ID is required"),
});
export type expenseForm = z.infer<typeof createExpenseSchema>;
