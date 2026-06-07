"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, Database, Code2, Globe, Layout, 
  Cloud, Terminal, ArrowUpRight, Cpu, Zap, 
  Layers, Shield, X, Activity, Server, AlertTriangle
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

// SVG Animated Network Pipeline
function ArchitecturePipeline() {
  return (
    <div className="p-6 border border-[var(--border-strong)] bg-black/40 rounded-2xl relative font-mono text-[9px] text-[var(--accent)] space-y-6">
      <div className="flex justify-between items-center text-[8px] opacity-60">
        <span>ARCHITECTURE_PIPELINE // SECURE_DATA_FLOW</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" /> FLOW_ACTIVE</span>
      </div>

      <div className="flex justify-between items-center gap-2 relative py-4">
        {/* SVG Connection Pipeline Paths */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 pointer-events-none z-0 overflow-visible">
          <svg className="w-full h-4 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff41" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#00f3ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00ff41" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Base line */}
            <line x1="5%" y1="8" x2="95%" y2="8" stroke="url(#grid-grad)" strokeWidth="1" />
            {/* Animated data packet circles */}
            <circle cx="10%" cy="8" r="3" fill="#00ff41" className="animate-[move-packet-1_3s_infinite_linear]" />
            <circle cx="10%" cy="8" r="3" fill="#00f3ff" className="animate-[move-packet-2_3s_infinite_linear_1s]" />
            <circle cx="10%" cy="8" r="3" fill="#00ff41" className="animate-[move-packet-3_3s_infinite_linear_2s]" />
          </svg>
        </div>

        {/* Nodes */}
        {[
          { name: "CLIENT", desc: "NextJS Node" },
          { name: "PROXY", desc: "NGINX Core" },
          { name: "BACKEND", desc: "Axum API" },
          { name: "DATABASE", desc: "PostgreSQL" }
        ].map((node, i) => (
          <div key={i} className="z-10 bg-black border border-[var(--border-strong)] px-3 py-2.5 rounded-xl text-center space-y-1 hover:border-[var(--accent)] transition-colors min-w-[65px] sm:min-w-[85px] shadow-lg">
            <span className="font-black text-white text-[9px] block tracking-wide">{node.name}</span>
            <span className="text-[7.5px] text-[var(--text-muted)] block font-medium">{node.desc}</span>
          </div>
        ))}
      </div>
      
      {/* Inline styles for custom keyframes */}
      <style jsx>{`
        @keyframes move-packet-1 {
          0% { cx: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 90%; opacity: 0; }
        }
        @keyframes move-packet-2 {
          0% { cx: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 90%; opacity: 0; }
        }
        @keyframes move-packet-3 {
          0% { cx: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Hologram 3D Shapes based on Project Type
function HologramShape({ category }: { category: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.6;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = -t * 0.2;
    }
  });

  const color = "#00ff41";

  if (category.includes("MOBILE")) {
    return (
      <group ref={groupRef}>
        {/* Smartphone mockup wireframe */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2.2, 4.5, 0.2]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, -2.1, 0.15]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
      </group>
    );
  }

  if (category.includes("BACKEND") || category.includes("DATABASE")) {
    return (
      <group ref={groupRef}>
        {/* Database cylinders stack */}
        <group ref={meshRef as any}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.8, 16]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.8, 16]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.8, 16]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </group>
    );
  }

  // default to complex sphere/network node for AI/API
  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh scale={1.3}>
        <dodecahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

// Project Details Data
const projectData = [
  { 
    name: "FinTrack::Mobile", 
    categories: ["MOBILE", "SYSTEM DESIGN"], 
    tech: ["React Native", "Firebase", "Real-time Sync", "Encrypted Cache"], 
    desc: "Cross-platform personal finance architecture. Engineered with Firebase synchronization and interactive dashboards for category-based expense visualization and secure asset tracking.",
    icon: <Database size={24} />,
    color: "accent",
    endpoints: ["POST /api/v1/auth/login", "GET /api/v1/transactions", "POST /api/v1/transactions/sync"],
    specs: "Memory Footprint: <22MB, Synchronization latency: ~85ms average, AES-256 local keystore encryption."
  },
  { 
    name: "Hostel::MealLog", 
    categories: ["BACKEND"], 
    tech: ["Node.js", "PostgreSQL", "Role-Auth", "CRUD"], 
    desc: "Institutional logistical system for meal management. Features sophisticated role-based access protocols and optimized database queries for massive institutional scalability.",
    icon: <Code2 size={24} />,
    color: "cyan",
    endpoints: ["GET /api/meals/daily", "POST /api/meals/record", "PUT /api/meals/reconciliation"],
    specs: "Query performance: 4.2ms index scans, SQL transaction locks for concurrent audit logs."
  },
  { 
    name: "Atmosphere::API", 
    categories: ["BACKEND", "AI"], 
    tech: ["FastAPI", "RESTful", "Analytics", "Logging"], 
    desc: "High-performance weather intelligence gateway. Integrated real-time data logging and user query tracking for environmental analytics and predictive trend modeling.",
    icon: <Globe size={24} />,
    color: "accent",
    endpoints: ["GET /api/v1/weather/realtime", "POST /api/v1/weather/predict", "GET /api/v1/analytics/queries"],
    specs: "Throughput: 850req/sec, Machine Learning model hot-swapping enabled."
  },
  { 
    name: "Routine::Kernel", 
    categories: ["SYSTEM DESIGN", "BACKEND"], 
    tech: ["Python", "Flask", "Modular Logic", "Automation"], 
    desc: "Digital Class Routine Generator utilizing modular backend logic for dynamic CRUD-based scheduling. Engineered to handle complex institutional multi-node time-table synchronization.",
    icon: <Layout size={24} />,
    color: "cyan",
    endpoints: ["POST /kernel/routine/generate", "GET /kernel/routine/conflict-check"],
    specs: "Backtracking scheduling algorithm resolver latency: <450ms for 120 overlapping parameters."
  },
  { 
    name: "Salah::Sync", 
    categories: ["MOBILE", "BACKEND"], 
    tech: ["JavaScript", "Public API", "Responsive UX", "WPO"], 
    desc: "Ultra-accessible religious synchronization application utilizing public APIs for real-time prayer timing accuracy. Focused on extreme UI simplicity and global accessibility markers.",
    icon: <Cloud size={24} />,
    color: "accent",
    endpoints: ["GET /sync/prayer-times", "GET /sync/coordinates"],
    specs: "Asset payload weight: <45KB total footprint, fully usable in low bandwidth edge networks."
  }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["ALL", "BACKEND", "MOBILE", "AI", "SYSTEM DESIGN"];

  // Filter projects list
  const filteredProjects = selectedCategory === "ALL" 
    ? projectData 
    : projectData.filter(p => p.categories.includes(selectedCategory));

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-[1400px] mx-auto px-8 md:px-24 py-24 space-y-24 relative z-10"
    >
      {/* HUD PROJECT HEADER */}
      <motion.div variants={itemVariants} className="space-y-10 border-b border-[var(--border-strong)] pb-12">
          <div className="flex items-center gap-4">
            <Terminal size={14} className="text-[var(--accent)] animate-pulse" />
            <p className="text-[10px] text-[var(--accent)] font-mono tracking-[0.8em] uppercase font-black">Archive_Index // Recursive_Retrieval_v3.0</p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-end gap-16">
            <h2 className="text-7xl md:text-[10rem] font-display font-black text-[var(--text-bright)] italic uppercase tracking-tighter leading-[0.8]">
              System <br /> <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-1000">Inventory</span>
            </h2>
            <div className="max-w-xl space-y-8">
              <p className="text-[var(--text-muted)] text-sm md:text-lg font-mono tracking-widest uppercase opacity-80 leading-relaxed font-bold">
                Analyzing {filteredProjects.length} loaded architectures categorized by <span className="text-[var(--accent)]">High-Intensity Performance</span> metrics and Scalable Cloud potential.
              </p>
              <div className="flex gap-12 text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-[0.3em] font-black border-l-2 border-[var(--border-strong)] pl-8">
                <span>STABILITY: NOMINAL</span>
                <span>AUTH: ROOT_ACCESS</span>
              </div>
            </div>
          </div>
      </motion.div>

      {/* FILTER TABS */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 border-b border-[var(--border)] pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 font-mono text-[10px] tracking-widest uppercase rounded-xl transition-all border ${
              selectedCategory === cat 
                ? "bg-[var(--accent)] text-black font-black border-[var(--accent)] shadow-[0_0_20px_var(--glow)]" 
                : "glass-panel text-[var(--text-muted)] hover:text-[var(--text-bright)] border-[var(--border)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
      
      {/* SPATIAL MODULE GRID */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, idx) => (
            <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={p.name} 
                whileHover={{ y: -15, scale: 1.01 }}
                onClick={() => setSelectedProject(p)}
                className="group glass-panel p-12 rounded-[3.5rem] border border-[var(--border-strong)] hover:border-[var(--accent)] transition-all duration-500 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[520px] cursor-pointer bg-blueprint/5"
            >
                {/* Visual Depth Flair */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--glow)] rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
                
                <div className="space-y-12 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`p-6 rounded-3xl bg-[var(--bg)] text-[var(--${p.color})] shadow-inner group-hover:scale-110 transition-transform duration-500 border border-[var(--border)]`}>
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
                  
                  <div className="flex items-center gap-6 text-[11px] font-mono text-[var(--text-dim)] group-hover:text-[var(--accent)] font-black tracking-[0.4em] transition-all border-t border-[var(--border-strong)] pt-8">
                      <span>AUDIT_NODE_SPECS</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </div>
                </div>
            </motion.div>
          ))}
          
          {/* Decorative Command Pad */}
          <motion.div 
            layout
            key="cmd-pad"
            variants={itemVariants} 
            className="p-12 glass-panel rounded-[3.5rem] border border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center text-center space-y-8 opacity-20 hover:opacity-80 transition-all group cursor-help min-h-[520px]"
          >
             <div className="p-8 rounded-full border border-[var(--border)] animate-pulse group-hover:border-[var(--accent)] transition-colors">
                <Cpu size={48} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
             </div>
             <p className="text-[11px] font-mono tracking-[0.4em] uppercase font-black leading-loose italic">Awaiting_Next <br /> Functional_Architecture <br /> Protocol...</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* HOLOGRAM INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[85vh] glass-panel rounded-[2.5rem] border border-[var(--border-strong)] bg-[#000]/95 flex flex-col md:grid md:grid-cols-12 overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-[280] p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>

              {/* Col 1: 3D Hologram (5 Cols) */}
              <div className="col-span-5 border-b md:border-b-0 md:border-r border-[var(--border-strong)] bg-blueprint relative flex flex-col justify-between p-8 min-h-[300px] md:min-h-full">
                <div className="flex justify-between items-center text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase">
                  <span className="flex items-center gap-2"><Activity size={10} className="animate-pulse" /> HOLO_CORE_LOADED</span>
                  <span>ROT_Z: 0.05</span>
                </div>

                {/* 3D WebGL Canvas */}
                <div className="flex-1 w-full flex items-center justify-center relative min-h-[200px]">
                  {mounted && (
                    <div className="absolute inset-0 z-0">
                      <Canvas camera={{ position: [0, 0, 7] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} />
                        <HologramShape category={selectedProject.categories[0]} />
                      </Canvas>
                    </div>
                  )}
                  {/* Neon Grid Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>

                <div className="space-y-2 font-mono text-[9px] text-[var(--text-muted)] text-center leading-loose">
                  <p>INTERACTIVE GL_OBJECT // ROTATE MOUSE OR TOUCH</p>
                  <p>TARGET: {selectedProject.name.toUpperCase()}</p>
                </div>
              </div>

              {/* Col 2: Specifications (7 Cols) */}
              <div className="col-span-7 p-10 md:p-14 flex flex-col justify-between overflow-y-auto space-y-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[var(--accent)] tracking-[0.5em] font-black uppercase">SPECIFICATION NODE</span>
                    <h3 className="text-5xl font-display font-black italic uppercase text-glow text-white">{selectedProject.name}</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-300 font-body">{selectedProject.desc}</p>
                  
                  {/* Visual SVG Data Pipeline */}
                  <ArchitecturePipeline />
                  
                  <div className="space-y-4 font-mono text-[11px]">
                    <div className="flex items-center gap-3 text-[var(--accent)] font-bold tracking-widest"><Server size={14} /> ACTIVE API ENDPOINTS</div>
                    <div className="space-y-2.5">
                      {selectedProject.endpoints.map((ep: string) => (
                        <div key={ep} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 font-semibold text-gray-200">
                          <Terminal size={12} className="text-glow text-[var(--accent)]" /> {ep}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-[var(--border-strong)]">
                  <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-start gap-4 font-mono text-[10px] text-yellow-300/80 leading-normal">
                    <AlertTriangle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-yellow-400">HARDWARE BENCHMARK SPECS:</span><br />
                      {selectedProject.specs}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-mono text-[10px] tracking-widest uppercase transition-all"
                    >
                      DISCONNECT SPECS
                    </button>
                    <a 
                      href="https://github.com/rofazhasan" 
                      target="_blank" 
                      className="flex-1 py-4 bg-[var(--accent)] text-black hover:scale-[1.02] transition-transform text-center rounded-xl font-mono text-[10px] tracking-widest font-black uppercase shadow-[0_0_20px_var(--glow)] flex items-center justify-center gap-2"
                    >
                      OPEN REPOSITORY <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM METRICS FOOTER */}
      <motion.div variants={itemVariants} className="pt-24 opacity-5 flex flex-col items-center gap-6 pointer-events-none select-none text-center">
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
