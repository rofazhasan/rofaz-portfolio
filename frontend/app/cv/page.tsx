"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Mail, Phone, Share2, GlobeIcon } from "lucide-react";

const SkillBadge = ({ skill }: { skill: string }) => (
  <div className="px-3 py-1 border border-[var(--border)] text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest hover:border-[var(--green)] hover:text-[var(--green)] transition-colors bg-[var(--bg-card)] shadow-sm">
    {skill}
  </div>
);

const CVEntry = ({ company, date, location, role, bullets, subHeader }: any) => (
  <div className="dotted-border-b mb-16 pb-12">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
      <h3 className="text-xl font-display font-bold text-[var(--text-bright)] tracking-widest uppercase">{company}</h3>
      <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest">{date}</span>
    </div>
    <div className="flex justify-between items-center mb-8">
      <p className="text-[var(--text-dim)] text-xs italic font-mono uppercase tracking-widest">{role}</p>
      {location && <span className="text-[9px] text-[var(--text-muted)] font-mono tracking-widest">{location}</span>}
    </div>

    {subHeader && (
      <div className="mb-6">
        <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.4em] mb-6">{subHeader}:</p>
        <ul className="space-y-4">
          {bullets.map((b: string, i: number) => (
            <li key={i} className="flex gap-4 text-xs text-[var(--text)] leading-relaxed group">
              <span className="text-[var(--green)] font-mono group-hover:translate-x-1 transition-transform">{`>`}</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default function CVPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)]"
    >
      {/* Left Column (CV Flow) */}
      <div className="flex-1 p-12 md:p-24 lg:border-r border-[var(--border)]">
        <div className="mb-24">
            <h2 className="text-7xl md:text-8xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter mb-4 underline decoration-[var(--border)]">Curriculum</h2>
            <p className="text-[var(--text-muted)] text-[10px] tracking-[0.5em]">$ cat experiences_full.log --verbose</p>
        </div>

        <div className="space-y-32">
            <section>
              <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[var(--border)]" /> Professional Timeline
              </h4>
              <CVEntry 
                  company="Systems & Data Research @ RUET"
                  date="2023 — 2027"
                  role="BSc Student / Distributed Systems Focus"
                  subHeader="Research Areas"
                  bullets={[
                    "Investigating memory-safe backend patterns in Rust for mission-critical reliability.",
                    "Architecting high-throughput data ingestion pipelines for decentralized structures.",
                    "System design focusing on scalability and predictive intelligence integration."
                  ]}
              />
              <CVEntry 
                  company="Independent Systems Architect"
                  date="2022 — 2023"
                  role="Full-Stack Engineering & AI"
                  subHeader="Impact & Systems"
                  bullets={[
                    "FinTrack: Real-time finance engine handling 1,000+ simulated concurrent transactions.",
                    "Meal-OPS: Role-based system for 50+ users reducing query response time by ~30%.",
                    "Data-extractor-AI: Statistical analysis of 10k+ rows for behavioral prediction."
                  ]}
              />
            </section>

            <section>
              <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[var(--border)]" /> Academic Node
              </h4>
              <div className="space-y-12">
                  <div className="dotted-border-b pb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[var(--text-bright)] font-display font-bold text-lg uppercase tracking-widest">Rajshahi University of Engineering & Tech</h5>
                        <span className="text-[10px] text-[var(--text-muted)]">2023—2027</span>
                    </div>
                    <p className="text-[var(--text-dim)] text-xs italic">BSc in Computer Science & Engineering</p>
                  </div>
                  <div className="dotted-border-b pb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[var(--text-bright)] font-display font-bold text-lg uppercase tracking-widest">St. Joseph Higher Secondary School</h5>
                        <span className="text-[10px] text-[var(--text-muted)]">2020—2022</span>
                    </div>
                    <p className="text-[var(--text-dim)] text-xs italic">HSC Science :: GPA 5.00 / 5.00</p>
                  </div>
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[var(--border)]" /> Honors & Leadership
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-8 bg-[var(--bg-card)] border border-[var(--border)] shadow-sm space-y-4">
                    <Award size={16} className="text-[var(--green)]" />
                    <h6 className="text-[var(--text-bright)] text-xs font-bold uppercase tracking-widest">Creative Talent Champion</h6>
                    <p className="text-[var(--text-dim)] text-[10px] leading-relaxed italic">Govt. of Bangladesh - Recognized for exceptional analytical logic.</p>
                  </div>
                  <div className="p-8 bg-[var(--bg-card)] border border-[var(--border)] shadow-sm space-y-4">
                    <BookOpen size={16} className="text-[var(--green)]" />
                    <h6 className="text-[var(--text-bright)] text-xs font-bold uppercase tracking-widest">Workshop Lead</h6>
                    <p className="text-[var(--text-dim)] text-[10px] leading-relaxed italic">Orchestrated system-level DSA/OOP workshops for 100+ participants.</p>
                  </div>
              </div>
            </section>
        </div>
      </div>

      {/* Right Column (Sidebar) */}
      <div className="w-full lg:w-[400px] p-12 md:p-20 bg-[var(--bg-secondary)] space-y-24">
        <div>
            <h4 className="text-[10px] font-bold text-[var(--text-bright)] uppercase tracking-[0.5em] mb-12 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green)] opacity-50" /> Capabilities
            </h4>
            <div className="space-y-12">
              <div>
                  <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4 font-bold">Programming_Core</p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "TypeScript", "Java", "C++", "Rust", "JavaScript"].map(s => <SkillBadge key={s} skill={s} />)}
                  </div>
              </div>
              <div>
                  <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4 font-bold">Data_Intelligence</p>
                  <div className="flex flex-wrap gap-2">
                    {["Pandas", "Matplotlib", "Seaborn", "Deep Learning", "Statistical ML"].map(s => <SkillBadge key={s} skill={s} />)}
                  </div>
              </div>
              <div>
                  <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4 font-bold">Backend_Cloud</p>
                  <div className="flex flex-wrap gap-2">
                    {["FastAPI", "Node.js", "Docker", "Kubernetes", "Redis", "PostgreSQL", "Firebase"].map(s => <SkillBadge key={s} skill={s} />)}
                  </div>
              </div>
            </div>
        </div>

        <div>
            <h4 className="text-[10px] font-bold text-[var(--text-bright)] uppercase tracking-[0.5em] mb-12 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green)] opacity-50" /> Network Identities
            </h4>
            <div className="space-y-6 text-[11px] font-mono text-[var(--text-muted)]">
              <a href="mailto:mdrofazhasanrafiu@gmail.com" className="flex items-center gap-4 hover:text-[var(--text-bright)] transition-all group">
                  <Mail size={12}/> mdrofazhasanrafiu@gmail.com
              </a>
              <div className="flex items-center gap-4 text-[var(--text-muted)]">
                  <Phone size={12}/> +880-1794-678595
              </div>
              <a href="https://github.com/rofazhasan" target="_blank" className="flex items-center gap-4 hover:text-[var(--text-bright)] transition-all group">
                  <GlobeIcon size={12}/> github.com/rofazhasan
              </a>
              <a href="https://linkedin.com/in/md-rofaz-hasan-rafiu" target="_blank" className="flex items-center gap-4 hover:text-[var(--text-bright)] transition-all group">
                  <Share2 size={12}/> linkedin/rofaz-hasan
              </a>
            </div>
        </div>

        <div className="pt-24 opacity-30 select-none">
            <p className="text-[10px] text-gray-800 uppercase tracking-[0.8em] font-black vertical-text fixed right-0 bottom-48">Architectural Intelligence</p>
        </div>
      </div>
    </motion.div>
  );
}
