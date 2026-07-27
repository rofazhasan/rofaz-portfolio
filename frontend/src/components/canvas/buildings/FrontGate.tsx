import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';

export const FrontGate: React.FC = () => {
  const hologramRef = useRef<THREE.Group>(null);
  const droneRef = useRef<THREE.Group>(null);
  const setActiveZone = useGameStore((s) => s.setActiveZone);

  useFrame((state, delta) => {
    if (hologramRef.current) {
      hologramRef.current.rotation.y += delta * 0.5;
    }
    if (droneRef.current) {
      droneRef.current.position.y = 3.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      droneRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group position={[0, 0, 20]}>
      {/* Trigger Zone */}
      <mesh
        position={[0, 1, 0]}
        visible={false}
        onPointerEnter={() => setActiveZone('Campus Gate')}
      >
        <boxGeometry args={[14, 4, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Main Archway Pillars */}
      <RigidBody type="fixed">
        <mesh position={[-6, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 8, 1.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[6, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 8, 1.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Top Arch Beam */}
        <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[13.5, 1.2, 1.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* Animated 3D Floating Title Sign */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 9.2, 0]}>
          <Text
            fontSize={0.85}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
          >
            WELCOME TO RAFIU UNIVERSITY
          </Text>
          <Text
            position={[0, -0.7, 0]}
            fontSize={0.35}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            Futuristic 3D Open-World Interactive Portfolio
          </Text>
        </group>
      </Float>

      {/* Security Drone Bot NPC */}
      <group ref={droneRef} position={[4.5, 3.5, 1]}>
        <mesh castShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.35]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2} />
        </mesh>
        {/* Hologram Beam from Drone */}
        <mesh position={[0, -1, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.8, 1.8, 16, 1, true]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Glowing Welcome Emblem Hologram */}
      <group ref={hologramRef} position={[0, 3.8, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.05, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0369a1" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 1.5, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};
