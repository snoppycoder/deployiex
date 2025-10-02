import {
	magicLinkClient,
	passkeyClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { use2faStore } from "@auth/ui/auth/2fa/store";
import { env } from "@/utils/env";

export const auth = createAuthClient({
	baseURL: env.API_URL,
	plugins: [
		usernameClient(),
		magicLinkClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				use2faStore.getState().setState({ verificationNeeded: true });
			},
		}),
		passkeyClient(),
	],
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
});
