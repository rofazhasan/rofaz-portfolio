import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const SecretCave: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const portalRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 1.5;
    }
  });

  const handleBossPortalInteract = () => {
    audioManager.playHologram();
    unlockAchievement('secret_cave_found', 'Cave Explorer', 'Discovered the Secret Mountain & Debug Monster Portal!', 300);
    openModal('boss');
  };

  return (
    <group position={[35, 0, -35]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Secret Mountain & Cave')}>
        <boxGeometry args={[18, 10, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Rocky Mountain Rocks Base */}
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 3, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[6]} />
          <meshStandardMaterial color="#334155" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Header Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 9.5, 0]}
          fontSize={0.8}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          SECRET MOUNTAIN & DEBUG BOSS PORTAL
        </Text>
      </Float>

      {/* Glowing Cyber Portal to Debug Monster */}
      <group position={[0, 2.5, 5]} onClick={handleBossPortalInteract}>
        <group ref={portalRef}>
          <mesh>
            <torusGeometry args={[1.6, 0.15, 16, 64]} />
            <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={2.5} />
          </mesh>
        </group>

        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[1.4, 32]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>

        <Text position={[0, -2.2, 0]} fontSize={0.28} color="#fca5a5" anchorX="center" anchorY="middle">
          👾 PRESS E TO FIGHT THE DEBUG MONSTER
        </Text>
      </group>
    </group>
  );
};
