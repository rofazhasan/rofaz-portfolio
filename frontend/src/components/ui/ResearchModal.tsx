import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Search } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const ResearchModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);

  if (activeModal !== 'research') return null;

  const papers = [
    {
      title: 'Autonomous Reasoning in Multi-Agent Neural Topologies',
      journal: 'Journal of Artificial Intelligence Research (JAIR) 2025',
      citations: 142,
      abstract: 'We present a novel graph-attention framework for dynamic routing in multi-agent LLM systems, achieving 40% reduction in token latency while improving tool invocation accuracy.',
    },
    {
      title: 'Sub-10ms WebGL Instancing Pipelines for Complex Spatial Foliage',
      journal: 'IEEE Transactions on Visualization and Computer Graphics',
      citations: 89,
      abstract: 'This paper details an instanced vertex displacement shader technique for real-time wind and foliage physics in browser environments.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 rounded-2xl bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-600/30 text-cyan-400 border border-cyan-500/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">AI Research Papers & Citation Graph</h2>
              <p className="text-xs text-slate-400">Peer-reviewed publications & academic contributions</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {papers.map((paper, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900/60 p-4 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400">{paper.journal}</span>
                <h3 className="mt-1 text-sm font-bold text-white">{paper.title}</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{paper.abstract}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span>Citations: <strong className="text-white">{paper.citations}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
