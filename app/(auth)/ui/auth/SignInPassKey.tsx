import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import { getCurrentSession } from "@/hooks/useCurrentSession";
import { auth } from "@/lib/auth";

function SignInPassKey() {
	const [isSignInPending, setIsSignInPending] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

	const handleSignin = async () => {
		try {
			setIsSignInPending(true);
			const res = await auth.signIn.passkey();
			if (res?.error) {
				const message = res.error?.message ?? "Something went wrong...";
				toast.error(message);
				return;
			}
			await getCurrentSession({ networkMode: "online" });
			router.push(redirectTo);
		} catch (error: any) {
			toast.error(error?.message ?? "Something went wrong...");
		} finally {
			setIsSignInPending(false);
		}
	};

	return (
		<Button
			type="button"
			className="w-full"
			onClick={handleSignin}
			disabled={isSignInPending}
		>
			{isSignInPending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Signing in...
				</>
			) : (
				<>
					<Lock className="mr-2 h-4 w-4" />
					Sign in with Passkey
				</>
			)}
		</Button>
	);
}

export default SignInPassKey;
