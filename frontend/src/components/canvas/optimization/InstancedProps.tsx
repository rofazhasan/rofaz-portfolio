import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

// Tree Coordinates around Campus
const TREE_POSITIONS: [number, number, number, boolean][] = [
  [-15, 0, -10, true], [15, 0, -10, false], [-15, 0, 10, true], [15, 0, 10, false],
  [-30, 0, -5, true], [30, 0, -5, false], [-30, 0, 25, true], [30, 0, 25, false],
  [-50, 0, -40, true], [50, 0, -40, false], [-50, 0, 40, true], [50, 0, 40, false],
  [-10, 0, -50, true], [10, 0, -50, false], [-60, 0, -10, true], [60, 0, -10, false],
  [-70, 0, 30, true], [70, 0, 30, false], [-40, 0, 70, true], [40, 0, 70, false],
];

// Street Light Coordinates around Campus
const STREET_LIGHT_POSITIONS: [number, number, number][] = [
  [-6, 0, 12], [6, 0, 12], [-6, 0, -12], [6, 0, -12],
  [-20, 0, 6], [20, 0, 6], [-20, 0, -6], [20, 0, -6],
  [-35, 0, 30], [35, 0, 30], [-35, 0, -30], [35, 0, -30],
  [0, 0, 45], [0, 0, -45], [-50, 0, 15], [50, 0, 15],
];

// Campus Benches Coordinates
const BENCH_POSITIONS: [number, number, number, number][] = [
  [-12, 0, 8, 0], [12, 0, 8, Math.PI], [-12, 0, -8, 0], [12, 0, -8, Math.PI],
  [-22, 0, 18, Math.PI / 2], [22, 0, 18, -Math.PI / 2],
];

export const InstancedProps: React.FC = () => {
  // Tree Instanced Mesh Refs
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const oakFoliageRef = useRef<THREE.InstancedMesh>(null);
  const cherryFoliageRef = useRef<THREE.InstancedMesh>(null);

  // Street Light Instanced Mesh Refs
  const poleRef = useRef<THREE.InstancedMesh>(null);
  const bulbRef = useRef<THREE.InstancedMesh>(null);

  // Bench Instanced Mesh Ref
  const benchRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();

    // 1. Position Trees
    let oakIdx = 0;
    let cherryIdx = 0;

    TREE_POSITIONS.forEach(([x, y, z, isOak], i) => {
      // Trunk
      dummy.position.set(x, y + 2, z);
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(0, (i * 0.7) % Math.PI, 0);
      dummy.updateMatrix();
      trunkRef.current?.setMatrixAt(i, dummy.matrix);

      // Foliage
      dummy.position.set(x, y + 4.5, z);
      dummy.updateMatrix();
      if (isOak) {
        oakFoliageRef.current?.setMatrixAt(oakIdx++, dummy.matrix);
      } else {
        cherryFoliageRef.current?.setMatrixAt(cherryIdx++, dummy.matrix);
      }
    });

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true;
    if (oakFoliageRef.current) oakFoliageRef.current.instanceMatrix.needsUpdate = true;
    if (cherryFoliageRef.current) cherryFoliageRef.current.instanceMatrix.needsUpdate = true;

    // 2. Position Street Lights
    STREET_LIGHT_POSITIONS.forEach(([x, y, z], i) => {
      // Pole
      dummy.position.set(x, y + 2.5, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      poleRef.current?.setMatrixAt(i, dummy.matrix);

      // Bulb
      dummy.position.set(x, y + 5, z);
      dummy.updateMatrix();
      bulbRef.current?.setMatrixAt(i, dummy.matrix);
    });

    if (poleRef.current) poleRef.current.instanceMatrix.needsUpdate = true;
    if (bulbRef.current) bulbRef.current.instanceMatrix.needsUpdate = true;

    // 3. Position Benches
    BENCH_POSITIONS.forEach(([x, y, z, rot], i) => {
      dummy.position.set(x, y + 0.4, z);
      dummy.rotation.set(0, rot, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      benchRef.current?.setMatrixAt(i, dummy.matrix);
    });

    if (benchRef.current) benchRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  const totalTrees = TREE_POSITIONS.length;
  const oakCount = TREE_POSITIONS.filter(([, , , isOak]) => isOak).length;
  const cherryCount = totalTrees - oakCount;

  return (
    <group>
      {/* Instanced Tree Trunks */}
      <instancedMesh
        ref={trunkRef}
        args={[undefined, undefined, totalTrees]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.45, 4, 12]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </instancedMesh>

      {/* Instanced Oak Foliage */}
      <instancedMesh
        ref={oakFoliageRef}
        args={[undefined, undefined, oakCount]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[2.2, 12, 12]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </instancedMesh>

      {/* Instanced Cherry Blossom Foliage */}
      <instancedMesh
        ref={cherryFoliageRef}
        args={[undefined, undefined, cherryCount]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[2.2, 12, 12]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.6} />
      </instancedMesh>

      {/* Instanced Street Light Poles */}
      <instancedMesh
        ref={poleRef}
        args={[undefined, undefined, STREET_LIGHT_POSITIONS.length]}
        castShadow
      >
        <cylinderGeometry args={[0.08, 0.12, 5, 10]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </instancedMesh>

      {/* Instanced Street Light Bulbs */}
      <instancedMesh
        ref={bulbRef}
        args={[undefined, undefined, STREET_LIGHT_POSITIONS.length]}
      >
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={2} />
      </instancedMesh>

      {/* Instanced Benches */}
      <instancedMesh
        ref={benchRef}
        args={[undefined, undefined, BENCH_POSITIONS.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.2, 0.5, 0.8]} />
        <meshStandardMaterial color="#a16207" roughness={0.7} />
      </instancedMesh>
    </group>
  );
};
