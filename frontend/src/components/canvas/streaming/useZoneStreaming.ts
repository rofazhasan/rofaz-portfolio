import { createContext, useContext } from 'react';

export interface ZoneStreamingContextType {
  activeZoneId: string;
  loadedZoneIds: Set<string>;
  isZoneLoaded: (zoneId: string) => boolean;
  isZoneActive: (zoneId: string) => boolean;
}

export const ZoneStreamingContext = createContext<ZoneStreamingContextType>({
  activeZoneId: 'zone_01',
  loadedZoneIds: new Set([
    'zone_01', 'zone_02', 'zone_03', 'zone_04', 'zone_05',
    'zone_06', 'zone_07', 'zone_08', 'zone_09', 'zone_10',
  ]),
  isZoneLoaded: () => true,
  isZoneActive: () => true,
});

export const useZoneStreaming = () => useContext(ZoneStreamingContext);
