import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useZoneStreaming } from '../streaming/useZoneStreaming';
import { useGameStore } from '@/store/useGameStore';

export const LifecycleManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loadedZoneIds } = useZoneStreaming();
  const setPerfMetrics = useGameStore((s) => s.setPerfMetrics);

  const frameCountRef = useRef(0);

  useFrame(({ scene }) => {
    frameCountRef.current++;

    if (frameCountRef.current % 15 === 0) {
      let activePhysicsCount = 0;

      scene.traverse((child) => {
        // Handle NPC lifecycle
        if (child.userData?.isNPC) {
          const zoneId = child.userData?.zoneId;
          const isActive = !zoneId || loadedZoneIds.has(zoneId);
          child.visible = isActive;
          if (child.userData.pauseAI) {
            child.userData.pauseAI(!isActive);
          }
        }

        // Handle Particle emitter lifecycle
        if (child.userData?.isParticleEmitter) {
          const zoneId = child.userData?.zoneId;
          const isActive = !zoneId || loadedZoneIds.has(zoneId);
          child.visible = isActive;
        }

        // Track active rigidbodies
        if (child.userData?.isPhysicsBody || (child as any).isRigidBody) {
          if (child.visible) activePhysicsCount++;
        }
      });

      setPerfMetrics({ physicsBodies: activePhysicsCount });
    }
  });

  return <>{children}</>;
};
