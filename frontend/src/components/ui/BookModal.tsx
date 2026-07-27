import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const BookModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const selectedProject = useGameStore((s) => s.selectedProject) as any;
  const closeModal = useGameStore((s) => s.closeModal);

  if (activeModal !== 'book' || !selectedProject) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 rounded-2xl bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">
                {selectedProject.title}
              </h2>
              <p className="text-xs text-slate-400">{selectedProject.subtitle}</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {selectedProject.text}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
