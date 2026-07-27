import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const AuditoriumBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const showToast = useGameStore((s) => s.showToast);

  const trophies = [
    { title: '1st Place Global AI Hackathon', year: '2025', color: '#eab308' },
    { title: 'Best Engineering Architecture', year: '2024', color: '#38bdf8' },
    { title: 'Open Source Vanguard Award', year: '2024', color: '#a855f7' },
  ];

  const handleApplause = () => {
    audioManager.playApplause();
    unlockAchievement('standing_ovation', 'Standing Ovation', 'Triggered crowd applause in the Auditorium!', 200);
    showToast('👏 Standing Ovation!', 'The crowd cheers for Rafiu\'s accomplishments!', 'achievement');
  };

  return (
    <group position={[-35, 0, 10]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Auditorium Stage')}>
        <boxGeometry args={[20, 10, 20]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Auditorium Stage Foundation */}
      <RigidBody type="fixed">
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[18, 0.8, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Raised Stage Platform */}
        <mesh position={[0, 1.2, -3]} castShadow receiveShadow>
          <boxGeometry args={[14, 0.8, 8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>
      </RigidBody>

      {/* Header Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 8.5, 0]}
          fontSize={0.8}
          color="#eab308"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          GRAND AUDITORIUM & HALL OF FAME
        </Text>
      </Float>

      {/* Giant LED Screen Background */}
      <mesh position={[0, 4.2, -6.8]}>
        <planeGeometry args={[12, 5]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>
      <Text
        position={[0, 4.2, -6.7]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        RAFIU HALL OF FAME
      </Text>

      {/* Interactive Trophy Pedestals */}
      {trophies.map((trophy, index) => {
        const x = (index - 1) * 4;
        return (
          <group key={index} position={[x, 1.6, -3]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.6, 0.7, 0.8, 32]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>

            {/* Glowing Golden Trophy */}
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
              <mesh position={[0, 1.4, 0]} onClick={handleApplause}>
                <cylinderGeometry args={[0.3, 0.1, 0.8, 16]} />
                <meshStandardMaterial color={trophy.color} emissive={trophy.color} emissiveIntensity={1.2} metalness={0.9} />
              </mesh>
              <Text
                position={[0, 2.1, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {trophy.title} ({trophy.year})
              </Text>
            </Float>
          </group>
        );
      })}

      {/* Interactive Applause Button */}
      <group position={[0, 1.8, 3]} onClick={handleApplause}>
        <mesh castShadow>
          <cylinderGeometry args={[0.8, 0.9, 0.3, 32]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.2, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
          👏 PRESS FOR APPLAUSE
        </Text>
      </group>
    </group>
  );
};
