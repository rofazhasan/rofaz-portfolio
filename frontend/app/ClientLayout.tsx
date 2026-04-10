"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Activity, Shield, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

// --- CUSTOM FLUID CURSOR ---
function FluidCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const ghostX = useSpring(mouseX, springConfig);
  const ghostY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--green)] rounded-full pointer-events-none z-[1000] shadow-[var(--glow-text)]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--green)] rounded-full pointer-events-none z-[999] opacity-50"
        style={{ x: ghostX, y: ghostY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

// --- ATMOSPHERIC AMBIENT GLOW ---
function AmbientGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const glowY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
      <motion.div
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 blur-[150px] opacity-20"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, var(--green-glow) 0%, transparent 70%)"
        }}
      />
  );
}

// --- THEME TOGGLE ---
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <button className="w-4 h-4"></button>;

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-[var(--text-muted)] hover:text-[var(--text-bright)] transition-colors p-1"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { 
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null;

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark">
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <div className="bg-[var(--bg)] selection:bg-[var(--green)]/30 min-h-screen text-[var(--text)]">
          
          {/* Fixed Deco Layers */}
          <div className="crt-overlay opacity-[var(--scanline-opacity)] mix-blend-overlay" />
          <div className="noise-layer opacity-[var(--vignette-opacity)]" />
          <AmbientGlow />
          <FluidCursor />
          <div className="fixed inset-0 bg-grid opacity-[var(--canvas-opacity)] pointer-events-none" />

          {/* --- MAC TERMINAL HEADER (STICKY) --- */}
          <header className="terminal-header px-4 md:px-12 flex items-center justify-between z-50 shadow-sm border-b-[var(--border)] bg-[var(--bg-secondary)] backdrop-blur-md">
             <div className="flex items-center gap-6">
                <Link href="/" className="text-[14px] md:text-base font-mono font-bold tracking-tight group cursor-pointer">
                   <span className="text-[var(--text-bright)]">md_rafiu</span><span className="text-[var(--text-bright)] opacity-70">@</span><span className="text-[var(--text-bright)]">portfolio</span><span className="text-[var(--text-bright)] font-black">:</span><span className="text-[var(--green)]">~</span><span className="text-[var(--green)] font-black">$</span>
                </Link>
             </div>
             
             <nav className="flex items-center gap-6 md:gap-8">
                <Link href="/" className={`flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${pathname === '/' ? 'text-[var(--green)] border-b border-[var(--green)] pb-1' : 'text-[var(--text-muted)] hover:text-[var(--text-bright)]'}`}>
                  <span className="text-[var(--green)] opacity-50">cd </span>home
                </Link>
                <Link href="/cv" className={`flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${pathname === '/cv' ? 'text-[var(--green)] border-b border-[var(--green)] pb-1' : 'text-[var(--text-muted)] hover:text-[var(--text-bright)]'}`}>
                  <span className="text-[var(--green)] opacity-50">cd </span>cv
                </Link>
                <Link href="/projects" className={`flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${pathname === '/projects' ? 'text-[var(--green)] border-b border-[var(--green)] pb-1' : 'text-[var(--text-muted)] hover:text-[var(--text-bright)]'}`}>
                  <span className="text-[var(--green)] opacity-50">cd </span>projects
                </Link>
                
                <ThemeToggle />
             </nav>

             <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                <Activity size={10} className="text-[var(--green)] animate-pulse" /> session_active :: 0x7CF
             </div>
          </header>

          {/* --- MAIN PAGE CONTENT --- */}
          <main className="terminal-main z-10 relative">
            {children}
          </main>

          {/* --- FOOTER (STICKY) --- */}
          <footer className="terminal-footer px-4 md:px-12 flex items-center justify-between z-50 bg-[var(--bg-secondary)] backdrop-blur-md">
             <div className="flex items-center gap-8 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                <span className="text-[var(--green)]">BUILD_READY</span>
                <span className="hidden md:inline italic">VER: 0x7CF_STABLE</span>
                <span className="hidden lg:inline italic">ENV: PROD_DAKA_NODE</span>
             </div>
             <div className="flex items-center gap-4 text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-widest">
                <Shield size={10} className="text-[var(--green)] opacity-50" /> System Integrity Nominal
             </div>
          </footer>

        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}
