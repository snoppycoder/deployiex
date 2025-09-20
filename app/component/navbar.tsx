"use client";
import {
  ChartColumnDecreasing,
  DollarSign,
  LayoutDashboard,
  Receipt,
  Settings,
  TrendingUp,
  UsersRound,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { usePathname } from "next/navigation";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigationLinks = [
    { name: "Dashboard", href: "/", logo: LayoutDashboard },
    { name: "Expenses", href: "/expenses", logo: Receipt },
    { name: "Income", href: "/income", logo: DollarSign },
    { name: "Approvals", href: "/approvals", logo: UsersRound },
    { name: "Analytics", href: "/analytics", logo: ChartColumnDecreasing },
    { name: "Policies", href: "/policies", logo: Settings },
  ];
  const pathname = usePathname();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <nav
        className={`fixed top-0 left-0 md:static z-20 w-64 h-screen flex flex-col gap-y-3 p-2 border-r border-gray-300 bg-white transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
  md:static md:translate-x-0`}
      >
        <div className=" w-full flex gap-x-2.5 my-8 md:mb-2">
          <TrendingUp size={32} />
          <span className="font-bold text-xl">IEX Tracker</span>
        </div>
        {navigationLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-x-3 px-3 py-2 rounded-xl transition-colors text-gray-500
            ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}
            >
              <link.logo size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="md:hidden w-full flex flex-row-reverse items-center justify-between p-5 border-b border-b-gray-300">
        <Menu onClick={() => setIsOpen(!isOpen)}></Menu>

        <div className=" w-full flex items-center gap-x-2.5 ">
          <TrendingUp size={28} />
          <span className="font-bold text-lg">IEX Tracker</span>
        </div>
      </div>
    </>
  );
}
