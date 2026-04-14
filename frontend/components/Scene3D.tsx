"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme as useNextTheme } from "next-themes";

function NeuralCluster({ count = 8 }) {
  const group = useRef<THREE.Group>(null!);
  const { theme } = useNextTheme();
  const isDay = theme === 'light';
  const color = isDay ? "#d97706" : "#00ff41";

  // Generate stable positions for cluster nodes
  const nodes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      distort: Math.random() * 0.5 + 0.2
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t / 10;
    group.current.rotation.x = Math.sin(t / 8) / 4;
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={node.position} scale={node.scale}>
            <octahedronGeometry args={[1, 1]} />
            <MeshDistortMaterial
              color={color}
              speed={2}
              distort={node.distort}
              radius={1}
              emissive={color}
              emissiveIntensity={isDay ? 0.1 : 0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Network Connector (Procedural connection between nodes) */}
      <mesh>
         <octahedronGeometry args={[5, 1]} />
         <meshBasicMaterial color={color} wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Grid() {
  const { theme } = useNextTheme();
  const isDay = theme === 'light';
  const color = isDay ? "#4a3e36" : "#00ff41";

  return (
    <gridHelper 
      args={[40, 40, color, color]} 
      position={[0, -5, 0]} 
      rotation={[0, 0, 0]} 
    >
        {/* @ts-ignore */}
        <meshBasicMaterial transparent opacity={0.03} color={color} />
    </gridHelper>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-80">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <NeuralCluster count={12} />
        <Grid />

        <ContactShadows
          position={[0, -5, 0]}
          opacity={0.3}
          scale={30}
          blur={3}
          far={10}
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
