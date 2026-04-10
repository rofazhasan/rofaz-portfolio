"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto p-12 md:p-32 space-y-16"
    >
      <div className="mb-20">
          <h2 className="text-7xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter mb-4">$ query --archives</h2>
          <p className="text-[var(--text-muted)] text-[10px] tracking-[0.5em]">Inventory of 5 stable intelligence deployments</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
          {[
            { name: "FinTrack::Engine", tech: ["Rust", "Firebase"], desc: "Transactional model handling 1,000+ concurrent operations with offline sync." },
            { name: "Meal::OPS_System", tech: ["Node.js", "Postgres"], desc: "Role-based management system reducing query latency by 30% through caching." },
            { name: "ML::Data_Predictor", tech: ["Python", "Pandas"], desc: "Statistical extraction from 10k+ rows for behavioral intelligence." },
            { name: "Weather::Insight", tech: ["REST API", "Responsive"], desc: "Real-time stream integration with environmental log patterns." },
            { name: "Salat::Timing_Node", tech: ["Lightweight", "Precise"], desc: "Accessibility-focused API node for accurate religious timing." }
          ].map((p, idx) => (
            <motion.div 
                whileHover={{ x: 20 }} key={idx} 
                className="group p-12 bg-[var(--bg-card)] border border-[var(--border)] hover:bg-[var(--bg-card-hover)] hover:shadow-[var(--shadow-card-hover)] transition-all flex items-center justify-between shadow-sm cursor-pointer"
            >
                <div className="space-y-4">
                  <h4 className="text-4xl font-display font-bold text-[var(--text-bright)] group-hover:text-[var(--green)] transition-colors uppercase tracking-tight italic">{p.name}</h4>
                  <p className="text-[var(--text)] text-sm max-w-2xl leading-relaxed">{p.desc}</p>
                  <div className="flex gap-6 uppercase text-[9px] font-mono text-[var(--text-muted)] tracking-[0.3em]">
                      {p.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <ExternalLink size={20} className="text-[var(--border)] group-hover:text-[var(--green)] opacity-50 group-hover:opacity-100 transition-all" />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
