import { GuestOnly } from "@/utils/router/before-load";
export const metadata = {
	title: "IEX Tracker",
	description: "Expense tracker",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GuestOnly>
			<div className="min-h-screen w-full flex flex-col md:flex-row">
				{children}
			</div>
		</GuestOnly>
	);
}
