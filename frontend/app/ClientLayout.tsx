"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Activity, Shield, Moon, Sun, Monitor, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";
import dynamic from "next/dynamic";
import LiveShell from "../components/LiveShell";

// Large 3D scenes should be dynamic to avoid SSR hydration mismatches
const Scene3D = dynamic(() => import("../components/Scene3D"), { ssr: false });

// Global Synthesised Beep Utility using Web Audio API
const playBeep = (freq = 800, duration = 0.05, type = "sine" as OscillatorType) => {
  if (typeof window === "undefined") return;
  const isMuted = localStorage.getItem("sound_muted") === "true";
  if (isMuted) return;

  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Fail silently when audio context is blocked by browser auto-play policy
  }
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-4 h-4" />;

  return (
    <button 
      onClick={() => {
        playBeep(900, 0.03, "sine");
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const logLines = [
    "RAF_SYSTEM BIOS v3.0.2 (C) 2026",
    "CPU CHECK: Intel(R) Core(TM) i9 CPU @ 5.00GHz... OK",
    "MEMORY CHECK: 16384MB SYSTEM REGISTER MEMORY... NOMINAL",
    "ESTABLISHING 256-BIT SECURE KERNEL SOCKET... SIGNED",
    "MOUNTING LOGIC STACK (FASTAPI/NODEJS/NEXTJS)... OK",
    "COMPILING WEBGL CONSTALLATION PLEXUS... DEPLOYED",
    "ACCESS GRANTED. PRIMARY CONSOLE READY."
  ];

  useEffect(() => {
    let currentLine = 0;
    const addLine = () => {
      if (currentLine < logLines.length) {
        setLogs(prev => [...prev, logLines[currentLine]]);
        currentLine++;
        setTimeout(addLine, Math.random() * 120 + 30);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    addLine();
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#000000] font-mono text-[9px] text-[var(--accent)] flex flex-col justify-center px-12 md:px-24 select-none uppercase tracking-[0.25em] leading-loose">
      <div className="max-w-2xl space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="opacity-45">{">"}</span>
            <span>{log}</span>
          </div>
        ))}
        <div className="w-2 h-3 bg-[var(--accent)] animate-pulse inline-block mt-2" />
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    
    // Check sound setting
    const stored = localStorage.getItem("sound_muted");
    if (stored !== null) {
      setSoundMuted(stored === "true");
    } else {
      localStorage.setItem("sound_muted", "true");
    }

    // Touch device detection
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    // Track cursor coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Hover interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      setIsHovered(!!isInteractive);
    };

    // Global click sound feedback
    const handleGlobalClick = () => {
      playBeep(1000, 0.02, "sine");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const toggleMute = () => {
    const newVal = !soundMuted;
    setSoundMuted(newVal);
    localStorage.setItem("sound_muted", String(newVal));
    if (!newVal) {
      setTimeout(() => playBeep(700, 0.05, "sine"), 50);
    }
  };

  if (!isMounted) return null;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <div className={`bg-[var(--bg)] selection:bg-[var(--accent)]/30 min-h-screen relative overflow-hidden crt-screen ${!isTouchDevice && hasBooted ? 'cursor-none' : ''}`}>
          
          <AnimatePresence>
            {!hasBooted && (
              <BootScreen onComplete={() => {
                setHasBooted(true);
                playBeep(520, 0.08, "triangle");
                setTimeout(() => playBeep(880, 0.12, "sine"), 80);
              }} />
            )}
          </AnimatePresence>

          {/* Interactive Mouse Follower */}
          {!isTouchDevice && hasBooted && (
            <>
              <motion.div
                className="fixed w-2.5 h-2.5 rounded-full bg-[var(--accent)] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_var(--glow)]"
                animate={{
                  x: mousePos.x,
                  y: mousePos.y,
                  scale: isHovered ? 1.4 : 1,
                  backgroundColor: isHovered ? "var(--cyan)" : "var(--accent)"
                }}
                transition={{ type: "spring", stiffness: 850, damping: 45 }}
              />
              <motion.div
                className="fixed w-8 h-8 rounded-full border border-[var(--accent)] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-25 shadow-[0_0_15px_var(--glow)]"
                animate={{
                  x: mousePos.x,
                  y: mousePos.y,
                  scale: isHovered ? 1.8 : 1,
                  borderColor: isHovered ? "var(--cyan)" : "var(--accent)"
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              />
            </>
          )}

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
          <footer className="fixed bottom-0 left-0 w-full h-10 flex items-center justify-between px-8 md:px-16 z-[90] bg-[var(--bg-secondary)] border-t border-[var(--border)] backdrop-blur-md opacity-85">
             <div className="flex items-center gap-8 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                <span className="flex items-center gap-2"><Activity size={10} className="text-[var(--accent)] animate-pulse" /> SPATIAL_NODE_CONNECTED</span>
                <span className="hidden md:inline">SYSTEM: RE-ACT_19.0 / TS_5.4</span>
             </div>
             <div className="flex items-center gap-6">
                <button 
                  onClick={toggleMute}
                  className="flex items-center gap-2 text-[9px] font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-widest font-black"
                >
                  {soundMuted ? (
                    <>
                      <VolumeX size={11} /> SOUND_MUTE
                    </>
                  ) : (
                    <>
                      <Volume2 size={11} className="text-[var(--accent)]" /> SOUND_ON
                    </>
                  )}
                </button>
                <div className="h-4 w-[1px] bg-[var(--border)]" />
                <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.2em] font-bold">
                   <Shield size={12} className="text-[var(--accent)]" /> 256-BIT ENCRYPTED SESSION
                </div>
             </div>
          </footer>

          {/* Interactive Hub */}
          <LiveShell />

        </div>
      </ReactLenis>
  );
}
