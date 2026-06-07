"use client";

import { motion } from "framer-motion";
import { CalendarDays, Code2, Globe, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InternshipCard({ className }: { className?: string }) {
  const openMail = () => {
    window.open("mailto:mdrofazhasanrafiu@gmail.com", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "glass-panel mx-auto mt-12 w-full max-w-4xl rounded-[2.5rem] border border-[var(--border-strong)] bg-blueprint/5 p-8 font-sans md:p-12 shadow-2xl relative overflow-hidden",
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--glow)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row border-b border-[var(--border-strong)] pb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[var(--accent)] shadow-[0_0_15px_var(--glow)] bg-black flex items-center justify-center text-[var(--accent)] font-mono font-black text-xl italic select-none">
            RAF
          </div>
          <div>
            <h3 className="text-2xl font-display font-black italic uppercase text-[var(--text-bright)] tracking-wide">
              Md. Rofaz Hasan Rafiu
            </h3>
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Talent Acquisition Routing
            </p>
          </div>
        </div>

        {/* Live availability badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/5 px-4 py-1.5 font-mono text-[9px] font-black uppercase tracking-widest text-[var(--accent)] shadow-[0_0_15px_var(--glow)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]"></span>
            </span>
            Active_Availability
          </span>
        </div>
      </div>

      {/* Career Details Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex items-start gap-4 p-5 glass-panel rounded-2xl bg-black/20">
          <CalendarDays className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
          <div className="space-y-1 font-mono">
            <p className="text-[10px] uppercase text-[var(--text-muted)] font-black tracking-wider">Preferred Duration</p>
            <p className="text-xs text-[var(--text)] leading-relaxed font-semibold">
              Currently open for Summer/Fall 2026/2027 Opportunities
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 glass-panel rounded-2xl bg-black/20">
          <Globe className="h-5 w-5 text-[var(--cyan)] shrink-0 mt-0.5" />
          <div className="space-y-1 font-mono">
            <p className="text-[10px] uppercase text-[var(--text-muted)] font-black tracking-wider">Target Locations</p>
            <p className="text-xs text-[var(--text)] leading-relaxed font-semibold">
              Dhaka / Onsite / Remote Global Nodes
            </p>
          </div>
        </div>

        {/* Core Tech Stack */}
        <div className="flex items-start gap-4 p-5 glass-panel rounded-2xl bg-black/20 sm:col-span-2">
          <Code2 className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
          <div className="space-y-2 w-full font-mono">
            <p className="text-[10px] uppercase text-[var(--text-muted)] font-black tracking-wider">Strategic Stacks</p>
            <div className="text-xs text-[var(--text)] grid grid-cols-1 gap-4 sm:grid-cols-2 leading-relaxed">
              <ul className="list-disc pl-4 space-y-1.5 font-medium">
                <li><span className="text-[var(--text-bright)]">Python</span> (FastAPI, Flask, Django)</li>
                <li><span className="text-[var(--text-bright)]">Rust</span> (Axum API Core, System Dev)</li>
                <li><span className="text-[var(--text-bright)]">Node.js</span> (TypeScript/JavaScript Services)</li>
              </ul>
              <ul className="list-disc pl-4 space-y-1.5 font-medium">
                <li><span className="text-[var(--text-bright)]">Data Stores</span> (PostgreSQL, Redis, Firebase)</li>
                <li><span className="text-[var(--text-bright)]">Infrastructure</span> (Docker, Kubernetes, GCP, NGINX)</li>
                <li><span className="text-[var(--text-bright)]">Core Logic</span> (System Design, Microservices, Security)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale & Goals */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[var(--border-strong)]">
        <div className="space-y-3">
          <h4 className="text-[11px] font-mono font-black uppercase text-[var(--text-bright)] flex items-center gap-2 tracking-widest">
            <Sparkles size={14} className="text-[var(--accent)] animate-pulse" /> Core Competencies
          </h4>
          <p className="text-xs text-[var(--text)] leading-relaxed font-body font-medium">
            Fast execution velocity. Passionate about solving bottleneck allocations, architecting concurrent transaction endpoints, and deploying secure microservices. Experienced in building real-time synchronization pipelines with complete security metrics.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-mono font-black uppercase text-[var(--text-bright)] flex items-center gap-2 tracking-widest">
            Target Goals
          </h4>
          <p className="text-xs text-[var(--text)] leading-relaxed font-body font-medium">
            Aiming to join high-performance engineering teams working on distributed infrastructure or scale-focused backend architectures. Eager to contribute scalable solutions, master complex configurations, and drive product execution.
          </p>
        </div>
      </div>

      {/* Initialize Contact Action */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={openMail}
          className="cursor-pointer rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)]/95 text-black px-8 py-4 font-mono text-[10px] font-black tracking-widest uppercase hover:scale-[1.03] active:scale-97 hover:shadow-[0_0_25px_var(--glow)] transition-all flex items-center gap-3"
        >
          INITIALIZE_CONTACT_HANDSHAKE <Send size={14} />
        </button>
      </div>
    </motion.div>
  );
}
