import React, { useRef } from 'react';
import { Float, Text } from '@react-three/drei';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const GolfCart: React.FC = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const showToast = useGameStore((s) => s.showToast);

  const handleDriveCart = () => {
    audioManager.playHologram();
    unlockAchievement('campus_driver', 'Campus Driver', 'Boarded the Rafiu University Campus Shuttle', 150);
    showToast('🚗 Shuttle Activated!', 'Fast transport activated across Rafiu University', 'info');
  };

  return (
    <group position={[8, 0, 10]}>
      <RigidBody ref={rigidBodyRef} type="fixed">
        {/* Cart Chassis */}
        <mesh position={[0, 0.5, 0]} castShadow onClick={handleDriveCart}>
          <boxGeometry args={[1.6, 0.6, 2.8]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[1.5, 0.08, 2.2]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        {/* Wheels */}
        <mesh position={[-0.8, 0.3, 0.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.8, 0.3, 0.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-0.8, 0.3, -0.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.8, 0.3, -0.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </RigidBody>

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text position={[0, 2.4, 0]} fontSize={0.25} color="#38bdf8" anchorX="center" anchorY="middle">
          ⚡ CAMPUS SHUTTLE
        </Text>
      </Float>
    </group>
  );
};
