import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';
import { calculateZoneAndNeighbors } from './zoneData';
import { ZoneStreamingContext, ZoneStreamingContextType } from './useZoneStreaming';
export { useZoneStreaming } from './useZoneStreaming';

const initialZoneState = calculateZoneAndNeighbors([0, 1, 35]);
const initialLoadedSet = new Set<string>([
  initialZoneState.activeZone.id,
  ...initialZoneState.neighborZones.map((z) => z.id),
]);

export const ZoneStreamingManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const playerPos = useGameStore((s) => s.playerPos);
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const setNeighborZones = useGameStore((s) => s.setNeighborZones);

  const [activeZoneId, setActiveZoneId] = useState<string>(initialZoneState.activeZone.id);
  const [loadedZoneIds, setLoadedZoneIds] = useState<Set<string>>(initialLoadedSet);

  const activeZoneRef = useRef<string>(initialZoneState.activeZone.id);

  useFrame(() => {
    const { activeZone, neighborZones } = calculateZoneAndNeighbors(playerPos);

    if (activeZone.id !== activeZoneRef.current) {
      activeZoneRef.current = activeZone.id;
      const nextLoadedSet = new Set<string>([
        activeZone.id,
        ...neighborZones.map((z) => z.id),
      ]);

      setActiveZoneId(activeZone.id);
      setLoadedZoneIds(nextLoadedSet);

      // Update Zustand store
      setActiveZone(`${activeZone.code}: ${activeZone.name}`);
      setNeighborZones(neighborZones.map((z) => `${z.code}: ${z.name}`));
    }
  });

  const value: ZoneStreamingContextType = {
    activeZoneId,
    loadedZoneIds,
    isZoneLoaded: (zoneId: string) => loadedZoneIds.has(zoneId),
    isZoneActive: (zoneId: string) => activeZoneId === zoneId,
  };

  return (
    <ZoneStreamingContext.Provider value={value}>
      {children}
    </ZoneStreamingContext.Provider>
  );
};
