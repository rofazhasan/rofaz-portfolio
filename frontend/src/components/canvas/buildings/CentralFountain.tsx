import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { WaterVertexShader, WaterFragmentShader } from '../shaders/WaterShader';
import { useGameStore } from '@/store/useGameStore';

export const CentralFountain: React.FC = () => {
  const waterMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const splashGroupRef = useRef<THREE.Group>(null);
  const setActiveZone = useGameStore((s) => s.setActiveZone);

  // Water Shader Uniforms
  const uniforms = useRef({
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#0284c7') },
    uShallowColor: { value: new THREE.Color('#38bdf8') },
    uFoamColor: { value: new THREE.Color('#ffffff') },
  });

  useFrame((state, delta) => {
    if (waterMaterialRef.current) {
      waterMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (splashGroupRef.current) {
      splashGroupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Central Plaza')}>
        <cylinderGeometry args={[8, 8, 3]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Fountain Outer Stone Rim */}
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[5, 5.2, 0.8, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* Interactive Water Surface */}
      <mesh position={[0, 0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.8, 64]} />
        <shaderMaterial
          ref={waterMaterialRef}
          vertexShader={WaterVertexShader}
          fragmentShader={WaterFragmentShader}
          uniforms={uniforms.current}
          transparent
        />
      </mesh>

      {/* Central Fountain Tiers */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.5, 0.8, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.8, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.5, 1.0, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Water Jet Splash Particles */}
      <group ref={splashGroupRef} position={[0, 3.6, 0]}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 0.8;
          const z = Math.sin(angle) * 0.8;
          return (
            <mesh key={i} position={[x, -0.2, z]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.7} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
