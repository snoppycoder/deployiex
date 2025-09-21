import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import {
  ChartColumnDecreasing,
  DollarSign,
  LayoutDashboard,
  Menu,
  Receipt,
  Settings,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../component/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEX Tracker",
  description: "Expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:min-h-screen border-r border-gray-300">
          <Navbar />
        </aside>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
