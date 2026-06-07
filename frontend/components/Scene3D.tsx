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

interface NodeData {
  position: [number, number, number];
  scale: number;
  distort: number;
}

function NeuralConnections({ nodes, color }: { nodes: NodeData[]; color: string }) {
  // Find pairs of nodes that are close to draw connections
  const lines = useMemo(() => {
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = [];
    const threshold = 3.8;
    for (let i = 0; i < nodes.length; i++) {
      const p1 = new THREE.Vector3(...nodes[i].position);
      for (let j = i + 1; j < nodes.length; j++) {
        const p2 = new THREE.Vector3(...nodes[j].position);
        if (p1.distanceTo(p2) < threshold) {
          pairs.push([p1, p2]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  // Instantiate line components as memoized Three.js Line objects
  const connectionLines = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.12,
    });
    return lines.map((pair) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([pair[0], pair[1]]);
      return new THREE.Line(geometry, material);
    });
  }, [lines, color]);

  return (
    <group>
      {connectionLines.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}
    </group>
  );
}

function BackgroundParticles({ count = 150, color }: { count?: number; color: string }) {
  const points = useRef<THREE.Points>(null!);
  
  // Generate random drifting particles
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 32; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z
      spd[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!points.current) return;
    const array = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Drift downwards
      array[i * 3 + 1] -= speeds[i] * 0.15;
      if (array[i * 3 + 1] < -16) {
        array[i * 3 + 1] = 16;
      }
      // Gentle hover horizontal waving
      array[i * 3] += Math.sin(t * 0.5 + i) * 0.002;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.06}
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralCluster({ count = 16 }) {
  const group = useRef<THREE.Group>(null!);
  const { theme } = useNextTheme();
  const isDay = theme === 'light';
  const color = isDay ? "#d97706" : "#00ff41";

  // Generate stable positions for cluster nodes
  const nodes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.15,
      distort: Math.random() * 0.4 + 0.15
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth base rotation mixed with mouse movements
    const targetRotY = t / 15 + state.pointer.x * 0.25;
    const targetRotX = Math.sin(t / 8) / 8 + state.pointer.y * 0.25;
    
    // Smooth interpolation (lerp) for responsive tilt
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
          <mesh position={node.position} scale={node.scale}>
            <octahedronGeometry args={[1, 1]} />
            <MeshDistortMaterial
              color={color}
              speed={1.5}
              distort={node.distort}
              radius={1}
              emissive={color}
              emissiveIntensity={isDay ? 0.08 : 0.5}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Dynamic Connector Plexus */}
      <NeuralConnections nodes={nodes} color={color} />
      
      {/* Outer Wireframe Cage */}
      <mesh>
         <octahedronGeometry args={[6.5, 1]} />
         <meshBasicMaterial color={color} wireframe transparent opacity={0.02} />
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
      args={[50, 50, color, color]} 
      position={[0, -6, 0]} 
      rotation={[0, 0, 0]} 
    >
        {/* @ts-ignore */}
        <meshBasicMaterial transparent opacity={0.02} color={color} />
    </gridHelper>
  );
}

function ParallaxCamera() {
  useFrame((state) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    
    // Smoothly shift camera position based on mouse position and scroll
    const targetX = state.pointer.x * 1.5;
    const targetY = 2 - (scrollY * 0.0035) + state.pointer.y * 1.0;
    const targetZ = 12 - (scrollY * 0.001); // Subtle forward move on scroll
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
  );
}

export default function Scene3D() {
  const { theme } = useNextTheme();
  const color = theme === 'light' ? "#d97706" : "#00ff41";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-85 transition-opacity duration-1000">
      <Canvas shadows dpr={[1, 1.5]}>
        <ParallaxCamera />
        <ambientLight intensity={0.35} />
        <spotLight position={[12, 15, 10]} angle={0.2} penumbra={1} intensity={1.2} castShadow />
        
        <NeuralCluster count={14} />
        <BackgroundParticles count={160} color={color} />
        <Grid />

        <ContactShadows
          position={[0, -6, 0]}
          opacity={0.25}
          scale={35}
          blur={3.5}
          far={12}
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
