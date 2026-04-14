"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Award, Mail, Phone, Terminal, MapPin, Briefcase, Cpu, Code2, GraduationCap, Globe, Shield, Zap, Layers } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const SkillNode = ({ category, skills, icon, color }: { category: string, skills: string[], icon: any, color: string }) => (
  <motion.div variants={itemVariants} className="p-8 glass-panel rounded-3xl border border-[var(--border-strong)] space-y-8 group transition-all hover:bg-[var(--bg-secondary)]">
    <div className={`p-4 rounded-xl bg-[var(--bg)] text-[var(--${color})] w-fit shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="space-y-4">
      <h5 className="text-[12px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] font-black border-l-2 border-[var(--accent)] pl-4">{category}</h5>
      <div className="flex flex-wrap gap-3">
        {skills.map(s => (
          <span key={s} className="px-3 py-1 glass-panel rounded-lg text-[10px] font-mono text-[var(--text)] uppercase border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
            {s}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const TimelineEntry = ({ title, sub, date, bullets, type = "default" }: any) => (
  <motion.div variants={itemVariants} className="relative pl-12 pb-16 last:pb-0 border-l border-[var(--border-strong)] group ml-4">
    <div className="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_15px_var(--glow)] transition-all duration-500" />
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <h4 className="text-3xl md:text-5xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter group-hover:text-glow transition-all">{title}</h4>
          <p className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest font-black">{sub}</p>
        </div>
        <div className="glass-panel px-6 py-2 rounded-xl text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] font-black uppercase tracking-widest">
          {date}
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bullets.map((b: string, i: number) => (
          <li key={i} className="flex gap-4 p-5 glass-panel rounded-2xl bg-[var(--bg-secondary)]/50 border border-transparent hover:border-[var(--border)] transition-all group/item">
            <span className="text-[var(--accent)] font-mono mt-0.5 group-hover/item:animate-pulse">{`>>`}</span>
            <span className="text-xs text-[var(--text)] leading-relaxed opacity-80 group-hover/item:opacity-100 transition-opacity">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function CVPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-[1400px] mx-auto px-8 md:px-24 py-24 space-y-48 relative z-10"
    >
      {/* HUD PROFILE HEADER */}
      <motion.div variants={itemVariants} className="border-b border-[var(--border-strong)] pb-24 space-y-12">
        <div className="flex items-center gap-4">
           <Terminal size={14} className="text-[var(--accent)] animate-pulse" />
           <p className="text-[10px] text-[var(--accent)] font-mono tracking-[0.8em] uppercase font-black">Neural_Sync // System_Archives_v2.0</p>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-16">
            <h2 className="text-7xl md:text-[10rem] font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter leading-[0.8]">
              Spatial <br /> <span className="text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors duration-1000">Archives</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] font-black border-r-4 border-[var(--accent)] pr-12">
                <span className="flex items-center gap-4 hover:text-[var(--text-bright)] transition-colors"><MapPin size={16} className="text-[var(--accent)]" /> Tangail / Dhaka, BD</span>
                <span className="flex items-center gap-4 hover:text-[var(--text-bright)] transition-colors"><Mail size={16} className="text-[var(--accent)]" /> MDROFAZHASANRAFIU@GMAIL.COM</span>
                <span className="flex items-center gap-4 hover:text-[var(--text-bright)] transition-colors"><Phone size={16} className="text-[var(--accent)]" /> +880-1794-678595</span>
                <span className="flex items-center gap-4 text-[var(--text-bright)]"><Globe size={16} /> MDROFAZ_SYSTEM_NODE</span>
            </div>
        </div>

        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 p-12 glass-panel rounded-[3rem] border-l-[8px] border-[var(--accent)] bg-blueprint/10">
              <p className="text-base md:text-xl leading-relaxed text-[var(--text)] italic font-medium opacity-100">
                "Results-driven Software Engineering student (CSE, RUET) with strong expertise in backend development, 
                scalable system design, and cloud-based applications. Passionate about designing high-performance 
                systems and solving real-world problems with clean, efficient architecture."
              </p>
           </div>
           <div className="lg:col-span-4 flex flex-col justify-center space-y-4 opacity-40">
              <div className="flex justify-between border-b border-[var(--border-strong)] pb-2 uppercase font-mono text-[10px]"><span>Sync_Protocol</span> <span>High_Intensity</span></div>
              <div className="flex justify-between border-b border-[var(--border-strong)] pb-2 uppercase font-mono text-[10px]"><span>Auth_State</span> <span>Primary_Kernel</span></div>
              <div className="flex justify-between border-b border-[var(--border-strong)] pb-2 uppercase font-mono text-[10px]"><span>Security</span> <span>OWASP_v1.2</span></div>
           </div>
        </div>
      </motion.div>

      {/* TIMELINE: SYSTEMS & NODES */}
      <section className="space-y-32">
        <motion.div variants={itemVariants} className="flex items-center gap-8">
           <div className="w-24 h-[1px] bg-[var(--accent)] opacity-50" />
           <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
              <Code2 size={18} className="text-[var(--accent)]" /> Production_Timeline
           </h4>
        </motion.div>
        
        <div className="space-y-4">
          <TimelineEntry 
            title="FinTrack Engine"
            sub="Lead Backend Developer // Personal Finance App"
            date="2023 - PRESENT"
            bullets={[
              "Developed cross-platform architecture with real-time synchronization and offline stability.",
              "Implemented Firebase Authentication and high-integrity encrypted data handling.",
              "Optimized state persistence modules for seamless performance across iOS and Android nodes."
            ]}
          />
          <TimelineEntry 
            title="Hostel::OPS"
            sub="Systems Architect // Meal Management Node"
            date="2023"
            bullets={[
              "Built full-stack tracking cluster with institutional role-based access protocols.",
              "Designed high-frequency SQL queries for real-time hostel logistical updates.",
              "Achieved significant cost-calculation accuracy via automated ledger reconciliation."
            ]}
          />
        </div>
      </section>

      {/* ACADEMIC MATRICES */}
      <section className="space-y-32">
        <motion.div variants={itemVariants} className="flex items-center gap-8">
           <div className="w-24 h-[1px] bg-[var(--cyan)] opacity-50" />
           <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
              <GraduationCap size={18} className="text-[var(--cyan)]" /> Academic_Nodes
           </h4>
        </motion.div>
        
        <div className="space-y-4">
          <TimelineEntry 
            title="RUET Node"
            sub="B.Sc in Computer Science & Engineering"
            date="2023 - 2027"
            bullets={[
                "Primary focus on Backend Development and Scalable AI Architectures.",
                "Leader of high-intensity programming workgroups and workshop lead for OOP concepts.",
                "Researching distributed system benchmarks for regional high-load workloads."
            ]}
          />
          <TimelineEntry 
            title="St. Joseph HSC"
            sub="Higher Secondary Certificate (Science)"
            date="2020 - 2022"
            bullets={[
                "GPA: 5.00 / 5.00 Objective Grade Achievement.",
                "Awarded Regional Champion status in Creative Talent Hunt by Govt of BD.",
                "Executive member of institutional Science and Literature societies."
            ]}
          />
        </div>
      </section>

      {/* NEURAL CAPABILITIES GALAXY */}
       <section className="space-y-32">
        <motion.div variants={itemVariants} className="flex items-center gap-8">
           <div className="w-24 h-[1px] bg-[var(--text-muted)] opacity-50" />
           <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
              <Cpu size={18} className="text-[var(--text-muted)]" /> Capability_Matrix
           </h4>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillNode 
                icon={<Code2 />} category="Logic_Stacks" color="accent"
                skills={["Python", "TypeScript", "Java", "C++", "JavaScript"]}
            />
            <SkillNode 
                icon={<Zap />} category="Backend_Engines" color="cyan"
                skills={["FastAPI", "Flask", "Node.js", "REST APIs", "JWT Auth"]}
            />
            <SkillNode 
                icon={<Globe />} category="Cloud_Ops" color="accent"
                skills={["GCP", "Docker", "Kubernetes", "NGINX", "Redis"]}
            />
            <SkillNode 
                icon={<Shield />} category="Core_Security" color="cyan"
                skills={["System Design", "Microservices", "API Security", "Distributed Systems"]}
            />
            <SkillNode 
                icon={<Layers />} category="Peripheral_Tech" color="accent"
                skills={["React Native", "PostgreSQL", "Firebase", "Jest", "Tailwind"]}
            />
            <SkillNode 
                icon={<Award />} category="Recognition" color="cyan"
                skills={["Debate Champion", "Mentorship", "Workshop Lead", "Govt Award"]}
            />
        </div>
      </section>
      
      {/* FINAL AUTH FOOTER */}
      <footer className="pt-48 pb-12 opacity-5 text-center pointer-events-none select-none">
          <p className="text-[14px] font-mono font-black uppercase tracking-[3em] italic">System_Integrity_Nominal // Verified_RAF_99</p>
      </footer>
    </motion.div>
  );
}
