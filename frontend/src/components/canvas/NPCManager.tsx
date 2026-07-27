import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore, NPCData } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const campusNPCs: (NPCData & { pos: [number, number, number]; color: string })[] = [
  {
    id: 'professor_ai',
    name: 'Prof. Ada Vance',
    title: 'Dean of Artificial Intelligence & Neural Systems',
    avatar: '👩‍🏫',
    color: '#a855f7',
    pos: [32, 0.9, -18],
    dialogue: [
      'Welcome to the AI Neural Laboratory!',
      'Here, Rafiu has engineered state-of-the-art multi-agent orchestration frameworks and deep learning pipelines.',
      'Feel free to inspect the physical neural core interactive exhibit nearby!',
    ],
    questReward: { id: 'ai_badge', name: 'Neural Specialist Badge', icon: '🧠', description: 'Awarded for discussing AI research with Prof. Ada', xp: 250 },
  },
  {
    id: 'tour_guide',
    name: 'Alex Rivera',
    title: 'Student Campus Ambassador',
    avatar: '🎒',
    color: '#38bdf8',
    pos: [0, 0.9, 28],
    dialogue: [
      'Greetings, guest! Welcome to Rafiu University 3D Open-World Portfolio!',
      'You can explore 22 distinct campus landmarks including the Library, Engineering Hall, Sky Observatory, and Secret Lab.',
      'Use WASD to move, Shift to sprint, Space to jump, and E to interact with exhibits!',
    ],
    questReward: { id: 'guide_map', name: 'Interactive Campus Blueprint', icon: '🗺️', description: 'Unlocked fast travel map system', xp: 150 },
  },
  {
    id: 'cyber_bot',
    name: 'Unit-X9 Security Bot',
    title: 'Zero-Trust Protocol Sentinel',
    avatar: '🤖',
    color: '#0284c7',
    pos: [-42, 0.9, 12],
    dialogue: [
      'BEEP BOOP. Accessing Security Vault Protocol...',
      'Zero-trust telemetry systems are operational. All microsecond packet streams are encrypted using eBPF and Go.',
      'Security Status: 100% Secure. Zero vulnerabilities detected.',
    ],
    questReward: { id: 'shield_pass', name: 'Zero-Trust Passkey', icon: '🛡️', description: 'Access token for Cloud Security metrics', xp: 200 },
  },
  {
    id: 'robotics_engineer',
    name: 'Dr. Marcus Chen',
    title: 'Lead Robotics & Vision Architect',
    avatar: '👨‍🔬',
    color: '#f59e0b',
    pos: [32, 0.9, 23],
    dialogue: [
      'Hello there! Welcome to the Robotics & Automation Bay.',
      'We build sub-10ms computer vision edge units using C++, TensorRT, and ROS2.',
      'Check out the VisionX Edge AI camera unit on display!',
    ],
    questReward: { id: 'robot_chip', name: 'Tensor Edge Accelerator', icon: '⚡', description: 'Awarded for completing Robotics briefing', xp: 200 },
  },
];

export const NPCManager: React.FC = () => {
  const openNPCModal = useGameStore((s) => s.openNPCModal);

  const handleNPCInteract = (npc: NPCData) => {
    audioManager.playHologram();
    openNPCModal(npc);
  };

  return (
    <group>
      {campusNPCs.map((npc) => (
        <group key={npc.id} position={npc.pos}>
          {/* NPC Physical Collider Body */}
          <RigidBody type="fixed">
            <mesh position={[0, 0.9, 0]} castShadow>
              <capsuleGeometry args={[0.35, 0.9, 8, 16]} />
              <meshStandardMaterial color={npc.color} roughness={0.3} />
            </mesh>
          </RigidBody>

          {/* Floating NPC Indicator & Interactive Click Zone */}
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <group
              position={[0, 2.2, 0]}
              onClick={() => handleNPCInteract(npc)}
            >
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color={npc.color} emissive={npc.color} emissiveIntensity={1.2} />
              </mesh>
              <Text position={[0, 0.4, 0]} fontSize={0.24} color="#ffffff" anchorX="center" anchorY="middle">
                {npc.avatar} {npc.name}
              </Text>
              <Text position={[0, 0.15, 0]} fontSize={0.16} color="#94a3b8" anchorX="center" anchorY="middle">
                [ Click or Press E to Speak ]
              </Text>
            </group>
          </Float>
        </group>
      ))}
    </group>
  );
};
