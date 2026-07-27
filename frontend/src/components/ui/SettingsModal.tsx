import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Sliders, Monitor } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const SettingsModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);

  const audioMuted = useGameStore((s) => s.audioMuted);
  const bgmVolume = useGameStore((s) => s.bgmVolume);
  const sfxVolume = useGameStore((s) => s.sfxVolume);
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);

  const toggleAudioMute = useGameStore((s) => s.toggleAudioMute);
  const setBgmVolume = useGameStore((s) => s.setBgmVolume);
  const setSfxVolume = useGameStore((s) => s.setSfxVolume);
  const setGraphicsQuality = useGameStore((s) => s.setGraphicsQuality);

  if (activeModal !== 'settings') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-panel relative w-full max-w-lg rounded-3xl p-6 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-title"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-heading text-lg font-bold text-white" id="settings-title">
              <Sliders className="h-5 w-5 text-blue-400" />
              <span>Campus Game Settings</span>
            </div>
            <button
              onClick={closeModal}
              aria-label="Close settings"
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6 text-sm text-slate-200">
            {/* Audio Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Audio Mute Toggle</span>
                <button
                  onClick={() => {
                    toggleAudioMute();
                    audioManager.setMuted(!audioMuted);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    audioMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {audioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span>{audioMuted ? 'Muted' : 'Audio Enabled'}</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Master SFX Volume: {Math.round(sfxVolume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sfxVolume}
                  onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Graphics Section */}
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <span className="flex items-center gap-2 font-semibold text-white">
                <Monitor className="h-4 w-4 text-purple-400" />
                <span>WebGL Graphics Quality</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setGraphicsQuality(q)}
                    className={`rounded-xl py-2 text-xs font-bold uppercase transition-all ${
                      graphicsQuality === q
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
