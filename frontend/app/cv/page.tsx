"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  Award, Mail, Phone, Terminal, MapPin, 
  Briefcase, Cpu, Code2, GraduationCap, 
  Globe, Shield, Zap, Layers, BarChart2, CheckCircle2, ShieldCheck
} from "lucide-react";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import InternshipCard from "../../components/InternshipCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

function TelemetryOscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>(Array(45).fill(40));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const data = dataRef.current;
      data.shift();
      const lastVal = data[data.length - 1];
      // Generate smooth wave swings
      const newVal = Math.max(10, Math.min(85, lastVal + (Math.random() - 0.5) * 16));
      data.push(newVal);

      // Draw grid lines
      ctx.strokeStyle = "rgba(0, 255, 65, 0.04)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const xGridSpacing = canvas.width / 15;
      const yGridSpacing = canvas.height / 6;
      for (let x = 0; x < canvas.width; x += xGridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += yGridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Draw glowing oscilloscope line
      ctx.beginPath();
      ctx.strokeStyle = "#00ff41";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#00ff41";
      ctx.shadowBlur = 6;

      const step = canvas.width / (data.length - 1);
      for (let i = 0; i < data.length; i++) {
        const x = i * step;
        const y = canvas.height - (data[i] / 100) * canvas.height;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      setTimeout(() => {
        animationId = requestAnimationFrame(draw);
      }, 100);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full h-20 border border-[var(--border-strong)] bg-black/60 rounded-xl overflow-hidden relative shadow-inner">
      <canvas ref={canvasRef} width={400} height={80} className="w-full h-full block" />
      <div className="absolute top-2 left-3 text-[7.5px] font-mono text-[var(--accent)] opacity-60 tracking-wider">OSCILLOSCOPE_BUS_FEED_A</div>
    </div>
  );
}

function TelemetryDashboard() {
  const [metrics, setMetrics] = useState({
    cpuTemp: 44.5,
    ramUsed: 4.12,
    threads: 14,
    latency: 15,
    bufferSize: 1024,
    uptime: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuTemp: +(42 + Math.random() * 6).toFixed(1),
        ramUsed: +(3.9 + Math.random() * 0.4).toFixed(2),
        threads: Math.random() > 0.8 ? (Math.random() > 0.5 ? 15 : 13) : prev.threads,
        latency: Math.floor(10 + Math.random() * 12),
        bufferSize: prev.bufferSize + (Math.random() > 0.5 ? 8 : -8),
        uptime: prev.uptime + 1,
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={itemVariants} 
      className="p-8 glass-panel rounded-3xl border border-[var(--border-strong)] border-l-4 border-l-[var(--accent)] bg-black/40 font-mono text-[10px] space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Cpu size={80} />
      </div>
      <div className="flex justify-between items-center border-b border-[var(--border-strong)] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="font-black tracking-widest text-[var(--text-bright)]">LOCAL_NODE_TELEMETRY // OSCILLOSCOPE ACTIVE</span>
        </div>
        <span className="text-[var(--text-muted)]">UPTIME: {metrics.uptime}s</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Core numbers */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5"><Zap size={10} /> CPU_CORE_TEMP</div>
            <div className="text-lg font-black text-[var(--accent)] text-glow">{metrics.cpuTemp}°C</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5"><Layers size={10} /> RAM_CONSUMPTION</div>
            <div className="text-lg font-black text-[var(--accent)] text-glow">{metrics.ramUsed} GB</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5"><Terminal size={10} /> SCHED_THREADS</div>
            <div className="text-lg font-black text-[var(--accent)] text-glow">{metrics.threads} / 16</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5"><BarChart2 size={10} /> BUS_LATENCY</div>
            <div className="text-lg font-black text-[var(--accent)] text-glow">{metrics.latency} ms</div>
          </div>
        </div>

        {/* Oscilloscope Line Chart (4 Cols) */}
        <div className="md:col-span-4 w-full">
          <TelemetryOscilloscope />
        </div>
      </div>
    </motion.div>
  );
}

const SkillNode = ({ category, skills, icon, color }: { category: string, skills: { name: string, level: number }[], icon: any, color: string }) => (
  <motion.div 
    variants={itemVariants} 
    className="p-8 glass-panel rounded-3xl border border-[var(--border-strong)] space-y-8 group transition-all hover:bg-[var(--bg-secondary)]/50 flex flex-col justify-between"
  >
    <div className="space-y-6">
      <div className={`p-4 rounded-xl bg-[var(--bg)] text-[var(--${color})] w-fit shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h5 className="text-[12px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] font-black border-l-2 border-[var(--accent)] pl-4">{category}</h5>
    </div>
    
    <div className="space-y-4 pt-6 border-t border-[var(--border)]">
      {skills.map(s => (
        <div key={s.name} className="space-y-1 group/skill">
          <div className="flex justify-between text-[10px] font-mono text-[var(--text)] font-bold tracking-wider group-hover/skill:text-[var(--text-bright)] transition-colors">
            <span>{s.name}</span>
            <span className="opacity-0 group-hover/skill:opacity-100 text-[var(--accent)] transition-opacity duration-300">{s.level}%</span>
          </div>
          <div className="h-[3px] bg-[var(--border-strong)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: `${s.level}%` }} 
              viewport={{ once: true }} 
              transition={{ duration: 1.2, ease: "easeOut" }} 
              className={`h-full ${color === 'cyan' ? 'bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]' : 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]'}`}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const TimelineEntry = ({ title, sub, date, bullets }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div 
      variants={itemVariants} 
      className="relative pl-12 pb-16 last:pb-0 border-l border-[var(--border-strong)] group ml-4 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_15px_var(--glow)] transition-all duration-500" />
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <h4 className="text-3xl md:text-5xl font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter group-hover:text-glow transition-all">{title}</h4>
            <p className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest font-black flex items-center gap-2 flex-wrap">
              {sub}
              <span className="text-[9px] text-[var(--text-muted)] font-mono tracking-normal normal-case font-medium bg-[var(--border-strong)] px-2 py-0.5 rounded border border-[var(--border)] group-hover:text-[var(--text-bright)] transition-colors">
                {isExpanded ? 'COLLAPSE NODE' : 'CLICK TO AUDIT NODE'}
              </span>
            </p>
          </div>
          <div className="glass-panel px-6 py-2 rounded-xl text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] font-black uppercase tracking-widest">
            {date}
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {bullets.map((b: string, i: number) => (
              <li key={i} className="flex gap-4 p-5 glass-panel rounded-2xl bg-[var(--bg-secondary)]/30 border border-[var(--border)] hover:border-[var(--accent)] transition-all group/item">
                <span className="text-[var(--accent)] font-mono mt-0.5 group-hover/item:animate-pulse">{`>>`}</span>
                <span className="text-xs text-[var(--text)] leading-relaxed opacity-85 group-hover/item:opacity-100 transition-opacity">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Certificationflip-cards component
function CertificationCard({ cert }: any) {
  return (
    <div className="group [perspective:1000px] w-full h-56 cursor-pointer">
      <div className="relative w-full h-full duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-panel rounded-3xl p-8 flex flex-col justify-between border border-[var(--border-strong)] bg-blueprint/5">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[var(--accent)]">
              <Award size={22} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[8px] font-mono text-[var(--text-muted)] tracking-widest uppercase">CREDENTIAL NODE</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-display font-black uppercase text-white italic tracking-tighter truncate">{cert.name}</h4>
            <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider">{cert.issuer}</p>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-[var(--text-dim)] border-t border-[var(--border)] pt-4">
            <span>ID: {cert.id}</span>
            <span className="group-hover:text-[var(--accent)] transition-colors">HOVER TO DECRYPT</span>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel rounded-3xl p-8 flex flex-col justify-between border border-[var(--accent)] bg-black/95">
          <div className="flex justify-between items-start border-b border-[var(--border-strong)] pb-4">
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-black uppercase">
              <ShieldCheck size={14} /> SECURITY CERTIFIED
            </div>
            <span className="text-[8.5px] font-mono text-[var(--text-muted)] font-black">{cert.date}</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-300 font-body">{cert.description}</p>
          <div className="text-[9px] font-mono text-[var(--text-muted)] flex justify-between items-center uppercase tracking-widest pt-4 border-t border-[var(--border)]">
            <span>DECRYPT STATUS: OK</span>
            <span className="text-[var(--accent)] font-bold">VERIFIED_NODE</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CVPage() {
  const testimonials = [
    {
      quote: "Rofaz's design of the Hostel MealLog database queries reduced index scan latencies by over 60%. His systems are incredibly clean and stable.",
      name: "Dr. Al-Mamun",
      designation: "CSE Professor & Project Supervisor @ RUET",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "Working with Rofaz on FinTrack Mobile was outstanding. His commitment to implementing AES-256 local encryption and clean Redux logic was key to our project success.",
      name: "S. Mahmud",
      designation: "Senior Lead Mobile Developer",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "Rofaz's technical mentorship during the Object Oriented Programming workshop was stellar. He clarified complex memory layouts for over 80 junior peers.",
      name: "K. Rahman",
      designation: "RUET CSE Workgroup Coordinator",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const certifications = [
    {
      name: "Creative Talent Champion",
      issuer: "Govt of Bangladesh",
      id: "RAF-Talent-2022",
      date: "2022",
      description: "Awarded Regional Champion status in the National Creative Talent Hunt for innovations in logical analysis and computer technology."
    },
    {
      name: "CSE Workgroup Lead",
      issuer: "RUET Node",
      id: "RUET-OOP-2024",
      date: "2024",
      description: "Mentored 80+ students on Object Oriented Programming configurations and backend memory allocations during RUET seminar clusters."
    },
    {
      name: "Neural CV Signed",
      issuer: "Primary Kernel Node",
      id: "RAF-SYS-SEC-256",
      date: "2026",
      description: "Cryptographically validated system profiles ensuring compliance with high-performance architectures and secure JWT auth specifications."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-[1400px] mx-auto px-8 md:px-24 py-24 space-y-36 relative z-10"
    >
      {/* HUD PROFILE HEADER */}
      <motion.div variants={itemVariants} className="border-b border-[var(--border-strong)] pb-16 space-y-12">
        <div className="flex items-center gap-4">
           <Terminal size={14} className="text-[var(--accent)] animate-pulse" />
           <p className="text-[10px] text-[var(--accent)] font-mono tracking-[0.8em] uppercase font-black">Neural_Sync // System_Archives_v3.2</p>
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
           <div className="lg:col-span-8 p-12 glass-panel rounded-[3rem] border-l-4 border-[var(--accent)] bg-blueprint/10">
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

      {/* TELEMETRY DASHBOARD */}
      <TelemetryDashboard />

      {/* TIMELINE: SYSTEMS & NODES */}
      <section className="space-y-20">
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
              "Optimized state persistence modules for seamless performance across iOS and Android nodes.",
              "Constructed secure API microservices for local transaction categorization."
            ]}
          />
          <TimelineEntry 
            title="Hostel::OPS"
            sub="Systems Architect // Meal Management Node"
            date="2023"
            bullets={[
              "Built full-stack tracking cluster with institutional role-based access protocols.",
              "Designed high-frequency SQL queries for real-time hostel logistical updates.",
              "Achieved significant cost-calculation accuracy via automated ledger reconciliation.",
              "Integrated comprehensive audit trails for logistical transactions."
            ]}
          />
        </div>
      </section>

      {/* ACADEMIC MATRICES */}
      <section className="space-y-20">
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
       <section className="space-y-20">
         <motion.div variants={itemVariants} className="flex items-center gap-8">
            <div className="w-24 h-[1px] bg-[var(--accent)] opacity-50" />
            <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
               <Cpu size={18} className="text-[var(--accent)]" /> Capability_Matrix
            </h4>
         </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillNode 
                icon={<Code2 />} category="Logic_Stacks" color="accent"
                skills={[
                  { name: "Python", level: 95 },
                  { name: "TypeScript", level: 90 },
                  { name: "Java", level: 80 },
                  { name: "C++", level: 85 },
                  { name: "JavaScript", level: 92 }
                ]}
            />
            <SkillNode 
                icon={<Zap />} category="Backend_Engines" color="cyan"
                skills={[
                  { name: "FastAPI", level: 95 },
                  { name: "Flask", level: 85 },
                  { name: "Node.js", level: 90 },
                  { name: "REST APIs", level: 95 },
                  { name: "JWT Auth", level: 92 }
                ]}
            />
            <SkillNode 
                icon={<Globe />} category="Cloud_Ops" color="accent"
                skills={[
                  { name: "GCP", level: 80 },
                  { name: "Docker", level: 88 },
                  { name: "Kubernetes", level: 75 },
                  { name: "NGINX", level: 82 },
                  { name: "Redis", level: 80 }
                ]}
            />
            <SkillNode 
                icon={<Shield />} category="Core_Security" color="cyan"
                skills={[
                  { name: "System Design", level: 90 },
                  { name: "Microservices", level: 88 },
                  { name: "API Security", level: 92 },
                  { name: "Distributed Sys", level: 85 }
                ]}
            />
            <SkillNode 
                icon={<Layers />} category="Peripheral_Tech" color="accent"
                skills={[
                  { name: "React Native", level: 85 },
                  { name: "PostgreSQL", level: 88 },
                  { name: "Firebase", level: 90 },
                  { name: "Jest", level: 80 },
                  { name: "Tailwind", level: 95 }
                ]}
            />
            <SkillNode 
                icon={<Award />} category="Recognition" color="cyan"
                skills={[
                  { name: "Debate Champ", level: 85 },
                  { name: "Mentorship", level: 90 },
                  { name: "Workshop Lead", level: 92 },
                  { name: "Govt Award", level: 95 }
                ]}
            />
        </div>
      </section>

      {/* SYSTEM CREDENTIALS Flip-Cards Deck */}
      <section className="space-y-20">
         <motion.div variants={itemVariants} className="flex items-center gap-8">
            <div className="w-24 h-[1px] bg-[var(--cyan)] opacity-50" />
            <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
               <Award size={18} className="text-[var(--cyan)]" /> System_Credentials
            </h4>
         </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </section>

      {/* PROFESSIONAL ENDORSEMENTS (AnimatedTestimonials) */}
      <section className="space-y-20">
         <motion.div variants={itemVariants} className="flex items-center gap-8">
            <div className="w-24 h-[1px] bg-[var(--accent)] opacity-50" />
            <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
               System_Endorsements // Verified_Peer_Reviews
            </h4>
         </motion.div>

         <AnimatedTestimonials testimonials={testimonials} />
      </section>

      {/* CAREER STATUS & OPPORTUNITIES */}
      <section className="space-y-12">
         <motion.div variants={itemVariants} className="flex items-center gap-8">
            <div className="w-24 h-[1px] bg-[var(--cyan)] opacity-50" />
            <h4 className="text-[12px] font-black font-mono text-[var(--text-bright)] uppercase tracking-[0.8em] flex items-center gap-4">
               Talent_Acquisition_Gateway
            </h4>
         </motion.div>
         
         <InternshipCard />
      </section>
      
      {/* FINAL AUTH FOOTER */}
      <footer className="pt-24 pb-12 opacity-5 text-center pointer-events-none select-none">
          <p className="text-[14px] font-mono font-black uppercase tracking-[3em] italic">System_Integrity_Nominal // Verified_RAF_99</p>
      </footer>
    </motion.div>
  );
}
