import { useQuery } from "@tanstack/react-query";
import { auth } from "@/lib/auth";
import { queryClient } from "@/providers/QueryClientProvider";

export const CURRENT_SESSION_QUERY_KEY = "current-user-session";

async function queryFn() {
	const { data, error } = await auth.getSession();
	if (error) {
		return Promise.reject(error);
	}

	// If there's no session data, return as is
	if (!data) {
		return data;
	}

	/**
	 * Obfuscate sensitive fields like `email`, `ipAddress` in persistent storage.
	 * Use `whoami` api to get such information
	 */
	const filteredData = {
		...data,
		user: {
			...data.user,
			email: "",
		},
		session: {
			...data.session,
			ipAddress: "",
		},
	};

	return filteredData;
}

function useCurrentSession() {
	const response = useQuery({
		queryKey: [CURRENT_SESSION_QUERY_KEY],
		queryFn,
		refetchOnMount: true,
		meta: {
			persist: true,
		},
	});

	return response;
}

export async function getCurrentSession(options?: {
	networkMode?: "online" | "cache-first" | "cache-only";
}) {
	const networkMode = options?.networkMode ?? "online";

	if (["cache-only", "cache-first"].includes(networkMode)) {
		const cachedData = queryClient.getQueryData([
			CURRENT_SESSION_QUERY_KEY,
		]) as Awaited<ReturnType<typeof queryFn>>;
		if (networkMode === "cache-only") {
			return cachedData;
		}
		if (networkMode === "cache-first" && cachedData) {
			return cachedData;
		}
	}

	return queryClient.fetchQuery({
		queryKey: [CURRENT_SESSION_QUERY_KEY],
		queryFn,
		retry: false,
		meta: {
			persist: true,
		},
	});
}

export default useCurrentSession;
