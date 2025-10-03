"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	LayoutDashboard,
	Building2,
	Users,
	UserCheck,
	FileText,
	BarChart3,
	Search,
	Bell,
	Menu,
	X,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Suspense } from "react";
import { UsernameDisplay } from "@/app/(admin)/components/UsernameDisplay";
import { RequireAuth } from "@/utils/router/before-load";

const navigation = [
	{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ name: "Organizations", href: "/admin/organizations", icon: Building2 },
	{ name: "Teams", href: "/admin/teams", icon: Users },
	{ name: "Users", href: "/admin/users", icon: UserCheck },
	{ name: "Expense Policies", href: "/admin/expense-policies", icon: FileText },
	{ name: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const pathname = usePathname();

	return (
		<RequireAuth>
			<div className="min-h-screen w-full flex flex-col md:flex-row">
				<div className="min-h-screen bg-background w-full">
					{/* Mobile sidebar overlay */}
					{sidebarOpen && (
						<div
							className="fixed inset-0 z-40 bg-black/50 lg:hidden"
							onClick={() => setSidebarOpen(false)}
						/>
					)}

					{/* Sidebar */}
					<div
						className={cn(
							"fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
							sidebarCollapsed ? "w-16" : "w-64",
							sidebarOpen
								? "translate-x-0"
								: "-translate-x-full lg:translate-x-0"
						)}
					>
						{/* Logo and collapse button */}
						<div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
							{!sidebarCollapsed && (
								<div className="flex items-center space-x-2">
									<div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
										<span className="text-primary-foreground font-bold text-sm">
											A
										</span>
									</div>
									<span className="font-semibold text-sidebar-foreground">
										Admin Panel
									</span>
								</div>
							)}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
								className="hidden lg:flex h-8 w-8 p-0"
							>
								{sidebarCollapsed ? (
									<ChevronRight className="h-4 w-4" />
								) : (
									<ChevronLeft className="h-4 w-4" />
								)}
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSidebarOpen(false)}
								className="lg:hidden h-8 w-8 p-0"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>

						{/* Navigation */}
						<nav className="flex-1 px-2 py-4 space-y-1">
							{navigation.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.name}
										href={item.href}
										className={cn(
											"flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
											isActive
												? "bg-sidebar-accent text-sidebar-accent-foreground"
												: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
											sidebarCollapsed ? "justify-center" : "justify-start"
										)}
										title={sidebarCollapsed ? item.name : undefined}
									>
										<item.icon className="h-5 w-5 flex-shrink-0" />
										{!sidebarCollapsed && (
											<span className="ml-3">{item.name}</span>
										)}
									</Link>
								);
							})}
						</nav>
					</div>

					{/* Main content */}
					<div
						className={cn(
							"flex flex-col transition-all duration-300",
							sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
						)}
					>
						{/* Top bar */}
						<header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
							<div className="flex items-center space-x-4">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setSidebarOpen(true)}
									className="lg:hidden"
								>
									<Menu className="h-5 w-5" />
								</Button>

								{/* Search bar */}
								<div className="relative w-64 hidden md:block">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search..."
										className="pl-10 bg-background"
									/>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								{/* Notifications */}
								<Button variant="ghost" size="sm" className="relative">
									<Bell className="h-5 w-5" />
									<span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
										3
									</span>
								</Button>

								{/* Username display */}
								<UsernameDisplay />
								{/* Profile dropdown */}
								<Suspense fallback={null}>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className="relative h-8 w-8 rounded-full"
											>
												<Avatar className="h-8 w-8">
													<AvatarImage src="/admin-avatar.png" alt="Admin" />
													<AvatarFallback>AD</AvatarFallback>
												</Avatar>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											className="w-56"
											align="end"
											forceMount
										>
											<DropdownMenuItem>
												<span>Profile</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span>Settings</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span>Logout</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</Suspense>
							</div>
						</header>

						{/* Main content area */}
						<main className="flex-1 p-4 lg:p-6">{children}</main>
					</div>
				</div>
			</div>
		</RequireAuth>
	);
}
