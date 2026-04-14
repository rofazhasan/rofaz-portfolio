"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ChevronRight, Cpu, Zap, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

const COMMAND_REGISTRY: Record<string, string> = {
  help: "IDENTIFIED COMMANDS: help, whoami, ls, clear, projects, cv, contact, edu, skills",
  whoami: "USER: Md. Rofaz Hasan Rafiu | NODE: CSE_RUET_STUDENT | STATUS: ACTIVE_BACKEND_ARCHITECT",
  ls: "CURRICULUM/  SYSTEM_ARCHIVES/  IDENTITY_CORE/  NEURAL_DATA/",
  projects: "SYSTEM: Redirecting to projects cluster...",
  cv: "SYSTEM: Redirecting to curriculum archives...",
  contact: "COMM_CHANNELS: mdrofazhasanrafiu@gmail.com | +880-1794-678595",
  edu: "ACADEMIC_HISTORY: RUET (CSE, 2023-2027) | St. Joseph (HSC, 2022, 5.00 GPA)",
  skills: "STACK_SUMMARY: Python(FastAPI), Rust, Node.js, Postgres, Firebase, GCP, Docker, Kubernetes",
};

export default function LiveShell() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(["SYSTEM: Kernel v2.0.0-Stable Initialized.", "Type 'help' to audit system capabilities."]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, `> ${cmd}`];

    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "projects") {
      newHistory.push(COMMAND_REGISTRY.projects);
      router.push("/projects");
    } else if (cmd === "cv") {
      newHistory.push(COMMAND_REGISTRY.cv);
      router.push("/cv");
    } else if (COMMAND_REGISTRY[cmd]) {
      newHistory.push(COMMAND_REGISTRY[cmd]);
    } else {
      newHistory.push(`ERR: Protocol '${cmd}' not recognized as internal or external system node.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[200] px-4 md:px-12 pb-12 pointer-events-none">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-end gap-6 pointer-events-auto">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }}
              className="w-full h-[450px] glass-panel rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-[var(--border-strong)] bg-[#000000]/80 backdrop-blur-2xl"
            >
              <div className="h-10 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center px-6 justify-between">
                <div className="flex items-center gap-3">
                   <Activity size={12} className="text-[var(--accent)] animate-pulse" />
                   <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] font-black">Interactive_Neural_Shell_v2.0</div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-[var(--text-dim)] hover:text-red-500 transition-all font-mono text-xs">EXIT_HUB</button>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex-1 p-8 overflow-y-auto font-mono text-[11px] space-y-3 leading-loose text-[var(--accent)]/60 selection:bg-[var(--accent)] selection:text-black"
              >
                {history.map((line, i) => (
                  <div key={i} className={line.startsWith(">") ? "text-[var(--accent)] font-black" : line.startsWith("ERR") ? "text-red-500" : ""}>
                    {line}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border)] flex items-center gap-4">
                <ChevronRight size={18} className="text-[var(--accent)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Root_Access_Requested..."
                  className="flex-1 bg-transparent border-none outline-none text-[11px] font-mono text-[var(--text-bright)] placeholder:text-[var(--text-dim)] focus:ring-0 uppercase tracking-widest p-0"
                  autoFocus
                />
                <div className="flex gap-2">
                   <div className="w-1 h-4 bg-[var(--accent)] opacity-20 animate-pulse" />
                   <div className="w-1 h-4 bg-[var(--accent)] opacity-10 animate-pulse delay-75" />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--glow)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="flex items-center gap-4 px-8 py-4 glass-panel rounded-full text-[11px] font-mono tracking-[0.5em] uppercase font-black hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all group shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <TerminalIcon size={16} className={isOpen ? "animate-pulse text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--accent)]"} />
          {isOpen ? "DISCONNECT_SESSION" : "EXECUTE_SYSTEM_AUDIT"}
        </motion.button>
      </div>
    </div>
  );
}
