import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, Layers, Box, Eye, Radio, X, Terminal } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const DebugPanel: React.FC = () => {
  const showDebugPanel = useGameStore((s) => s.showDebugPanel);
  const toggleDebugPanel = useGameStore((s) => s.toggleDebugPanel);
  const perfMetrics = useGameStore((s) => s.perfMetrics);
  const activeZone = useGameStore((s) => s.activeZone);
  const neighborZones = useGameStore((s) => s.neighborZones);
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);
  const setGraphicsQuality = useGameStore((s) => s.setGraphicsQuality);

  const [fpsHistory, setFpsHistory] = useState<number[]>([]);
  const [currentFps, setCurrentFps] = useState(60);
  const [frameTime, setFrameTime] = useState(16.6);

  // Monitor FPS locally
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = () => {
      const now = performance.now();
      const delta = now - lastTime;
      frameCount++;

      if (delta >= 500) {
        const measuredFps = Math.round((frameCount * 1000) / delta);
        const measuredFrameTime = parseFloat((delta / frameCount).toFixed(1));
        setCurrentFps(measuredFps);
        setFrameTime(measuredFrameTime);
        setFpsHistory((prev) => [...prev.slice(-19), measuredFps]);

        frameCount = 0;
        lastTime = now;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Global shortcut handler (~ or Backquote key)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        toggleDebugPanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDebugPanel]);

  if (!showDebugPanel) return null;

  return (
    <div className="pointer-events-auto fixed top-4 left-4 z-50 w-80 rounded-2xl border border-cyan-500/30 bg-slate-950/90 p-4 font-mono text-xs text-cyan-300 shadow-2xl backdrop-blur-md">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
        <div className="flex items-center gap-2 font-bold text-cyan-400">
          <Terminal className="h-4 w-4" />
          <span>ENGINE DEBUG PANEL</span>
        </div>
        <button
          onClick={toggleDebugPanel}
          className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-900/80 p-2.5 border border-cyan-500/20">
          <div className="text-[10px] text-slate-400">FPS / FRAME TIME</div>
          <div className="text-lg font-bold text-emerald-400">
            {currentFps} <span className="text-xs text-slate-400">({frameTime}ms)</span>
          </div>
        </div>
        <div className="rounded-xl bg-slate-900/80 p-2.5 border border-cyan-500/20">
          <div className="text-[10px] text-slate-400">DRAW CALLS</div>
          <div className="text-lg font-bold text-amber-400">{perfMetrics.drawCalls}</div>
        </div>
        <div className="rounded-xl bg-slate-900/80 p-2.5 border border-cyan-500/20">
          <div className="text-[10px] text-slate-400">TRIANGLES</div>
          <div className="text-sm font-bold text-cyan-400">{perfMetrics.triangles.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-900/80 p-2.5 border border-cyan-500/20">
          <div className="text-[10px] text-slate-400">VISIBLE MESHES</div>
          <div className="text-sm font-bold text-indigo-400">{perfMetrics.visibleObjects}</div>
        </div>
      </div>

      {/* Zone Streaming Info */}
      <div className="mt-3 rounded-xl bg-slate-900/80 p-2.5 border border-cyan-500/20">
        <div className="text-[10px] text-slate-400 flex items-center justify-between">
          <span>ACTIVE STREAMING ZONE</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
        <div className="mt-1 text-xs font-bold text-white">{activeZone}</div>

        <div className="mt-2 text-[10px] text-slate-400">LOADED NEIGHBOR ZONES</div>
        <div className="mt-1 flex flex-wrap gap-1">
          {neighborZones.map((z, i) => (
            <span key={i} className="rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] text-cyan-300 border border-cyan-800/40">
              {z.split(':')[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Asset Memory Info */}
      <div className="mt-3 rounded-xl bg-slate-900/80 p-2.5 border border-cyan-500/20">
        <div className="text-[10px] text-slate-400">WEBGL MEMORY ASSETS</div>
        <div className="mt-1 flex justify-between text-xs">
          <span>Geometries: <strong className="text-cyan-300">{perfMetrics.geometries}</strong></span>
          <span>Textures: <strong className="text-cyan-300">{perfMetrics.textures}</strong></span>
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span>Physics Bodies: <strong className="text-cyan-300">{perfMetrics.physicsBodies}</strong></span>
        </div>
      </div>

      {/* Quality Preset Quick Selector */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900/80 p-2 border border-cyan-500/20">
        <span className="text-[10px] text-slate-400">QUALITY PRESET:</span>
        <div className="flex gap-1">
          {(['ultra', 'high', 'medium', 'low'] as const).map((q) => (
            <button
              key={q}
              onClick={() => setGraphicsQuality(q)}
              className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-bold transition-all ${
                graphicsQuality === q
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
