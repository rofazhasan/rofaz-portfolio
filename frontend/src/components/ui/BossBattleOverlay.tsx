import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Zap, Cpu, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const BossBattleOverlay: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const openModal = useGameStore((s) => s.openModal);

  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [combatLog, setCombatLog] = useState<string[]>([
    '👾 A Wild Debug Monster (NullPointer Golem) has appeared!',
  ]);
  const [isVictory, setIsVictory] = useState(false);

  if (activeModal !== 'boss') return null;

  const handleAttack = (spellName: string, dmg: number) => {
    audioManager.playUIClick();
    const newBossHp = Math.max(0, bossHp - dmg);
    setBossHp(newBossHp);

    setCombatLog((prev) => [
      `⚡ You cast [ ${spellName} ] dealing ${dmg} DAMAGE to Debug Monster!`,
      ...prev,
    ]);

    if (newBossHp === 0) {
      setIsVictory(true);
      audioManager.playAchievement();
      unlockAchievement('boss_defeated', 'Bug Slayer Supreme', 'Defeated the Debug Monster & unlocked 100% Campus Mastery!', 500);
    } else {
      // Boss counter attack
      setTimeout(() => {
        const counterDmg = Math.floor(Math.random() * 10) + 5;
        setPlayerHp((prev) => Math.max(10, prev - counterDmg));
        setCombatLog((prev) => [
          `🔥 Debug Monster cast [ Memory Leak ] dealing ${counterDmg} DMG!`,
          ...prev,
        ]);
      }, 400);
    }
  };

  const handleClaimReward = () => {
    closeModal();
    openModal('resume');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl border-red-500/40"
        >
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 rounded-2xl bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {!isVictory ? (
            <div>
              {/* Boss Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/30 text-red-400 border border-red-500/40 shadow-xl">
                  <ShieldAlert className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">
                    BOSS BATTLE: NULLPOINTER GOLEM
                  </h2>
                  <p className="text-xs text-red-400">Level 99 Debug Guardian</p>
                </div>
              </div>

              {/* Boss Health Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Monster Health</span>
                  <span className="text-red-400">{bossHp} / 100 HP</span>
                </div>
                <div className="mt-1.5 h-3 w-full rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>

              {/* Player Health Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Rafiu's Dev Shield</span>
                  <span className="text-blue-400">{playerHp} / 100 HP</span>
                </div>
                <div className="mt-1.5 h-2.5 w-full rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>

              {/* Spell Action Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleAttack('Deploy Hotfix', 35)}
                  className="glass-button flex items-center justify-center gap-2 rounded-2xl bg-blue-600/30 p-3 text-xs font-bold text-blue-300 border border-blue-400/40"
                >
                  <Zap className="h-4 w-4" />
                  <span>Deploy Hotfix (35 DMG)</span>
                </button>
                <button
                  onClick={() => handleAttack('Refactor Shader', 30)}
                  className="glass-button flex items-center justify-center gap-2 rounded-2xl bg-purple-600/30 p-3 text-xs font-bold text-purple-300 border border-purple-400/40"
                >
                  <Cpu className="h-4 w-4" />
                  <span>Refactor Shader (30 DMG)</span>
                </button>
                <button
                  onClick={() => handleAttack('AI Overdrive', 45)}
                  className="glass-button flex items-center justify-center gap-2 rounded-2xl bg-amber-600/30 p-3 text-xs font-bold text-amber-300 border border-amber-400/40"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>AI Overdrive (45 DMG)</span>
                </button>
              </div>

              {/* Combat Log */}
              <div className="mt-6 h-28 overflow-y-auto rounded-2xl bg-slate-900/80 p-3 text-xs font-mono text-slate-300 border border-slate-800 space-y-1">
                {combatLog.map((log, idx) => (
                  <p key={idx}>{log}</p>
                ))}
              </div>
            </div>
          ) : (
            /* Victory Screen */
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-400/40 shadow-2xl">
                <Trophy className="h-8 w-8" />
              </div>
              <h2 className="mt-4 font-heading text-2xl font-extrabold text-white">
                VICTORY! DEBUG MONSTER DEFEATED
              </h2>
              <p className="mt-1 text-sm text-amber-400 font-semibold">
                🎉 100% Portfolio Mastery & Bug Slayer Achievement Unlocked (+500 XP)!
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleClaimReward}
                  className="glass-button flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-xl"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Claim Resume & Recruiter Reward</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
