import React, { useRef } from 'react';
import { Float, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const WorldLocations: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const openNPCModal = useGameStore((s) => s.openNPCModal);
  const openModal = useGameStore((s) => s.openModal);

  return (
    <group>
      {/* 2. Administration Building */}
      <group position={[0, 0, 25]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Administration HQ')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[7, 8, 6, 32]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 6.5, 0]}>
            <sphereGeometry args={[4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} roughness={0.1} />
          </mesh>
        </RigidBody>
        <Float speed={1.5} floatIntensity={0.3}>
          <Text position={[0, 8.5, 0]} fontSize={0.7} color="#38bdf8" anchorX="center" anchorY="middle">
            ADMINISTRATION HQ
          </Text>
        </Float>
      </group>

      {/* 4. AI Neural Laboratory */}
      <group position={[35, 0, -20]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('AI Neural Lab')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[14, 5, 14]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
          </mesh>
        </RigidBody>
        <Float speed={3} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh position={[0, 6.5, 0]}>
            <icosahedronGeometry args={[1.6, 1]} />
            <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={2} wireframe />
          </mesh>
        </Float>
        <Float speed={1.5} floatIntensity={0.3}>
          <Text position={[0, 8.5, 0]} fontSize={0.7} color="#c084fc" anchorX="center" anchorY="middle">
            AI NEURAL LAB
          </Text>
        </Float>
      </group>

      {/* 6. Cyber Security Fortress */}
      <group position={[-45, 0, 10]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Cyber Security Vault')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 3, 0]} castShadow receiveShadow>
            <boxGeometry args={[12, 6, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
          </mesh>
        </RigidBody>
        <Float speed={1.5} floatIntensity={0.3}>
          <Text position={[0, 7.5, 0]} fontSize={0.7} color="#38bdf8" anchorX="center" anchorY="middle">
            CYBER SECURITY VAULT
          </Text>
        </Float>
      </group>

      {/* 7. Robotics & Automation Bay */}
      <group position={[35, 0, 25]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Robotics Assembly')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[14, 5, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
        </RigidBody>
        <Float speed={1.5} floatIntensity={0.3}>
          <Text position={[0, 6.5, 0]} fontSize={0.7} color="#f59e0b" anchorX="center" anchorY="middle">
            ROBOTICS ASSEMBLY
          </Text>
        </Float>
      </group>

      {/* 9. Central Park & Gazebo */}
      <group position={[-20, 0, 0]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Central Park')}>
          <boxGeometry args={[22, 10, 22]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[9, 32]} />
          <meshStandardMaterial color="#15803d" roughness={0.9} />
        </mesh>
        {/* Gazebo */}
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[2.5, 2.8, 3.5, 8, 1, true]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        <Text position={[0, 4.5, 0]} fontSize={0.6} color="#4ade80" anchorX="center" anchorY="middle">
          CENTRAL PARK
        </Text>
      </group>

      {/* 10 & 19. Campus Lake & Suspension Bridge */}
      <group position={[0, 0, -65]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Campus Lake & Bridge')}>
          <boxGeometry args={[50, 10, 30]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        {/* Water Surface */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[45, 24]} />
          <meshStandardMaterial color="#0284c7" transparent opacity={0.7} roughness={0.1} />
        </mesh>
        {/* Bridge */}
        <RigidBody type="fixed">
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[6, 0.4, 26]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>
        </RigidBody>
        <Text position={[0, 3.5, 0]} fontSize={0.7} color="#38bdf8" anchorX="center" anchorY="middle">
          CENTENNIAL LAKE & BRIDGE
        </Text>
      </group>

      {/* 11. Campus Cafe */}
      <group position={[20, 0, 0]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Campus Cafe')}>
          <boxGeometry args={[16, 10, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[10, 4, 10]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.6} />
          </mesh>
        </RigidBody>
        <Text position={[0, 5, 0]} fontSize={0.6} color="#fb923c" anchorX="center" anchorY="middle">
          CAMPUS CAFE ☕
        </Text>
      </group>

      {/* 12. Tech Museum */}
      <group position={[-35, 0, -45]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Tech History Museum')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 3, 0]} castShadow receiveShadow>
            <boxGeometry args={[14, 6, 14]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
        </RigidBody>
        <Text position={[0, 7, 0]} fontSize={0.7} color="#eab308" anchorX="center" anchorY="middle">
          TECH HISTORY MUSEUM
        </Text>
      </group>

      {/* 13. Art & Design Gallery */}
      <group position={[35, 0, -45]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Design Gallery')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[14, 5, 14]} />
            <meshStandardMaterial color="#475569" roughness={0.3} />
          </mesh>
        </RigidBody>
        <Text position={[0, 6.5, 0]} fontSize={0.7} color="#ec4899" anchorX="center" anchorY="middle">
          ART & DESIGN GALLERY
        </Text>
      </group>

      {/* 14. Clock Tower Landmark */}
      <group position={[0, 0, 0]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Clock Tower Square')}>
          <boxGeometry args={[12, 20, 12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 8, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 16, 3]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 14, 0]}>
            <boxGeometry args={[3.6, 2.5, 3.6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </RigidBody>
        {/* Clock Face */}
        <mesh position={[0, 14, 1.82]}>
          <circleGeometry args={[1, 32]} />
          <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={1.5} />
        </mesh>
        <Text position={[0, 17.5, 0]} fontSize={0.7} color="#fde047" anchorX="center" anchorY="middle">
          CLOCK TOWER
        </Text>
      </group>

      {/* 15. Food Court */}
      <group position={[25, 0, 45]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Food Court Plaza')}>
          <boxGeometry args={[18, 10, 18]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[14, 4, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
        </RigidBody>
        <Text position={[0, 5, 0]} fontSize={0.7} color="#f97316" anchorX="center" anchorY="middle">
          FOOD COURT PLAZA 🍔
        </Text>
      </group>

      {/* 17. Football Ground */}
      <group position={[55, 0, -60]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Football Stadium')}>
          <boxGeometry args={[45, 10, 35]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 28]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
        <Text position={[0, 4, 0]} fontSize={0.8} color="#22c55e" anchorX="center" anchorY="middle">
          UNIVERSITY STADIUM ⚽
        </Text>
      </group>

      {/* 18. Autonomous Parking Lot */}
      <group position={[-55, 0, 55]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('EV Parking Grid')}>
          <boxGeometry args={[30, 10, 30]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[26, 26]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
        <Text position={[0, 3.5, 0]} fontSize={0.7} color="#38bdf8" anchorX="center" anchorY="middle">
          EV PARKING GRID
        </Text>
      </group>

      {/* 20. Sky Observatory Dome */}
      <group position={[0, 0, -95]}>
        <mesh visible={false} onPointerEnter={() => setActiveZone('Sky Observatory')}>
          <boxGeometry args={[22, 16, 22]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <RigidBody type="fixed">
          <mesh position={[0, 4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[8, 9, 8, 32]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 9, 0]} castShadow>
            <sphereGeometry args={[7.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} metalness={0.9} />
          </mesh>
        </RigidBody>
        <Float speed={1.5} floatIntensity={0.3}>
          <Text position={[0, 17, 0]} fontSize={0.8} color="#38bdf8" anchorX="center" anchorY="middle">
            SKY OBSERVATORY 🔭
          </Text>
        </Float>
      </group>
    </group>
  );
};
