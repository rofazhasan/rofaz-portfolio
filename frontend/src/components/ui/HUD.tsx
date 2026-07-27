import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  CloudFog,
  MapPin,
  Sparkles,
  Trophy,
  Navigation,
  HelpCircle,
  X,
  Flame,
  Backpack,
  Sliders,
  Award,
  Terminal,
} from 'lucide-react';
import { useGameStore, WeatherType } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';
import { MiniMap } from './MiniMap';
import { QuestTracker } from './QuestTracker';
import { TouchControls } from './TouchControls';

export const HUD: React.FC = () => {
  const activeZone = useGameStore((s) => s.activeZone);
  const weather = useGameStore((s) => s.weather);
  const audioMuted = useGameStore((s) => s.audioMuted);
  const completionPercentage = useGameStore((s) => s.completionPercentage);
  const coins = useGameStore((s) => s.coins);
  const toast = useGameStore((s) => s.toast);

  const setWeather = useGameStore((s) => s.setWeather);
  const setTimeOfDay = useGameStore((s) => s.setTimeOfDay);
  const toggleAudioMute = useGameStore((s) => s.toggleAudioMute);
  const openModal = useGameStore((s) => s.openModal);

  const [showControls, setShowControls] = useState(false);

  const handleMuteClick = () => {
    toggleAudioMute();
    audioManager.setMuted(!audioMuted);
  };

  const weatherOptions: { type: WeatherType; icon: React.ReactNode; label: string }[] = [
    { type: 'sunny', icon: <Sun className="w-4 h-4 text-amber-400" />, label: 'Sunny' },
    { type: 'golden_hour', icon: <Flame className="w-4 h-4 text-orange-400" />, label: 'Golden Hour' },
    { type: 'night', icon: <Moon className="w-4 h-4 text-indigo-400" />, label: 'Night' },
    { type: 'rain', icon: <CloudRain className="w-4 h-4 text-cyan-400" />, label: 'Rain' },
    { type: 'snow', icon: <Snowflake className="w-4 h-4 text-sky-200" />, label: 'Snow' },
    { type: 'fog', icon: <CloudFog className="w-4 h-4 text-slate-300" />, label: 'Fog' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-4 md:p-6">
      {/* Mobile Virtual Joystick & Touch Action Buttons */}
      <TouchControls />

      {/* Top Header Bar */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        {/* Left: Branding, Zone Badge & Quest Tracker */}
        <div className="flex flex-col gap-3">
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/30 text-blue-400 border border-blue-400/30">
                <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <div>
                <h1 className="font-heading text-sm font-bold tracking-wide text-white">
                  RAFIU UNIVERSITY 3D
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                  <span>{activeZone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quest Mission Tracker Widget */}
          <QuestTracker />
        </div>

        {/* Right: Weather, Minimap, Fast Travel, Achievements, Settings */}
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            {/* Weather Selector Pill */}
            <div className="glass-panel hidden lg:flex items-center gap-1 rounded-2xl p-1.5">
              {weatherOptions.map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => {
                    setWeather(opt.type);
                    if (opt.type === 'night') setTimeOfDay(22);
                    if (opt.type === 'sunny') setTimeOfDay(14);
                    if (opt.type === 'golden_hour') setTimeOfDay(18);
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                    weather === opt.type
                      ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-lg'
                      : 'hover:bg-white/10 text-slate-400'
                  }`}
                  aria-label={`Change weather to ${opt.label}`}
                  title={opt.label}
                >
                  {opt.icon}
                </button>
              ))}
            </div>

            {/* Achievements & XP Badge Button */}
            <button
              onClick={() => openModal('achievements')}
              className="glass-panel pointer-events-auto hidden md:flex items-center gap-3 rounded-2xl px-4 py-2 hover:border-amber-400/50"
              title="View Achievements"
              aria-label="View achievements"
            >
              <Trophy className="h-4 w-4 text-amber-400" />
              <div className="flex flex-col text-left">
                <div className="flex justify-between text-xs text-slate-300 gap-2">
                  <span>Exploration</span>
                  <span className="font-bold text-amber-400">{completionPercentage}%</span>
                </div>
                <div className="h-1.5 w-20 rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Backpack Inventory Button */}
            <button
              onClick={() => openModal('inventory')}
              className="glass-button pointer-events-auto flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-semibold text-amber-300"
              aria-label="Open Inventory Backpack"
              title="Open Inventory"
            >
              <Backpack className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">Backpack ({coins} 🪙)</span>
            </button>

            {/* Fast Travel Campus Map Button */}
            <button
              onClick={() => openModal('fasttravel')}
              className="glass-button pointer-events-auto flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-semibold text-white"
              aria-label="Open Campus Map Fast Travel"
            >
              <Navigation className="h-4 w-4 text-blue-400" />
              <span className="hidden sm:inline">Campus Map</span>
            </button>

            {/* Engine Debug Panel Toggle Button */}
            <button
              onClick={useGameStore.getState().toggleDebugPanel}
              className="glass-button pointer-events-auto flex h-10 w-10 items-center justify-center rounded-2xl text-slate-200"
              aria-label="Toggle Engine Debug Panel (~)"
              title="Engine Debug Panel (~)"
            >
              <Terminal className="h-4 w-4 text-cyan-400" />
            </button>

            {/* Settings Modal Button */}
            <button
              onClick={() => openModal('settings')}
              className="glass-button pointer-events-auto flex h-10 w-10 items-center justify-center rounded-2xl text-slate-200"
              aria-label="Open Settings"
            >
              <Sliders className="h-4 w-4 text-blue-400" />
            </button>

            {/* Audio Mute Button */}
            <button
              onClick={handleMuteClick}
              className="glass-button pointer-events-auto flex h-10 w-10 items-center justify-center rounded-2xl text-slate-200"
              aria-label={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {audioMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
            </button>
          </div>

          {/* Real-time 2D Mini-Map */}
          <MiniMap />
        </div>
      </header>

      {/* Toast Notification Popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="pointer-events-auto mx-auto glass-panel border-amber-400/40 bg-slate-900/80 max-w-md rounded-2xl p-4 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 font-bold text-amber-400">
              <Sparkles className="h-5 w-5" />
              <span>{toast.title}</span>
            </div>
            <p className="mt-1 text-xs text-slate-200">{toast.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Bar: Action Hint & Controls Modal Toggle */}
      <footer className="hidden sm:flex items-end justify-between gap-4">
        {/* Controls Hint Badge */}
        <div className="pointer-events-auto glass-panel flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-1">
            <kbd className="rounded bg-slate-800 px-2 py-1 font-mono font-bold text-white border border-slate-700">WASD</kbd>
            <span>Move</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1">
            <kbd className="rounded bg-slate-800 px-2 py-1 font-mono font-bold text-white border border-slate-700">SHIFT</kbd>
            <span>Sprint</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1">
            <kbd className="rounded bg-slate-800 px-2 py-1 font-mono font-bold text-white border border-slate-700">SPACE</kbd>
            <span>Jump</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1">
            <kbd className="rounded bg-slate-800 px-2 py-1 font-mono font-bold text-white border border-slate-700">E</kbd>
            <span>Interact</span>
          </div>
        </div>

        {/* Controls Help Modal Toggle */}
        <button
          onClick={() => setShowControls(true)}
          className="glass-button pointer-events-auto flex h-10 w-10 items-center justify-center rounded-2xl text-slate-200"
          aria-label="View Controls Help"
        >
          <HelpCircle className="h-5 w-5 text-blue-400" />
        </button>
      </footer>

      {/* Controls Overlay Modal */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div className="glass-panel w-full max-w-lg rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="font-heading text-lg font-bold text-white">Campus Game Controls</h2>
                <button
                  onClick={() => setShowControls(false)}
                  className="rounded-xl p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
                  <span className="font-mono font-bold text-blue-400">W A S D</span>
                  <span>Walk Character</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
                  <span className="font-mono font-bold text-blue-400">SHIFT</span>
                  <span>Sprint Speed</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
                  <span className="font-mono font-bold text-blue-400">SPACE</span>
                  <span>Jump Physics</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
                  <span className="font-mono font-bold text-blue-400">C</span>
                  <span>Crouch Height</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
                  <span className="font-mono font-bold text-blue-400">E / CLICK</span>
                  <span>Interact with Object</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
                  <span className="font-mono font-bold text-blue-400">MOUSE</span>
                  <span>Camera Orbit & Zoom</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
