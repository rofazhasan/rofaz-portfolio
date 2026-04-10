"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic frontend guard
    const token = Cookies.get("admin_token");
    if (!token && pathname !== "/login") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Prevent flashing content while checking token
  if (!isAuthenticated && pathname !== "/login") return <div className="min-h-screen bg-black" />;

  // If on login page, don't show the dashboard shell
  if (pathname === "/login") {
    return <div className="min-h-screen bg-gray-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-black/50 border-r border-white/10 flex flex-col backdrop-blur-xl">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Nexus OS
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-purple-300 border border-purple-500/20">
            <LayoutDashboard size={20} />
            <span className="font-medium">Projects</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              Cookies.remove("admin_token");
              router.push("/login");
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
