import React from 'react';
import { Float, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const DormitoryBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  const handleDormInteract = () => {
    audioManager.playHologram();
    unlockAchievement('dorm_visitor', 'Cozy Life', 'Visited Rafiu\'s Campus Dormitory & Gallery', 150);
    openModal('book', {
      title: 'Rafiu\'s Campus Dormitory & Life',
      subtitle: 'Personal Passions, Photography & Gaming',
      text: 'Welcome to my cozy personal space! When I\'m not training neural networks or writing shaders, I enjoy landscape photography, playing synthwave on piano, retro arcade gaming, and reading tech sci-fi novels.',
    });
  };

  return (
    <group position={[-35, 0, -35]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Dormitory')}>
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
          color="#f43f5e"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          DORMITORY & PERSONAL GALLERY
        </Text>
      </Float>

      {/* Cozy Dorm Bed & Desk Setup */}
      <group position={[0, 1.2, 0]} onClick={handleDormInteract}>
        <mesh castShadow>
          <boxGeometry args={[2.5, 0.6, 3.5]} />
          <meshStandardMaterial color="#fb7185" roughness={0.5} />
        </mesh>
        <Text position={[0, 0.8, 0]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
          🏠 DORM & HOBBIES
        </Text>
      </group>
    </group>
  );
};
