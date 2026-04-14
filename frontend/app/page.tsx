"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from 'next/link';
import { Terminal, Cpu, Zap, Layers, ArrowUpRight, ChevronRight, Globe, Code2, Monitor } from "lucide-react";

// --- CUSTOM BRAND ICONS (Stable) ---
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function HomePage() {
  const [bootTime] = useState(new Date().toLocaleTimeString());

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center px-8 md:px-16 space-y-32"
    >
      {/* SPATIAL HERO CORE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
         <div className="lg:col-span-8 space-y-12 relative z-10">
            <motion.div variants={itemVariants} className="flex items-center gap-4">
               <div className="h-0.5 w-16 bg-[var(--accent)]" />
               <p className="text-[10px] font-mono text-[var(--accent)] tracking-[0.8em] uppercase font-black text-glow">Identity :: Kernel_Level_0</p>
            </motion.div>

            <div className="space-y-6">
               <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter leading-[0.8]">
                  Md. Rofaz <br /> <span className="opacity-15 text-outline-1 transition-all hover:opacity-100 duration-1000">Hasan Rafiu</span>
               </motion.h1>
               <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] font-mono text-[var(--text-muted)] tracking-widest uppercase font-bold">
                  <span className="flex items-center gap-3"><Cpu size={14} className="text-[var(--accent)]" /> Backend & AI Engineer</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-30" />
                  <span className="flex items-center gap-3"><GraduationCapIcon /> CSE @ RUET</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-30" />
                  <span className="flex items-center gap-3 font-black text-[var(--text-bright)]">Tangail / Dhaka</span>
               </motion.div>
            </div>

            <motion.p variants={itemVariants} className="max-w-3xl text-base md:text-lg leading-relaxed text-[var(--text)] font-body opacity-90 backdrop-blur-sm border-l-2 border-[var(--border-strong)] pl-8">
               Results-driven <span className="text-[var(--text-bright)] font-bold italic">Software Engineering student</span> at RUET specializing in 
               high-performance backend development, scalable system architectures, and cloud-native applications 
               powered by Python (FastAPI/Flask) and Node.js.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 items-center pt-4">
               <Link href="/cv" className="flex items-center gap-4 px-12 py-5 bg-[var(--accent)] text-black text-[11px] font-mono font-black tracking-widest uppercase hover:scale-[1.05] transition-all shadow-2xl hover:shadow-[0_0_40px_var(--glow)] group">
                  EXPLORE NEURAL CV <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </Link>
               <div className="flex items-center gap-6">
                  <a href="https://github.com/rofazhasan" target="_blank" className="p-4 glass-panel rounded-2xl hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all group shadow-lg"><GitHubIcon size={22} /></a>
                  <a href="https://linkedin.com/in/md-rofaz-hasan-rafiu" target="_blank" className="p-4 glass-panel rounded-2xl hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all group shadow-lg"><LinkedInIcon size={22} /></a>
               </div>
            </motion.div>
         </div>

         {/* SYSTEM TELEMETRY */}
         <div className="lg:col-span-4 hidden lg:flex flex-col gap-8">
            <motion.div variants={itemVariants} className="p-10 glass-panel rounded-[2rem] border-l-4 border-l-[var(--accent)] space-y-6 shadow-2xl">
               <div className="flex justify-between items-center text-[10px] font-mono font-black text-[var(--accent)] tracking-[0.3em] uppercase">
                  <span>Logic_Integrity</span>
                  <span>100% NOMINAL</span>
               </div>
               <div className="h-1.5 bg-[var(--border-strong)] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-[var(--accent)] shadow-[0_0_15px_var(--glow)]" />
               </div>
               <div className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-widest font-bold">Protocol: Secure_Kernel_v2.0</div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-10 glass-panel rounded-[2rem] border-l-4 border-l-[var(--cyan)] space-y-6 shadow-2xl">
                <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-black">
                   <Monitor size={14} className="text-[var(--cyan)]" /> Session_Timestamp
                </div>
                <div className="text-3xl font-mono text-[var(--text-bright)] font-black text-glow tracking-tighter">{bootTime}</div>
                <p className="text-[10px] text-[var(--text-dim)] leading-relaxed uppercase font-bold tracking-widest">Architecting future nodes for global impact.</p>
            </motion.div>
         </div>
      </div>

      {/* STRATEGIC MODULES (SKILLS FOCUS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16">
         {[
           { icon: <Code2 />, title: "Backend Core", desc: "Developing production-ready APIs with Python (FastAPI) and Node.js focused on microservices and distributed security.", color: "accent" },
           { icon: <Zap />, title: "Cloud Scale", desc: "Deploying high-integrity clusters on GCP using Docker, Kubernetes, and optimized NGINX reverse proxies.", color: "cyan" },
           { icon: <Layers />, title: "System Design", desc: "Architecting memory-safe CRUD generators and real-time synchronization hubs with PostgreSQL and Redis.", color: "accent" }
         ].map((module, i) => (
           <motion.div 
             key={i}
             variants={itemVariants}
             whileHover={{ y: -15, scale: 1.02 }}
             className="p-12 glass-panel rounded-[3rem] border border-[var(--border-strong)] group transition-all duration-500 shadow-xl overflow-hidden relative"
           >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-1000">
                  <Cpu size={100} />
              </div>
              <div className={`p-5 rounded-2xl bg-[var(--bg)] text-[var(--${module.color})] w-fit group-hover:scale-110 transition-transform mb-10 shadow-lg`}>
                 {module.icon}
              </div>
              <h3 className="text-3xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter mb-6 underline decoration-[var(--border-strong)] transition-all group-hover:decoration-[var(--accent)]">{module.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed font-body font-medium">{module.desc}</p>
           </motion.div>
         ))}
      </div>

      {/* FOOTER METRICS */}
      <motion.div variants={itemVariants} className="pt-24 opacity-5 flex flex-col items-center gap-6 pointer-events-none select-none text-center">
          <p className="text-[12px] text-[var(--text-dim)] uppercase tracking-[2.5em] font-black italic select-none">World_Class // Backend_Engineer // RUET_Node</p>
          <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
      </motion.div>
    </motion.div>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  );
}
