import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { auth } from "@/lib/auth";

function GithubOAuth() {
	const handleSignin = async () => {
		await auth.signIn.social({
			provider: "github",
			errorCallbackURL: `${window.location.origin}/signin`,
			callbackURL: window.location.origin,
		});
	};
	return (
		<Button type="button" className="w-full" onClick={handleSignin}>
			<Github className="mr-2 h-4 w-4" />
			Continue with GitHub
		</Button>
	);
}

export default GithubOAuth;
