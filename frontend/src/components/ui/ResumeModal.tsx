import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Globe, Mail, Briefcase, GraduationCap, Code } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const ResumeModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);

  if (activeModal !== 'resume') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 rounded-2xl bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white">
                Md. Rofaz Hasan Rafiu
              </h2>
              <p className="mt-1 text-sm text-blue-400 font-semibold">
                Lead AI & Full-Stack Systems Engineer
              </p>
            </div>

            <a
              href="https://github.com/rofazhasan"
              target="_blank"
              rel="noreferrer"
              className="glass-button flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30"
            >
              <Download className="h-4 w-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          {/* Experience Section */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 font-heading text-base font-bold text-white">
              <Briefcase className="h-5 w-5 text-blue-400" /> Professional Experience
            </h3>

            <div className="mt-4 space-y-4 border-l-2 border-slate-800 pl-4">
              <div>
                <span className="text-xs font-bold text-blue-400">2024 – Present</span>
                <h4 className="text-sm font-bold text-white">Lead AI Systems Architect</h4>
                <p className="text-xs text-slate-400">Autonomous AI & Deep Learning Research</p>
                <p className="mt-1 text-xs text-slate-300">
                  Architected multi-agent autonomous reasoning engines, optimized deep neural models for sub-10ms inference, and built high-frequency WebGL rendering pipelines.
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-blue-400">2022 – 2024</span>
                <h4 className="text-sm font-bold text-white">Senior Full-Stack Engineer</h4>
                <p className="text-xs text-slate-400">Cloud & Distributed Infrastructure</p>
                <p className="mt-1 text-xs text-slate-300">
                  Engineered zero-trust microservice telemetry tools, managed Kubernetes clusters serving 1M+ daily active requests, and implemented real-time WebSockets synchronization.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Skills */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-base font-bold text-white">
                <GraduationCap className="h-5 w-5 text-blue-400" /> Education
              </h3>
              <div className="mt-3">
                <h4 className="text-sm font-bold text-white">B.Sc. in Computer Science & Engineering</h4>
                <p className="text-xs text-slate-400">Focus: Artificial Intelligence & Computer Vision</p>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-heading text-base font-bold text-white">
                <Code className="h-5 w-5 text-blue-400" /> Contact & Social Terminals
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="https://github.com/rofazhasan"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-button flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-200"
                >
                  <Code className="h-4 w-4 text-slate-300" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-button flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-blue-300"
                >
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:contact@rofazhasan.com"
                  className="glass-button flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-emerald-300"
                >
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
