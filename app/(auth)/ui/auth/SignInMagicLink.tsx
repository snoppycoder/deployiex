import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type SignInMagicLinkProps = {
	isFormVisible?: boolean;
	onFormRequest?: () => void;
};

const signInSchema = z.object({
	email: z.string().email(),
});

type SignInSchema = z.infer<typeof signInSchema>;

function SignInMagicLink({
	isFormVisible,
	onFormRequest,
}: SignInMagicLinkProps) {
	const navigate = useNavigate();
	const [alertOpen, setAlertOpen] = useState(false);

	const form = useForm({
		defaultValues: { email: "" } as SignInSchema,
		validators: {
			onSubmit: signInSchema,
		},
		async onSubmit({ value }) {
			try {
				const { error } = await auth.signIn.magicLink({
					email: value.email,
					callbackURL: window.location.origin,
				});
				if (error) {
					toast.error(error?.message ?? "");
					return;
				}
				setAlertOpen(true);
			} catch (error: any) {
				toast.error(error?.message ?? "");
			}
		},
	});

	return (
		<>
			{isFormVisible ? (
				<form
					onSubmit={(evt) => {
						evt.preventDefault();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					<form.Field name="email">
						{({ state, handleChange }) => (
							<div className="space-y-2">
								<Input
									type="email"
									value={state.value}
									placeholder="Email"
									onChange={(e) => handleChange(e.target.value)}
									aria-invalid={state.meta.errors.length > 0}
								/>
								{state.meta.errors.length > 0 ? (
									<p className="text-sm text-destructive">
										{state.meta.errors.map((e) => e?.message).join(", ")}
									</p>
								) : null}
							</div>
						)}
					</form.Field>
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							isSubmitting: state.isSubmitting,
							isDirty: state.isDirty,
						})}
					>
						{({ canSubmit, isSubmitting, isDirty }) => (
							<Button
								type="submit"
								className="w-full py-2 rounded-xl"
								disabled={!canSubmit || !isDirty || isSubmitting}
							>
								{isSubmitting ? "Sending..." : "Send Magic Link"}
							</Button>
						)}
					</form.Subscribe>
				</form>
			) : (
				<Button
					type="button"
					className="w-full"
					onClick={() => {
						onFormRequest?.();
					}}
				>
					<LinkIcon className="mr-2 h-4 w-4" />
					Sign in with Magic Link
				</Button>
			)}
			<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Check your inbox</AlertDialogTitle>
						<AlertDialogDescription>
							We've sent you a magic link. Please use that link from your inbox
							to sign in.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction
							onClick={() => {
								setAlertOpen(false);
								form.reset();
								navigate({ to: "/signin" });
							}}
							className="w-full"
						>
							OK
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export default SignInMagicLink;
