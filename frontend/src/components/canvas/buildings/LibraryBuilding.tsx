import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const LibraryBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openModal = useGameStore((s) => s.openModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  const bioBooks = [
    {
      id: 'biography',
      title: 'Biography & Story',
      color: '#38bdf8',
      pos: [-4, 1.4, -2] as [number, number, number],
      content: {
        title: 'Md. Rofaz Hasan Rafiu',
        subtitle: 'Lead AI & Full-Stack Systems Engineer',
        text: 'Passionate about engineering intelligent, scalable, and visually captivating digital experiences. Specializing in Deep Learning, 3D Web Graphics (Three.js/WebGL), Autonomous AI Agents, and High-Performance Cloud Architectures.',
      },
    },
    {
      id: 'education',
      title: 'Education & Academic Degrees',
      color: '#a855f7',
      pos: [-2, 1.4, -4] as [number, number, number],
      content: {
        title: 'Academic Excellence',
        subtitle: 'B.Sc. in Computer Science & Engineering',
        text: 'Focused on Artificial Intelligence, High-Performance Computing, Computer Vision, and Distributed Systems. Conducted thesis research on deep neural network optimization and autonomous multi-agent systems.',
      },
    },
    {
      id: 'skills',
      title: 'Skillset Matrix',
      color: '#22c55e',
      pos: [2, 1.4, -4] as [number, number, number],
      content: {
        title: 'Technical Mastery',
        subtitle: 'Languages, Frameworks & Cloud Tech',
        text: 'Core: TypeScript, Python, C++, Rust, Go.\nFrontend: React, Next.js, Three.js, R3F, GLSL, WebGL, TailwindCSS.\nBackend & AI: PyTorch, TensorFlow, FastApi, Node.js, PostgreSQL, Redis, Docker, Kubernetes.',
      },
    },
    {
      id: 'certificates',
      title: 'Certificates & Honors',
      color: '#eab308',
      pos: [4, 1.4, -2] as [number, number, number],
      content: {
        title: 'Professional Certifications',
        subtitle: 'Industry Credentials',
        text: '• Certified AI & ML Specialist\n• AWS Certified Solutions Architect\n• Full-Stack Web Development Mastery\n• Open Source Contributor Award',
      },
    },
  ];

  const handleBookClick = (book: typeof bioBooks[0]) => {
    audioManager.playHologram();
    unlockAchievement('library_explored', 'Campus Scholar', 'Explored the Rafiu University Library & Biography', 150);
    openModal('book', book.content);
  };

  return (
    <group position={[-25, 0, -15]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Library')}>
        <boxGeometry args={[18, 10, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Main Building Structure */}
      <RigidBody type="fixed">
        {/* Base Foundation */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[8, 8.5, 0.8, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>
        {/* Dome Glass Roof */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <cylinderGeometry args={[7.5, 7.5, 7.5, 32, 1, true]} />
          <meshStandardMaterial color="#0284c7" transparent opacity={0.35} roughness={0.1} />
        </mesh>
        {/* Pillar Columns */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 7.2, 4, Math.sin(angle) * 7.2]}
              castShadow
            >
              <cylinderGeometry args={[0.3, 0.35, 7, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.7} />
            </mesh>
          );
        })}
      </RigidBody>

      {/* Building Header Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 9, 0]}
          fontSize={0.8}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          LIBRARY & BIOGRAPHY
        </Text>
      </Float>

      {/* Central Hologram Portrait Pedestal */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 1.2, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* Floating Hologram Icon */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh position={[0, 2.5, 0]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2} wireframe />
        </mesh>
      </Float>

      {/* Interactive Floating Bio Books */}
      {bioBooks.map((book) => (
        <group key={book.id} position={book.pos}>
          {/* Pedestal */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.4, 0.45, 1.2, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>

          {/* Floating Glowing Book */}
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh
              onClick={() => handleBookClick(book)}
              onPointerOver={() => setHoveredBook(book.id)}
              onPointerOut={() => setHoveredBook(null)}
              scale={hoveredBook === book.id ? 1.2 : 1.0}
            >
              <boxGeometry args={[0.6, 0.8, 0.18]} />
              <meshStandardMaterial
                color={book.color}
                emissive={book.color}
                emissiveIntensity={hoveredBook === book.id ? 1.2 : 0.4}
                roughness={0.2}
              />
            </mesh>

            {/* Label */}
            <Text
              position={[0, 0.65, 0]}
              fontSize={0.22}
              color={hoveredBook === book.id ? '#ffffff' : book.color}
              anchorX="center"
              anchorY="middle"
            >
              {book.title}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
};
