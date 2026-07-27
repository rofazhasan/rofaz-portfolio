export interface ZoneDefinition {
  id: string;
  name: string;
  code: string; // e.g. "Zone 01"
  center: [number, number, number];
  radius: number;
  neighbors: string[]; // List of zone IDs that are directly adjacent
}

export const CAMPUS_ZONES: Record<string, ZoneDefinition> = {
  'zone_01': {
    id: 'zone_01',
    code: 'Zone 01',
    name: 'Main Gate',
    center: [0, 0, 35],
    radius: 30,
    neighbors: ['zone_02', 'zone_05', 'zone_08'],
  },
  'zone_02': {
    id: 'zone_02',
    code: 'Zone 02',
    name: 'Library',
    center: [-35, 0, 20],
    radius: 30,
    neighbors: ['zone_01', 'zone_04', 'zone_05', 'zone_06'],
  },
  'zone_03': {
    id: 'zone_03',
    code: 'Zone 03',
    name: 'AI Center',
    center: [35, 0, -20],
    radius: 30,
    neighbors: ['zone_01', 'zone_05', 'zone_09', 'zone_10'],
  },
  'zone_04': {
    id: 'zone_04',
    code: 'Zone 04',
    name: 'Engineering',
    center: [-35, 0, -15],
    radius: 30,
    neighbors: ['zone_02', 'zone_05', 'zone_06'],
  },
  'zone_05': {
    id: 'zone_05',
    code: 'Zone 05',
    name: 'Park',
    center: [-20, 0, 0],
    radius: 30,
    neighbors: ['zone_01', 'zone_02', 'zone_03', 'zone_04', 'zone_07'],
  },
  'zone_06': {
    id: 'zone_06',
    code: 'Zone 06',
    name: 'Museum',
    center: [-35, 0, -45],
    radius: 30,
    neighbors: ['zone_02', 'zone_04', 'zone_07'],
  },
  'zone_07': {
    id: 'zone_07',
    code: 'Zone 07',
    name: 'Lake',
    center: [0, 0, -65],
    radius: 35,
    neighbors: ['zone_05', 'zone_06', 'zone_09'],
  },
  'zone_08': {
    id: 'zone_08',
    code: 'Zone 08',
    name: 'Dormitory',
    center: [-25, 0, 45],
    radius: 30,
    neighbors: ['zone_01', 'zone_02', 'zone_10'],
  },
  'zone_09': {
    id: 'zone_09',
    code: 'Zone 09',
    name: 'Startup Hub',
    center: [25, 0, -45],
    radius: 30,
    neighbors: ['zone_03', 'zone_07', 'zone_10'],
  },
  'zone_10': {
    id: 'zone_10',
    code: 'Zone 10',
    name: 'Secret Lab',
    center: [45, 0, 50],
    radius: 30,
    neighbors: ['zone_01', 'zone_03', 'zone_08', 'zone_09'],
  },
};

/**
 * Calculates current active zone ID and array of neighbor zone IDs based on player position [x, y, z].
 */
export function calculateZoneAndNeighbors(playerPos: [number, number, number]): {
  activeZone: ZoneDefinition;
  neighborZones: ZoneDefinition[];
} {
  let closestZone: ZoneDefinition = CAMPUS_ZONES['zone_01'];
  let minDistance = Infinity;

  const [px, , pz] = playerPos;

  Object.values(CAMPUS_ZONES).forEach((zone) => {
    const dx = px - zone.center[0];
    const dz = pz - zone.center[2];
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < minDistance) {
      minDistance = dist;
      closestZone = zone;
    }
  });

  const neighbors = closestZone.neighbors
    .map((id) => CAMPUS_ZONES[id])
    .filter(Boolean);

  return { activeZone: closestZone, neighborZones: neighbors };
}
