"use client";

import React from "react";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
	QueryClient,
	QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	persistQueryClient,
	removeOldestQuery,
} from "@tanstack/react-query-persist-client";

import { client } from "~/api/gen/client.gen";
import { env } from "@/utils/env";
import { Toaster } from "sonner";
import Verify2FaCode from "@auth/ui/auth/2fa/2faVerificationModal";

client.setConfig({
	baseUrl: env.API_URL,
	credentials: "include",
});

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			gcTime: 1e4 * 60,
			retry: 3,
		},
		mutations: {
			retry: 0,
		},
	},
});

const PERSISTER_KEY = "UkVBQ1RfUVVFUll";

// Defer persister setup to the client to avoid `window is not defined` during SSR
function usePersistQueryClient() {
	React.useEffect(() => {
		if (typeof window === "undefined") return;
		const localStoragePersister = createAsyncStoragePersister({
			storage: window.localStorage,
			retry: removeOldestQuery,
			key: PERSISTER_KEY,
		});

		persistQueryClient({
			// @ts-ignore - type mismatch in persist client types
			queryClient,
			persister: localStoragePersister,
			dehydrateOptions: {
				shouldDehydrateQuery: (query) => query?.meta?.persist === true,
			},
		});
	}, []);
}

export function QueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const isDev = env.isDEV;
	usePersistQueryClient();
	return (
		<ReactQueryClientProvider client={queryClient}>
			{children}
			{/* Devtools only render on client; gated by env */}
			{isDev && (
				<ReactQueryDevtools
					initialIsOpen={false}
					buttonPosition="bottom-right"
				/>
			)}
			<Toaster />
			<Verify2FaCode />
		</ReactQueryClientProvider>
	);
}
