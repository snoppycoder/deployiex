import Navbar from "../component/navbar";
import { RequireAuth } from "@/utils/router/before-load";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<RequireAuth>
			<div className="min-h-screen w-full flex flex-col md:flex-row">
				<aside className="w-full md:w-64 md:min-h-screen border-r border-gray-300">
					<Navbar />
				</aside>
				<main className="flex-1">{children}</main>
			</div>
		</RequireAuth>
	);
}
