import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { FrontGate } from './buildings/FrontGate';
import { CentralFountain } from './buildings/CentralFountain';
import { LibraryBuilding } from './buildings/LibraryBuilding';
import { EngineeringBuilding } from './buildings/EngineeringBuilding';
import { InnovationLabBuilding } from './buildings/InnovationLabBuilding';
import { ResearchCenterBuilding } from './buildings/ResearchCenterBuilding';
import { StartupIncubatorBuilding } from './buildings/StartupIncubatorBuilding';
import { AuditoriumBuilding } from './buildings/AuditoriumBuilding';
import { CareerCenterBuilding } from './buildings/CareerCenterBuilding';
import { DormitoryBuilding } from './buildings/DormitoryBuilding';
import { SecretCave } from './buildings/SecretCave';
import { GolfCart } from './buildings/GolfCart';
import { WorldLocations } from './WorldLocations';
import { NPCManager } from './NPCManager';
import { InstancedProps } from './optimization/InstancedProps';
import { useZoneStreaming } from './streaming/useZoneStreaming';

export const CampusWorld: React.FC = () => {
  const { isZoneLoaded } = useZoneStreaming();

  return (
    <group>
      {/* Ground Physics Floor */}
      <RigidBody type="fixed" friction={0.7} restitution={0}>
        <mesh position={[0, -0.1, 0]} receiveShadow userData={{ alwaysVisible: true }}>
          <boxGeometry args={[260, 0.2, 260]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Main Campus Cobblestone Road Networks */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ alwaysVisible: true }}>
        <planeGeometry args={[14, 200]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow userData={{ alwaysVisible: true }}>
        <planeGeometry args={[14, 200]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>

      {/* Grass Lawns */}
      <mesh position={[-60, 0.01, -60]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ alwaysVisible: true }}>
        <planeGeometry args={[110, 110]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>
      <mesh position={[60, 0.01, -60]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ alwaysVisible: true }}>
        <planeGeometry args={[110, 110]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>
      <mesh position={[-60, 0.01, 60]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ alwaysVisible: true }}>
        <planeGeometry args={[110, 110]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>
      <mesh position={[60, 0.01, 60]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ alwaysVisible: true }}>
        <planeGeometry args={[110, 110]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>

      {/* High Performance GPU Instanced Props (Trees, Lights, Benches) */}
      <InstancedProps />

      {/* Dynamic Zone-Based Building Streaming */}
      {isZoneLoaded('zone_01') && (
        <group userData={{ zoneId: 'zone_01' }}>
          <FrontGate />
          <CareerCenterBuilding />
        </group>
      )}

      {isZoneLoaded('zone_02') && (
        <group userData={{ zoneId: 'zone_02' }}>
          <LibraryBuilding />
        </group>
      )}

      {isZoneLoaded('zone_03') && (
        <group userData={{ zoneId: 'zone_03' }}>
          <InnovationLabBuilding />
          <ResearchCenterBuilding />
        </group>
      )}

      {isZoneLoaded('zone_04') && (
        <group userData={{ zoneId: 'zone_04' }}>
          <EngineeringBuilding />
        </group>
      )}

      {isZoneLoaded('zone_05') && (
        <group userData={{ zoneId: 'zone_05' }}>
          <CentralFountain />
        </group>
      )}

      {isZoneLoaded('zone_06') && (
        <group userData={{ zoneId: 'zone_06' }}>
          <AuditoriumBuilding />
        </group>
      )}

      {isZoneLoaded('zone_08') && (
        <group userData={{ zoneId: 'zone_08' }}>
          <DormitoryBuilding />
        </group>
      )}

      {isZoneLoaded('zone_09') && (
        <group userData={{ zoneId: 'zone_09' }}>
          <StartupIncubatorBuilding />
        </group>
      )}

      {isZoneLoaded('zone_10') && (
        <group userData={{ zoneId: 'zone_10' }}>
          <SecretCave />
          <GolfCart />
        </group>
      )}

      {/* Extended World Locations & Interactive Campus NPCs */}
      <WorldLocations />
      <NPCManager />
    </group>
  );
};
