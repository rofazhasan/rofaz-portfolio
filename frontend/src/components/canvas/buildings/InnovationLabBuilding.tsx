import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const InnovationLabBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const graphGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (graphGroupRef.current) {
      graphGroupRef.current.rotation.y += delta * 0.4;
      graphGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  const handleLabInteract = () => {
    audioManager.playHologram();
    unlockAchievement('ai_lab_visited', 'AI Researcher', 'Explored the Innovation Lab & Neural Experiments', 150);
    openModal('book', {
      title: 'AI & Robotics Innovation Lab',
      subtitle: 'Cutting-Edge Research & Interactive Demos',
      text: 'Explore Rafiu\'s ongoing experiments in Deep Neural Networks, Real-Time Vision Analytics, Autonomous Drone Swarms, and Generative Multimodal AI.',
    });
  };

  return (
    <group position={[35, 0, 10]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Innovation Lab')}>
        <boxGeometry args={[18, 10, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Building Frame */}
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
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          INNOVATION & AI LAB
        </Text>
      </Float>

      {/* 3D Neural Network Nodes Visualizer */}
      <group ref={graphGroupRef} position={[0, 4, 0]} onClick={handleLabInteract}>
        {[...Array(16)].map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 16);
          const theta = Math.sqrt(16 * Math.PI) * phi;
          const r = 2.2;
          const x = r * Math.cos(theta) * Math.sin(phi);
          const y = r * Math.sin(theta) * Math.sin(phi);
          const z = r * Math.cos(phi);

          return (
            <group key={i} position={[x, y, z]}>
              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={2} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Interactive Pedestal */}
      <mesh position={[0, 0.8, 0]} onClick={handleLabInteract}>
        <cylinderGeometry args={[1.5, 1.8, 0.8, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
    </group>
  );
};
