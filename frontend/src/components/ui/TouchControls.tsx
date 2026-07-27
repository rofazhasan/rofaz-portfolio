import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, Play } from 'lucide-react';
import { audioManager } from '@/audio/AudioManager';

export const TouchControls: React.FC = () => {
  const isGrounded = useGameStore((s) => s.isGrounded);
  const showToast = useGameStore((s) => s.showToast);

  const simulateKeyDown = (code: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code }));
  };

  const simulateKeyUp = (code: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { code }));
  };

  return (
    <div className="pointer-events-auto fixed bottom-6 left-6 right-6 z-40 flex items-end justify-between sm:hidden select-none">
      {/* Left: Directional D-Pad Touch Buttons */}
      <div className="grid grid-cols-3 gap-1.5 w-36 h-36 p-2 glass-panel rounded-3xl bg-slate-900/60 backdrop-blur-md">
        <div />
        <button
          onTouchStart={() => simulateKeyDown('KeyW')}
          onTouchEnd={() => simulateKeyUp('KeyW')}
          className="flex items-center justify-center rounded-2xl bg-blue-600/40 active:bg-blue-600 text-white border border-blue-400/30"
          aria-label="Move Forward"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
        <div />

        <button
          onTouchStart={() => simulateKeyDown('KeyA')}
          onTouchEnd={() => simulateKeyUp('KeyA')}
          className="flex items-center justify-center rounded-2xl bg-blue-600/40 active:bg-blue-600 text-white border border-blue-400/30"
          aria-label="Move Left"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onTouchStart={() => simulateKeyDown('KeyS')}
          onTouchEnd={() => simulateKeyUp('KeyS')}
          className="flex items-center justify-center rounded-2xl bg-blue-600/40 active:bg-blue-600 text-white border border-blue-400/30"
          aria-label="Move Backward"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
        <button
          onTouchStart={() => simulateKeyDown('KeyD')}
          onTouchEnd={() => simulateKeyUp('KeyD')}
          className="flex items-center justify-center rounded-2xl bg-blue-600/40 active:bg-blue-600 text-white border border-blue-400/30"
          aria-label="Move Right"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>

      {/* Right: Action Buttons (Jump, Sprint, Interact) */}
      <div className="flex flex-col gap-3">
        {/* Interact Button */}
        <button
          onClick={() => {
            simulateKeyDown('KeyE');
            setTimeout(() => simulateKeyUp('KeyE'), 100);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/40 active:bg-amber-500 text-amber-300 border border-amber-400/40 shadow-lg font-bold"
          aria-label="Interact"
        >
          E
        </button>

        {/* Sprint Button */}
        <button
          onTouchStart={() => simulateKeyDown('ShiftLeft')}
          onTouchEnd={() => simulateKeyUp('ShiftLeft')}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/40 active:bg-purple-600 text-purple-300 border border-purple-400/40 shadow-lg font-bold"
          aria-label="Sprint"
        >
          <Zap className="h-5 w-5" />
        </button>

        {/* Jump Button */}
        <button
          onClick={() => {
            simulateKeyDown('Space');
            setTimeout(() => simulateKeyUp('Space'), 100);
          }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 active:bg-blue-500 text-white border border-blue-300/40 shadow-xl font-bold text-xs"
          aria-label="Jump"
        >
          JUMP
        </button>
      </div>
    </div>
  );
};
