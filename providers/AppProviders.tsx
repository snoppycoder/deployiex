"use client";

import React from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { AuthProvider } from "@/context/AuthContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
}

export default AppProviders;
