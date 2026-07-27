import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';
import { CAMPUS_ZONES, calculateZoneAndNeighbors, ZoneDefinition } from './zoneData';

interface ZoneStreamingContextType {
  activeZoneId: string;
  loadedZoneIds: Set<string>;
  isZoneLoaded: (zoneId: string) => boolean;
  isZoneActive: (zoneId: string) => boolean;
}

const ZoneStreamingContext = createContext<ZoneStreamingContextType>({
  activeZoneId: 'zone_01',
  loadedZoneIds: new Set(['zone_01', 'zone_02', 'zone_05', 'zone_08']),
  isZoneLoaded: () => true,
  isZoneActive: () => true,
});

export const useZoneStreaming = () => useContext(ZoneStreamingContext);

export const ZoneStreamingManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const playerPos = useGameStore((s) => s.playerPos);
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const setNeighborZones = useGameStore((s) => s.setNeighborZones);

  const activeZoneRef = useRef<string>('zone_01');
  const loadedZonesSetRef = useRef<Set<string>>(new Set(['zone_01', 'zone_02', 'zone_05', 'zone_08']));

  useFrame(() => {
    const { activeZone, neighborZones } = calculateZoneAndNeighbors(playerPos);

    if (activeZone.id !== activeZoneRef.current) {
      activeZoneRef.current = activeZone.id;
      const loadedSet = new Set<string>([
        activeZone.id,
        ...neighborZones.map((z) => z.id),
      ]);
      loadedZonesSetRef.current = loadedSet;

      // Update Zustand store
      setActiveZone(`${activeZone.code}: ${activeZone.name}`);
      setNeighborZones(neighborZones.map((z) => `${z.code}: ${z.name}`));
    }
  });

  const value: ZoneStreamingContextType = {
    activeZoneId: activeZoneRef.current,
    loadedZoneIds: loadedZonesSetRef.current,
    isZoneLoaded: (zoneId: string) => loadedZonesSetRef.current.has(zoneId),
    isZoneActive: (zoneId: string) => activeZoneRef.current === zoneId,
  };

  return (
    <ZoneStreamingContext.Provider value={value}>
      {children}
    </ZoneStreamingContext.Provider>
  );
};
