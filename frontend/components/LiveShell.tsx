"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ChevronRight, Cpu, Zap, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

// Virtual File System for the cat command
const VIRTUAL_FS: Record<string, string> = {
  "identity.txt": "NAME: Md. Rofaz Hasan Rafiu\nROLE: Backend & AI Engineer\nINSTITUTION: RUET (Computer Science & Engineering)\nFOCUS: High-Performance Microservices, API Security, Distributed Systems.",
  "contact.ini": "EMAIL=mdrofazhasanrafiu@gmail.com\nPHONE=+880-1794-678595\nGITHUB=github.com/rofazhasan\nLINKEDIN=linkedin.com/in/md-rofaz-hasan-rafiu",
  "stack.json": "{\n  \"languages\": [\"Python\", \"TypeScript\", \"Rust\", \"C++\", \"Java\", \"JavaScript\"],\n  \"engines\": [\"FastAPI\", \"Node.js\", \"Axum\", \"Flask\"],\n  \"databases\": [\"PostgreSQL\", \"Redis\", \"Firebase\"],\n  \"cloud_ops\": [\"Docker\", \"Kubernetes\", \"GCP\", \"NGINX\"]\n}"
};

const COMMAND_REGISTRY: Record<string, string> = {
  help: "IDENTIFIED NODES: help, whoami, ls, cat [file], neofetch, ping [host], matrix, clear, projects, cv, contact, edu, skills",
  whoami: "USER: Md. Rofaz Hasan Rafiu | NODE: CSE_RUET_STUDENT | STATUS: ACTIVE_BACKEND_ARCHITECT",
  ls: "identity.txt  contact.ini  stack.json",
  projects: "SYSTEM: Redirecting to projects cluster...",
  cv: "SYSTEM: Redirecting to curriculum archives...",
  contact: "COMM_CHANNELS: mdrofazhasanrafiu@gmail.com | +880-1794-678595",
  edu: "ACADEMIC_HISTORY: RUET (CSE, 2023-2027) | St. Joseph (HSC, 2022, 5.00 GPA)",
  skills: "STACK_SUMMARY: Python(FastAPI), Rust, Node.js, Postgres, Firebase, GCP, Docker, NGINX, Redis",
};

// Canvas-based Matrix Rain screensaver
function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 11;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    // Auto terminate after 8 seconds
    const timer = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <button 
        onClick={onComplete}
        className="absolute top-4 right-6 px-4 py-2 border border-[#00ff41]/30 hover:border-[#00ff41] bg-black text-[#00ff41] font-mono text-[9px] uppercase tracking-widest rounded-lg z-50 transition"
      >
        TERMINATE MATRIX (ESC)
      </button>
    </div>
  );
}

export default function LiveShell() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "SYSTEM: Kernel v3.0.2-Stable Initialized.",
    "Type 'help' to audit system capabilities."
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isExecuting]);

  // Handle ESC to close Matrix mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMatrixActive) {
        setIsMatrixActive(false);
        setHistory(prev => [...prev, "SYSTEM: Matrix screensaver terminated."]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMatrixActive]);

  // Tab autocompletion list
  const availableCommands = useMemo(() => {
    const registryKeys = Object.keys(COMMAND_REGISTRY);
    const virtualFiles = Object.keys(VIRTUAL_FS).map(f => `cat ${f}`);
    return [...registryKeys, ...virtualFiles, "matrix", "clear"];
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up: Command History Back
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    }
    // Arrow Down: Command History Forward
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
    // Tab: Autocomplete
    else if (e.key === "Tab") {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;

      const match = availableCommands.find(c => c.startsWith(val));
      if (match) {
        setInput(match);
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExecuting) return;
    const fullCmd = input.trim();
    if (!fullCmd) return;

    // Add to history list
    setCommandHistory(prev => [...prev, fullCmd]);
    setHistoryIndex(-1);
    
    const args = fullCmd.split(" ");
    const cmd = args[0].toLowerCase();
    const subArg = args.slice(1).join(" ");

    const newHistory = [...history, `> ${fullCmd}`];
    setInput("");

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "matrix") {
      setIsMatrixActive(true);
      setHistory([...newHistory, "SYSTEM: Launching falling matrix digital rain streamsaver..."]);
      return;
    }

    if (cmd === "projects") {
      newHistory.push(COMMAND_REGISTRY.projects);
      router.push("/projects");
      setHistory(newHistory);
      return;
    }

    if (cmd === "cv") {
      newHistory.push(COMMAND_REGISTRY.cv);
      router.push("/cv");
      setHistory(newHistory);
      return;
    }

    if (cmd === "cat") {
      const fileName = subArg.toLowerCase();
      if (!fileName) {
        newHistory.push("ERR: Specify a target node. Usage: cat [filename]");
      } else if (VIRTUAL_FS[fileName]) {
        newHistory.push(VIRTUAL_FS[fileName]);
      } else {
        newHistory.push(`ERR: Node '${fileName}' does not resolve inside virtual registry.`);
      }
      setHistory(newHistory);
      return;
    }

    if (cmd === "neofetch") {
      const fetchLog = [
        "    _  _ ____ _  _ ____ ____ ___ ",
        "    |\\/| |__|  \\/  |___ |__/  |  ",
        "    |  | |  | _/\\_ |___ |  \\  |  ",
        "    ----------------------------",
        "    OS: KernelOS v3.2.0-spatial (NextJS 16)",
        "    Host: TGL_NODE_RAF (CSE_RUET)",
        "    Uptime: 2 hours, 45 mins",
        "    Shell: zsh (interactive_neural_shell)",
        "    Resolution: 1920x1080 (Spatial Canvas)",
        "    Theme: Obsidian-Green / Vintage-Amber",
        "    CPU: Intel(R) Core(TM) i9 (8 Cores, 16 Threads)",
        "    Memory: 16.00GB / 100% NOMINAL",
      ].join("\n");
      newHistory.push(fetchLog);
      setHistory(newHistory);
      return;
    }

    if (cmd === "ping") {
      const host = subArg || "google.com";
      newHistory.push(`PING ${host} (142.250.190.46) 56(84) bytes of data.`);
      setHistory(newHistory);
      setIsExecuting(true);

      let seq = 1;
      const runPing = () => {
        if (seq <= 4) {
          const lat = (10 + Math.random() * 12).toFixed(1);
          setHistory(prev => [
            ...prev,
            `64 bytes from 142.250.190.46: icmp_seq=${seq} ttl=116 time=${lat} ms`
          ]);
          seq++;
          setTimeout(runPing, 500);
        } else {
          setHistory(prev => [
            ...prev,
            `--- ${host} ping statistics ---`,
            `4 packets transmitted, 4 received, 0% packet loss, time 2004ms`,
            `rtt min/avg/max = 10.1/15.2/22.0 ms`
          ]);
          setIsExecuting(false);
        }
      };
      setTimeout(runPing, 500);
      return;
    }

    if (COMMAND_REGISTRY[cmd]) {
      newHistory.push(COMMAND_REGISTRY[cmd]);
    } else {
      newHistory.push(`ERR: Protocol '${cmd}' not recognized as internal or external system node.`);
    }

    setHistory(newHistory);
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
              className="w-full h-[450px] glass-panel rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-[var(--border-strong)] bg-[#000000]/80 backdrop-blur-2xl relative"
            >
              {isMatrixActive && (
                <MatrixRain onComplete={() => {
                  setIsMatrixActive(false);
                  setHistory(prev => [...prev, "SYSTEM: Matrix screensaver completed."]);
                }} />
              )}

              <div className="h-10 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center px-6 justify-between">
                <div className="flex items-center gap-3">
                   <Activity size={12} className="text-[var(--accent)] animate-pulse" />
                   <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] font-black">Interactive_Neural_Shell_v3.2</div>
                </div>
                <button 
                  disabled={isExecuting}
                  onClick={() => setIsOpen(false)} 
                  className="text-[var(--text-dim)] hover:text-red-500 disabled:opacity-30 transition-all font-mono text-xs"
                >
                  EXIT_HUB
                </button>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex-1 p-8 overflow-y-auto font-mono text-[11px] space-y-3 leading-loose text-[var(--accent)]/65 selection:bg-[var(--accent)] selection:text-black whitespace-pre-wrap"
              >
                {history.map((line, i) => (
                  <div key={i} className={line.startsWith(">") ? "text-[var(--accent)] font-black" : line.startsWith("ERR") ? "text-red-500 font-bold" : ""}>
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
                  disabled={isExecuting}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isExecuting ? "EXECUTING PROTOCOL..." : "Root_Access_Requested (TAB for autocomplete)..."}
                  className="flex-1 bg-transparent border-none outline-none text-[11px] font-mono text-[var(--text-bright)] placeholder:text-[var(--text-dim)] focus:ring-0 uppercase tracking-widest p-0 disabled:opacity-50"
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
