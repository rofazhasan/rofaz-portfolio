"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Activity, Shield, Moon, Sun, Monitor } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";
import dynamic from "next/dynamic";
import LiveShell from "../components/LiveShell";

// Large 3D scenes should be dynamic to avoid SSR hydration mismatches
const Scene3D = dynamic(() => import("../components/Scene3D"), { ssr: false });

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-4 h-4" />;

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

const isDay = false; // Placeholder logic for future expansion 


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark">
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <div className="bg-[var(--bg)] selection:bg-[var(--accent)]/30 min-h-screen relative overflow-hidden crt-screen">
          
          {/* Atmospheric FAANG Layers */}
          <Scene3D />
          <div className="terminal-grain" />
          <div className="fixed inset-0 bg-blueprint opacity-[var(--canvas-opacity)] pointer-events-none" />

          {/* --- NAV HEADER (DOCK STYLE) --- */}
          <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-8 md:px-16 z-[100] border-b border-[var(--border)] bg-[var(--bg)]/10 backdrop-blur-xl">
             <div className="flex items-center gap-8">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/40" />
                   <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                </div>
                <Link href="/" className="text-xs font-mono tracking-tighter hover:text-[var(--accent)] transition-colors group">
                   <span className="text-[var(--text-bright)] opacity-50 font-bold">rafiu</span>@<span className="text-[var(--accent)] group-hover:text-glow transition-all">kernel_node</span>:~<span className="opacity-50">$</span>
                </Link>
             </div>
             
             <nav className="flex items-center gap-12">
                {['/', '/cv', '/projects'].map((path) => (
                  <Link 
                    key={path}
                    href={path} 
                    className={`text-[10px] font-mono tracking-[0.4em] uppercase transition-all relative group ${
                      pathname === path ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-bright)]'
                    }`}
                  >
                    {path === '/' ? 'CORE' : path.slice(1)}
                    {pathname === path && (
                      <motion.div layoutId="activeNav" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--accent)] shadow-[0_0_10px_var(--glow)]" />
                    )}
                  </Link>
                ))}
                <div className="h-6 w-[1px] bg-[var(--border)]" />
                <ThemeToggle />
             </nav>
          </header>

          <AnimatePresence mode="wait">
            <motion.main 
              key={pathname}
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: { duration: 0.8 } 
              }}
              exit={{ 
                opacity: 0, 
                x: 20, 
                scale: 1.02,
                transition: { duration: 0.6 } 
              }}
              className="pt-32 pb-32 relative z-10 flex flex-col items-center"
            >
              {children}
            </motion.main>
          </AnimatePresence>

          {/* World-Class Footer */}
          <footer className="fixed bottom-0 left-0 w-full h-10 flex items-center justify-between px-8 md:px-16 z-[90] bg-[var(--bg-secondary)] border-t border-[var(--border)] backdrop-blur-md opacity-80">
             <div className="flex items-center gap-8 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                <span className="flex items-center gap-2"><Activity size={10} className="text-[var(--accent)] animate-pulse" /> SPATIAL_NODE_CONNECTED</span>
                <span className="hidden md:inline">SYSTEM: RE-ACT_19.0 / TS_5.4</span>
             </div>
             <div className="flex items-center gap-4 text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.2em] font-bold">
                <Shield size={12} className="text-[var(--accent)]" /> 256-BIT ENCRYPTED SESSION
             </div>
          </footer>

          {/* Interactive Hub */}
          <LiveShell />

        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}
