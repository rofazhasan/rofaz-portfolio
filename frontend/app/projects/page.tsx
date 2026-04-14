"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ExternalLink, Database, Code2, Globe, Layout, Cloud, Terminal, ArrowUpRight, Cpu, Zap, Layers, Shield } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

const projectData = [
  { 
    name: "FinTrack::Mobile", 
    tech: ["React Native", "Firebase", "Real-time Sync", "Encrypted Cache"], 
    desc: "Cross-platform personal finance architecture. Engineered with Firebase synchronization and interactive dashboards for category-based expense visualization and secure asset tracking.",
    icon: <Database size={24} />,
    color: "accent"
  },
  { 
    name: "Hostel::MealLog", 
    tech: ["Node.js", "PostgreSQL", "Role-Auth", "CRUD"], 
    desc: "Institutional logistical system for meal management. Features sophisticated role-based access protocols and optimized database queries for massive institutional scalability.",
    icon: <Code2 size={24} />,
    color: "cyan"
  },
  { 
    name: "Atmosphere::API", 
    tech: ["FastAPI", "RESTful", "Analytics", "Logging"], 
    desc: "High-performance weather intelligence gateway. Integrated real-time data logging and user query tracking for environmental analytics and predictive trend modeling.",
    icon: <Globe size={24} />,
    color: "accent"
  },
  { 
    name: "Routine::Kernel", 
    tech: ["Python", "Flask", "Modular Logic", "Automation"], 
    desc: "Digital Class Routine Generator utilizing modular backend logic for dynamic CRUD-based scheduling. Engineered to handle complex institutional multi-node time-table synchronization.",
    icon: <Layout size={24} />,
    color: "cyan"
  },
  { 
    name: "Salah::Sync", 
    tech: ["JavaScript", "Public API", "Responsive UX", "WPO"], 
    desc: "Ultra-accessible religious synchronization application utilizing public APIs for real-time prayer timing accuracy. Focused on extreme UI simplicity and global accessibility markers.",
    icon: <Cloud size={24} />,
    color: "accent"
  }
];

export default function ProjectsPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-[1400px] mx-auto px-8 md:px-24 py-24 space-y-40 relative z-10"
    >
      {/* HUD PROJECT HEADER */}
      <motion.div variants={itemVariants} className="space-y-10 border-b border-[var(--border-strong)] pb-24">
          <div className="flex items-center gap-4">
            <Terminal size={14} className="text-[var(--accent)] animate-pulse" />
            <p className="text-[10px] text-[var(--accent)] font-mono tracking-[0.8em] uppercase font-black">Archive_Index // Recursive_Retrieval_v2.0</p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-end gap-16">
            <h2 className="text-7xl md:text-[10rem] font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter leading-[0.8]">
              System <br /> <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-1000">Inventory</span>
            </h2>
            <div className="max-w-xl space-y-8">
              <p className="text-[var(--text-muted)] text-sm md:text-lg font-mono tracking-widest uppercase opacity-80 leading-relaxed font-bold">
                Analyzing 5 target architectures categorized by <span className="text-[var(--accent)]">High-Intensity Performance</span> metrics and Scalable Cloud potential.
              </p>
              <div className="flex gap-12 text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-[0.3em] font-black border-l-2 border-[var(--border-strong)] pl-8">
                <span>STABILITY: NOMINAL</span>
                <span>AUTH: ROOT_ACCESS</span>
              </div>
            </div>
          </div>
      </motion.div>
      
      {/* SPATIAL MODULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projectData.map((p, idx) => (
            <motion.div 
                variants={itemVariants}
                key={idx} 
                whileHover={{ y: -20, scale: 1.02 }}
                className="group glass-panel p-12 rounded-[3.5rem] border border-[var(--border-strong)] hover:border-[var(--accent)] transition-all duration-700 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[520px] bg-blueprint/5"
            >
                {/* Visual Depth Flair */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--glow)] rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
                
                <div className="space-y-12 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`p-6 rounded-3xl bg-[var(--bg)] text-[var(--${p.color})] shadow-inner group-hover:scale-110 transition-transform duration-700 border border-[var(--border)]`}>
                      {p.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                       <span className="text-[10px] font-mono text-[var(--accent)] font-black opacity-30 group-hover:opacity-100 transition-opacity">NODE_0{idx + 1}</span>
                       <div className="w-12 h-[1px] bg-[var(--border-strong)]" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-4xl md:text-5xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter group-hover:text-glow transition-all">
                      {p.name}
                    </h4>
                    <p className="text-[var(--text)] text-xs md:text-sm leading-relaxed font-body opacity-80 group-hover:opacity-100 transition-opacity selection:bg-[var(--accent)] selection:text-black">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-16 space-y-10">
                  <div className="flex flex-wrap gap-3 uppercase text-[9px] font-mono text-[var(--text-muted)] tracking-widest font-black">
                      {p.tech.map(t => (
                        <span key={t} className="px-4 py-2 glass-panel rounded-xl border border-[var(--border)] group-hover:border-[var(--text-muted)] transition-all hover:bg-[var(--bg)]">
                          {t}
                        </span>
                      ))}
                  </div>
                  
                  <div className="flex items-center gap-6 text-[11px] font-mono text-[var(--text-dim)] group-hover:text-[var(--accent)] font-black tracking-[0.4em] transition-all cursor-pointer border-t border-[var(--border-strong)] pt-8">
                      <span>SYNC_REPOSITORY</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </div>
                </div>
            </motion.div>
          ))}
          
          {/* Decorative Command Pad */}
          <motion.div variants={itemVariants} className="p-12 glass-panel rounded-[3.5rem] border border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center text-center space-y-8 opacity-20 hover:opacity-80 transition-all group cursor-help">
             <div className="p-8 rounded-full border border-[var(--border)] animate-pulse group-hover:border-[var(--accent)] transition-colors">
                <Cpu size={48} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
             </div>
             <p className="text-[11px] font-mono tracking-[0.4em] uppercase font-black leading-loose italic">Awaiting_Next <br /> Functional_Architecture <br /> Protocol...</p>
          </motion.div>
      </div>

      {/* SYSTEM METRICS FOOTER */}
      <motion.div variants={itemVariants} className="pt-48 opacity-5 flex flex-col items-center gap-6 pointer-events-none select-none text-center">
          <p className="text-[16px] font-mono text-[var(--text-dim)] uppercase tracking-[3.5em] font-black italic select-none">Spatial // Integrity // Validated // 0x7CF</p>
          <div className="flex gap-16 text-[10px] font-mono tracking-widest uppercase font-black">
            <span>Query_Result: SUCCESS</span>
            <span>Latency: 0.2ms</span>
            <span>Cluster: TGL_NODE_RAF</span>
          </div>
      </motion.div>
    </motion.div>
  );
}
