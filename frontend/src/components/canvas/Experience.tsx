import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useGameStore } from '@/store/useGameStore';
import { PlayerController } from './PlayerController';
import { CampusWorld } from './CampusWorld';
import { DynamicLighting } from './optimization/DynamicLighting';
import { CullingManager } from './optimization/CullingManager';
import { LifecycleManager } from './optimization/LifecycleManager';
import { DeviceBenchmark } from './optimization/DeviceBenchmark';
import { ZoneStreamingManager } from './streaming/ZoneStreamingManager';

export const Experience: React.FC = () => {
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);

  return (
    <Canvas
      shadows={graphicsQuality !== 'low'}
      camera={{ position: [0, 5, 25], fov: 50 }}
      gl={{
        powerPreference: 'high-performance',
        antialias: graphicsQuality === 'ultra' || graphicsQuality === 'high',
        stencil: false,
        depth: true,
      }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <DeviceBenchmark />
      <DynamicLighting />
      <CullingManager />

      <ZoneStreamingManager>
        <LifecycleManager>
          <Physics gravity={[0, -18, 0]}>
            <PlayerController initialPos={[0, 1.5, 22]} />
            <CampusWorld />
          </Physics>
        </LifecycleManager>
      </ZoneStreamingManager>
    </Canvas>
  );
};
