import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const StartupIncubatorBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const chartRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (chartRef.current) {
      chartRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleStartupInteract = () => {
    audioManager.playHologram();
    unlockAchievement('startup_investor', 'Venture Catalyst', 'Explored Startup Pitch Decks & Investor Milestones', 150);
    openModal('book', {
      title: 'Startup Incubator & Ventures',
      subtitle: 'Future Technologies & Product Roadmaps',
      text: 'Discover venture concepts, pitch deck carousels, investor funding milestones, and future commercial deployment roadmaps led by Rafiu.',
    });
  };

  return (
    <group position={[-20, 0, 35]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Startup Incubator')}>
        <boxGeometry args={[18, 10, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <RigidBody type="fixed">
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[16, 0.8, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
      </RigidBody>

      {/* Header Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 8.5, 0]}
          fontSize={0.8}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          STARTUP INCUBATOR
        </Text>
      </Float>

      {/* 3D Holographic Chart Emblem */}
      <group ref={chartRef} position={[0, 3.5, 0]} onClick={handleStartupInteract}>
        <mesh castShadow>
          <torusKnotGeometry args={[1.0, 0.25, 64, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#15803d" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
};
