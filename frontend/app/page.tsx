"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { Zap, Layers } from "lucide-react";

const asciiLines = [
  "  ____        __ _       ",
  " |  _ \\ ___  / _| | __ _ ",
  " | |_) / _ \\| |_| |/ _` |",
  " |  _ < (_) |  _| | (_| |",
  " |_| \\_\\___/|_| |_|\\__, |",
  "                   |___/ "
];

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [asciiIndex, setAsciiIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const sequence = async () => {
      // 1. Initial Prompt
      setLines(["bradeac@portfolio:~$ ./boot_identity.sh"]);
      await new Promise(r => setTimeout(r, 600));

      // 2. Loading messages
      setLines(l => [...l, "[ OK ] Initializing Secure Kernel..."]);
      await new Promise(r => setTimeout(r, 400));
      
      setLines(l => [...l, "[ OK ] Mounting Memory Banks..."]);
      await new Promise(r => setTimeout(r, 300));
      
      setLines(l => [...l, "[ OK ] Authenticating Developer Identity..."]);
      await new Promise(r => setTimeout(r, 800));

      // 3. ASCII Art Reveal
      for (let i = 0; i < asciiLines.length; i++) {
        setAsciiIndex(i);
        await new Promise(r => setTimeout(r, 100));
      }

      await new Promise(r => setTimeout(r, 500));
      setLines(l => [...l, "Identity Verified: Md. Rofaz Hasan Rafiu", "Access Granted."]);
      
      await new Promise(r => setTimeout(r, 800));
      setShowCursor(false);
      onComplete();
    };

    sequence();
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div className="font-mono text-[var(--text-bright)] text-sm leading-relaxed p-6 absolute inset-0 z-50 pointer-events-none">
      {lines.map((line, i) => (
        <div key={i} className={`${line.includes('[ OK ]') ? 'text-[var(--green)]' : ''}`}>{line}</div>
      ))}
      
      {asciiIndex >= 0 && (
        <pre className="text-[var(--text-bright)] mt-4 mb-4 text-xs md:text-sm">
          {asciiLines.slice(0, asciiIndex + 1).join('\n')}
        </pre>
      )}

      {showCursor && <span className="inline-block w-2 h-4 bg-[var(--green)] animate-pulse ml-1" />}
    </div>
  );
};

export default function HomePage() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 md:mt-24 mb-12 relative terminal-window rounded-xl overflow-hidden shadow-2xl flex flex-col bg-[var(--bg-card)] border border-[var(--border)] min-h-[60vh]">
      <div className="h-10 bg-[var(--bg)]/90 border-b border-[var(--border)] flex items-center px-4 gap-2 sticky top-0 z-20 backdrop-blur-md">
        <div className="w-3 h-3 rounded-full bg-[var(--red)] opacity-80"></div>
        <div className="w-3 h-3 rounded-full bg-[var(--amber)] opacity-80"></div>
        <div className="w-3 h-3 rounded-full bg-[var(--green)] opacity-80"></div>
        <div className="mx-auto text-xs font-mono text-[var(--text-muted)] tracking-widest flex items-center pr-12">
          md_rafiu@portfolio<span className="opacity-50">:~</span>
        </div>
      </div>
      <div className="p-8 md:p-16 relative flex-1 overflow-hidden">
        
      <AnimatePresence>
        {!booted && (
          <motion.div 
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <BootSequence onComplete={() => setBooted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booted && (
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-20 relative z-10"
          >
            <div className="space-y-12">
                <div className="text-[var(--green)] text-[10px] tracking-[0.4em] uppercase font-bold"># Identity / Verified</div>
                <h1 className="text-6xl md:text-9xl font-display font-black text-[var(--text-bright)] tracking-tighter leading-none italic uppercase">
                  Md. Rofaz Hasan Rafiu
                </h1>
                <div className="text-2xl md:text-3xl text-[var(--text-muted)] max-w-4xl leading-relaxed font-light font-body">
                  Backend Systems & AI Intelligence Architect. Specializing in high-concurrency Rust backends and distributed data pipelines.
                </div>
                <div className="max-w-2xl bg-[var(--bg-secondary)] border-l border-[var(--border)] p-8">
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed italic">
                      Software Engineering student (CSE, RUET) specializing in Backend Engineering, Data Analytics, and AI Systems. Proven ability to design scalable architectures and apply statistical ML & Deep Learning to real-world problems.
                  </p>
                </div>
            </div>

            <div className="pt-8">
               <p className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest mb-6">Available Commands:</p>
               <div className="flex gap-6">
                 <Link href="/cv" className="flex items-center gap-3 px-6 py-3 border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--green)] hover:shadow-[var(--shadow-card-hover)] transition-all group cursor-pointer text-sm font-mono tracking-widest text-[var(--text-bright)] uppercase shadow-sm">
                    <span className="text-[var(--green)] opacity-50 group-hover:opacity-100">$ cd</span> curriculum/
                 </Link>
                 <Link href="/projects" className="flex items-center gap-3 px-6 py-3 border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--green)] hover:shadow-[var(--shadow-card-hover)] transition-all group cursor-pointer text-sm font-mono tracking-widest text-[var(--text-bright)] uppercase shadow-sm">
                    <span className="text-[var(--green)] opacity-50 group-hover:opacity-100">$ cd</span> archives/
                 </Link>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20 border-t border-[var(--border)]">
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-[var(--text-bright)] uppercase tracking-[0.3em] flex items-center gap-3">
                      <Zap size={14} className="text-[var(--green)]" /> Focus_Core
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed font-body">System design, API security (OWASP), and microservices architecture. Dedicated to reliability, integrity, and performance optimization.</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-[var(--text-bright)] uppercase tracking-[0.3em] flex items-center gap-3">
                      <Layers size={14} className="text-[var(--green)]" /> Engineering
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed font-body">End-to-end data pipelines, statistical prediction models, and deep learning heuristics. Building intelligent systems with tangible impact.</p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
