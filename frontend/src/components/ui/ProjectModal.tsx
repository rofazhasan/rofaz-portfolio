import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code, Cpu, Play, CheckCircle2, Layers } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const ProjectModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const selectedProject = useGameStore((s) => s.selectedProject);
  const closeModal = useGameStore((s) => s.closeModal);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'case_study'>('overview');

  if (activeModal !== 'project' || !selectedProject) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            aria-label="Close project showcase"
            className="absolute right-6 top-6 rounded-2xl bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Category & Performance Badges */}
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30">
              {selectedProject.category}
            </span>
            {selectedProject.metrics && (
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                ⚡ {selectedProject.metrics}
              </span>
            )}
          </div>

          <h2 id="project-title" className="mt-3 font-heading text-2xl md:text-3xl font-extrabold text-white">
            {selectedProject.title}
          </h2>
          <p className="mt-1 text-sm text-slate-300">{selectedProject.subtitle}</p>

          {/* Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview & Demo
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Architecture & Tech
            </button>
            <button
              onClick={() => setActiveTab('case_study')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'case_study'
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Case Study & Impact
            </button>
          </div>

          {/* Tab 1: Overview & Video Stream Preview */}
          {activeTab === 'overview' && (
            <div className="mt-4 space-y-4">
              <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-900/80 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-slate-900 to-indigo-900/40" />
                <div className="relative flex flex-col items-center gap-3 text-center px-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/40 text-blue-400 border border-blue-400/40 shadow-xl">
                    <Play className="h-7 w-7 fill-current ml-1" />
                  </div>
                  <span className="font-heading text-sm font-bold text-white">
                    Interactive 4K Stream Preview Active
                  </span>
                  <span className="text-xs text-slate-400">
                    Real-Time Physical Physics Model & WebGL Shaders
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>
            </div>
          )}

          {/* Tab 2: Architecture & Tech */}
          {activeTab === 'architecture' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-900/60 p-4 border border-slate-800">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Cpu className="h-4 w-4 text-blue-400" /> System Features
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-900/60 p-4 border border-slate-800">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Layers className="h-4 w-4 text-purple-400" /> Technology Stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-blue-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Case Study & Impact */}
          {activeTab === 'case_study' && (
            <div className="mt-4 rounded-2xl bg-slate-900/60 p-4 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
              <h3 className="font-bold text-sm text-white">Engineering Case Study & Impact</h3>
              <p>
                {selectedProject.caseStudy ||
                  `Designed and architected to solve complex scalability bottlenecks. Implemented end-to-end automation, strict type safety, real-time telemetry, and microsecond response times.`}
              </p>
              {selectedProject.awards && (
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <span className="font-bold text-amber-400">Awards & Recognition:</span>
                  <ul className="mt-1 space-y-1">
                    {selectedProject.awards.map((award, idx) => (
                      <li key={idx} className="text-slate-300">🏆 {award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30"
              >
                <span>Launch Live Production Demo</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-200"
              >
                <Code className="h-4 w-4 text-slate-300" />
                <span>View GitHub Source Code</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
