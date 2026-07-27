import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles, Award } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const AchievementsModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const xp = useGameStore((s) => s.xp);
  const completionPercentage = useGameStore((s) => s.completionPercentage);

  if (activeModal !== 'achievements') return null;

  const allBadges = [
    { id: 'welcome_campus', title: 'Campus Freshman', desc: 'Step foot into Rafiu University Campus', xp: 100, icon: '🎓' },
    { id: 'project_inspected', title: 'Engineer At Work', desc: 'Inspect physical project exhibition in Engineering', xp: 200, icon: '⚙️' },
    { id: 'library_explored', title: 'Campus Scholar', desc: 'Explore the Rafiu University Library & Biography', xp: 150, icon: '📖' },
    { id: 'resume_downloaded', title: 'Recruiter Connect', desc: 'Open Rafiu\'s Holographic Resume Terminal', xp: 200, icon: '📄' },
    { id: 'standing_ovation', title: 'Standing Ovation', desc: 'Trigger crowd applause in the Auditorium', xp: 200, icon: '👏' },
    { id: 'fast_traveler', title: 'Master Navigator', desc: 'Use Fast Travel map to teleport across campus', xp: 150, icon: '⚡' },
    { id: 'secret_found', title: 'Secret Laboratory Pioneer', desc: 'Discover the hidden underground AI research cave', xp: 300, icon: '🧪' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-panel relative w-full max-w-xl rounded-3xl p-6 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievements-title"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-heading text-lg font-bold text-amber-400" id="achievements-title">
              <Trophy className="h-5 w-5" />
              <span>Campus Badges & Achievements</span>
            </div>
            <button
              onClick={closeModal}
              aria-label="Close achievements"
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-amber-500/10 p-4 border border-amber-500/20">
            <div>
              <div className="text-xs font-semibold text-slate-300">Total Experience XP</div>
              <div className="font-heading text-xl font-black text-amber-400">{xp} XP</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">Exploration Score</div>
              <div className="font-heading text-xl font-black text-blue-400">{completionPercentage}%</div>
            </div>
          </div>

          <div className="mt-6 max-h-80 overflow-y-auto space-y-3 pr-1">
            {allBadges.map((badge) => {
              const isUnlocked = unlockedAchievements.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`flex items-center gap-4 rounded-2xl p-3.5 transition-all ${
                    isUnlocked
                      ? 'bg-slate-900/80 border border-amber-400/30'
                      : 'bg-slate-950/40 opacity-50 border border-slate-800'
                  }`}
                >
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <span>{badge.title}</span>
                      {isUnlocked && <Sparkles className="h-4 w-4 text-amber-400" />}
                    </div>
                    <p className="text-xs text-slate-400">{badge.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+{badge.xp} XP</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
