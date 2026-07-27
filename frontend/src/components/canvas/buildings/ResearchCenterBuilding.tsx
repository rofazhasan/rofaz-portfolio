import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const ResearchCenterBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const cubeMatrixRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cubeMatrixRef.current) {
      cubeMatrixRef.current.rotation.y += delta * 0.3;
    }
  });

  const handleResearchInteract = () => {
    audioManager.playHologram();
    unlockAchievement('research_read', 'Peer Reviewer', 'Examined AI Research Papers & Citation Graph', 150);
    openModal('research');
  };

  return (
    <group position={[20, 0, 35]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('AI Research Center')}>
        <boxGeometry args={[18, 10, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Building Structure */}
      <RigidBody type="fixed">
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[8, 8.5, 0.8, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
      </RigidBody>

      {/* Header Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 8.5, 0]}
          fontSize={0.8}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          AI RESEARCH CENTER
        </Text>
      </Float>

      {/* Citation Graph Visualizer */}
      <group ref={cubeMatrixRef} position={[0, 3.5, 0]} onClick={handleResearchInteract}>
        <mesh castShadow>
          <octahedronGeometry args={[1.5]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} wireframe />
        </mesh>
      </group>

      {/* Interactive Terminal Pedestal */}
      <mesh position={[0, 1, 0]} onClick={handleResearchInteract}>
        <cylinderGeometry args={[1.2, 1.4, 1.2, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
    </group>
  );
};
