import React from 'react';
import { Float, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const CareerCenterBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  const handleResumeTerminal = () => {
    audioManager.playHologram();
    unlockAchievement('resume_downloaded', 'Recruiter Connect', 'Opened Rafiu\'s Holographic Resume Terminal', 200);
    openModal('resume');
  };

  return (
    <group position={[0, 0, -35]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Career Center')}>
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
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          CAREER CENTER & RESUME TERMINAL
        </Text>
      </Float>

      {/* Central Holographic Resume Station */}
      <group position={[0, 1.2, 0]} onClick={handleResumeTerminal}>
        <mesh castShadow>
          <cylinderGeometry args={[1.5, 1.7, 1.2, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>

        {/* Floating Holographic Document Icon */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[1.2, 1.6, 0.08]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.4} roughness={0.1} />
          </mesh>
          <Text position={[0, 0, 0.06]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
            📄 RESUME / CV
          </Text>
          <Text position={[0, -0.4, 0.06]} fontSize={0.12} color="#7dd3fc" anchorX="center" anchorY="middle">
            [ Click to Inspect & Download ]
          </Text>
        </Float>
      </group>
    </group>
  );
};
