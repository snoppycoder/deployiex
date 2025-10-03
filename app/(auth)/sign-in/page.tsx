"use client";

import { Field, useForm } from "@tanstack/react-form";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { getCurrentSession } from "@/hooks/useCurrentSession";
import { prefetchWhoAmI } from "@/hooks/useWhoAmI";
import { use2faStore } from "@auth/ui/auth/2fa/store";
import GithubOAuth from "@auth/ui/auth/GithubOAuth";
import SignInMagicLink from "@auth/ui/auth/SignInMagicLink";
import SignInPassKey from "@auth/ui/auth/SignInPassKey";
import { auth } from "@/lib/auth";

const signInSchema = z.object({
	emailOrUsername: z.string().min(3),
	password: z.string().min(3),
});

type SignInSchema = z.infer<typeof signInSchema>;

type ViewHash = "email" | "magicLink" | "";

export default function SignIn() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [hash, setHash] = useState<ViewHash>("");

	const redirectTo = useMemo(() => {
		return searchParams.get("redirectTo") ?? "/dashboard";
	}, [searchParams]);

	const form = useForm({
		defaultValues: { emailOrUsername: "", password: "" } as SignInSchema,
		validators: {
			onSubmit: signInSchema,
		},
		async onSubmit({ value }) {
			const isEmail = z
				.string()
				.email()
				.safeParse(value.emailOrUsername).success;
			try {
				const { error, data } = await (isEmail
					? auth.signIn.email({
							email: value.emailOrUsername,
							password: value.password,
					  })
					: auth.signIn.username({
							username: value.emailOrUsername,
							password: value.password,
					  }));

				if (error) {
					toast.error(error?.message ?? "");
					return;
				}
				form.reset();

				if (data.token) {
					await getCurrentSession({ networkMode: "online" });
					// Prefetch whoami (non-persisted) for role/org data; ignore errors
					try {
						await prefetchWhoAmI();
					} catch {}
					router.push(redirectTo);
				}
				// Might have 2fa
			} catch (error: any) {
				toast.error(error?.message ?? "");
			}
		},
	});

	useEffect(() => {
		// Initialize from current URL hash on client
		if (typeof window === "undefined") return;
		const current = (window.location.hash.replace("#", "") || "") as ViewHash;
		if (current === "email" || current === "magicLink") setHash(current);
		else setHash("");
	}, []);

	useEffect(() => {
		const unregister = use2faStore.getState().onVerificationComplete(() => {
			router.push(redirectTo);
		});
		return () => {
			unregister();
		};
	}, [router, redirectTo]);

	const setUrlHash = (next: ViewHash) => {
		if (typeof window === "undefined") return;
		setHash(next);
		const url = new URL(window.location.href);
		if (!next) url.hash = "";
		else url.hash = `#${next}`;
		window.history.replaceState(null, "", url.toString());
	};

	return (
		<div className="min-h-screen w-full grid place-items-center px-4 py-8">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Welcome back</CardTitle>
					<CardDescription>Sign in to continue</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{hash === "email" ? (
						<>
							<form
								onSubmit={(evt) => {
									evt.preventDefault();
									form.handleSubmit();
								}}
								className="space-y-4"
							>
								<Field form={form} name="emailOrUsername">
									{({ state, handleChange }) => (
										<div className="space-y-1">
											<Input
												value={state.value}
												placeholder="Email or Username"
												onChange={(e) => handleChange(e.target.value)}
												aria-invalid={state.meta.errors.length > 0}
											/>
											{state.meta.errors.length > 0 && (
												<p className="text-sm text-destructive">
													{state.meta.errors.map((e) => e?.message).join(", ")}
												</p>
											)}
										</div>
									)}
								</Field>
								<Field form={form} name="password">
									{({ state, handleChange }) => (
										<div className="space-y-1">
											<Input
												value={state.value}
												type="password"
												placeholder="Password"
												onChange={(e) => handleChange(e.target.value)}
												aria-invalid={state.meta.errors.length > 0}
											/>
											{state.meta.errors.length > 0 && (
												<p className="text-sm text-destructive">
													{state.meta.errors.map((e) => e?.message).join(", ")}
												</p>
											)}
										</div>
									)}
								</Field>
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
											className="w-full"
											disabled={!canSubmit || !isDirty || isSubmitting}
										>
											{isSubmitting ? "Signing in..." : "Sign In"}
										</Button>
									)}
								</form.Subscribe>
							</form>
							<Link
								href="/forgot-password"
								className="w-full justify-end text-sm inline-flex"
							>
								Forgot Password?
							</Link>
						</>
					) : null}
					<div className="space-y-2">
						{!hash ? (
							<>
								<Button
									className="w-full"
									onClick={() => {
										setUrlHash("email");
									}}
								>
									Sign in with Email
								</Button>
								<GithubOAuth />
								<SignInPassKey />
							</>
						) : null}
						{!hash || hash === "magicLink" ? (
							<SignInMagicLink
								isFormVisible={hash === "magicLink"}
								onFormRequest={() => {
									setUrlHash("magicLink");
								}}
							/>
						) : null}
						{!hash ? (
							<Link
								href="/signup"
								className="text-sm mx-auto w-fit text-center block"
							>
								Sign Up?
							</Link>
						) : (
							<Button
								className="text-sm mx-auto w-fit text-center block mt-2"
								variant="ghost"
								onClick={() => {
									setUrlHash("");
								}}
							>
								{"< Back to Sign In"}
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
