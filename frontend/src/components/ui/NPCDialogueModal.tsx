import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Award, ChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const NPCDialogueModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const activeNPC = useGameStore((s) => s.activeNPC);
  const closeModal = useGameStore((s) => s.closeModal);
  const addInventoryItem = useGameStore((s) => s.addInventoryItem);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  const [dialogueIndex, setDialogueIndex] = useState(0);

  if (activeModal !== 'npc_dialogue' || !activeNPC) return null;

  const hasNext = dialogueIndex < activeNPC.dialogue.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      if (activeNPC.questReward) {
        addInventoryItem(activeNPC.questReward);
        unlockAchievement(`npc_${activeNPC.id}`, `Spoke with ${activeNPC.name}`, `Completed briefing with ${activeNPC.name}`, activeNPC.questReward.xp);
      }
      closeModal();
      setDialogueIndex(0);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="glass-panel relative w-full max-w-lg rounded-3xl p-6 shadow-2xl border-blue-500/30"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeNPC.avatar}</span>
              <div>
                <h3 className="font-heading text-base font-bold text-white">{activeNPC.name}</h3>
                <p className="text-xs text-blue-400">{activeNPC.title}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-200 leading-relaxed min-h-24">
            <p>{activeNPC.dialogue[dialogueIndex]}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Dialogue {dialogueIndex + 1} of {activeNPC.dialogue.length}
            </span>
            <button
              onClick={handleNext}
              className="glass-button flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30"
            >
              <span>{hasNext ? 'Next Dialogue' : 'Complete Briefing'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
