"use client";

import { useWhoAmI } from "@/hooks/useWhoAmI";

export function UsernameDisplay() {
	const { data, isLoading, isError } = useWhoAmI();
	let username = "";
	if (isLoading) username = "Loading...";
	else if (isError) username = "Unknown";
	else if (data?.username) username = data.username;
	else username = "Unknown";

	return (
		<span
			className="font-medium text-sm text-muted-foreground"
			title={username}
		>
			{username}
		</span>
	);
}
