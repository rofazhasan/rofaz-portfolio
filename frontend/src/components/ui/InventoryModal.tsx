import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Backpack, Trophy, Sparkles, Coins } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const InventoryModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);
  const coins = useGameStore((s) => s.coins);
  const inventory = useGameStore((s) => s.inventory);
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const xp = useGameStore((s) => s.xp);

  if (activeModal !== 'inventory') return null;

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

          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/30 text-amber-400 border border-amber-500/30">
              <Backpack className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">Player Inventory & Badges</h2>
              <p className="text-xs text-slate-400">Total XP: {xp} | Innovation Coins: {coins}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Inventory Items */}
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Coins className="h-4 w-4 text-amber-400" /> Collected Items
              </h3>
              <div className="mt-3 space-y-2">
                {inventory.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-slate-900/60 p-3 border border-slate-800">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlocked Badges */}
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Trophy className="h-4 w-4 text-amber-400" /> Unlocked Badges ({unlockedAchievements.length})
              </h3>
              <div className="mt-3 space-y-2">
                {unlockedAchievements.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No achievements unlocked yet. Explore campus buildings to earn badges!</p>
                ) : (
                  unlockedAchievements.map((badgeId, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-2xl bg-blue-950/40 p-3 border border-blue-500/30">
                      <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{badgeId.toUpperCase()}</h4>
                        <p className="text-[10px] text-blue-300">Mastery Badge Granted</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
