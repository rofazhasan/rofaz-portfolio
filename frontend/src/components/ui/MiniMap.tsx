import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { MapPin, Navigation } from 'lucide-react';

export const MiniMap: React.FC = () => {
  const playerPos = useGameStore((s) => s.playerPos);
  const playerRotation = useGameStore((s) => s.playerRotation);
  const openModal = useGameStore((s) => s.openModal);

  // Map coordinate conversion parameters
  // World bounds: x: [-80, 80], z: [-80, 80]
  const mapSize = 120; // 120px mini-map size
  const scale = mapSize / 160;

  const playerX = mapSize / 2 + playerPos[0] * scale;
  const playerY = mapSize / 2 + playerPos[2] * scale;

  const buildings = [
    { name: 'Entrance', x: 0, z: 20, color: '#38bdf8' },
    { name: 'Fountain', x: 0, z: 0, color: '#0284c7' },
    { name: 'Library', x: -25, z: -15, color: '#38bdf8' },
    { name: 'Engineering', x: 25, z: -15, color: '#a855f7' },
    { name: 'AI Lab', x: 35, z: 10, color: '#a855f7' },
    { name: 'Research', x: 20, z: 35, color: '#38bdf8' },
    { name: 'Incubator', x: -20, z: 35, color: '#22c55e' },
    { name: 'Auditorium', x: -35, z: 10, color: '#eab308' },
    { name: 'Career', x: 0, z: -35, color: '#38bdf8' },
    { name: 'Dorm', x: -35, z: -35, color: '#f43f5e' },
    { name: 'Secret Cave', x: 35, z: -35, color: '#ef4444' },
  ];

  return (
    <div
      onClick={() => openModal('fasttravel')}
      className="glass-panel relative h-32 w-32 cursor-pointer overflow-hidden rounded-2xl border border-blue-500/40 shadow-xl transition-all hover:scale-105"
      title="Click to open Campus Fast Travel"
    >
      <svg className="h-full w-full bg-slate-950/80 p-1" viewBox={`0 0 ${mapSize} ${mapSize}`}>
        {/* Campus Roads Grid */}
        <line x1={mapSize / 2} y1={0} x2={mapSize / 2} y2={mapSize} stroke="#334155" strokeWidth="6" />
        <line x1={0} y1={mapSize / 2} x2={mapSize} y2={mapSize / 2} stroke="#334155" strokeWidth="6" />

        {/* Building Markers */}
        {buildings.map((b, i) => {
          const bx = mapSize / 2 + b.x * scale;
          const by = mapSize / 2 + b.z * scale;
          return (
            <circle
              key={i}
              cx={bx}
              cy={by}
              r="3.5"
              fill={b.color}
              className="animate-pulse"
            />
          );
        })}

        {/* Player Radar Arrow */}
        <g transform={`translate(${playerX}, ${playerY}) rotate(${(playerRotation * 180) / Math.PI})`}>
          <polygon points="0,-6 4,6 -4,6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
        </g>
      </svg>

      {/* Overlay Label */}
      <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-lg bg-slate-900/90 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">
        <span>MINI MAP</span>
        <Navigation className="h-2.5 w-2.5 text-blue-400" />
      </div>
    </div>
  );
};
