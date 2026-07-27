import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface LODWrapperProps {
  position: [number, number, number];
  lod0: React.ReactNode; // < 20 meters
  lod1?: React.ReactNode; // 20 - 45 meters
  lod2?: React.ReactNode; // 45 - 75 meters
  lod3?: React.ReactNode; // > 75 meters (Billboard / Simple proxy)
}

export const LODWrapper: React.FC<LODWrapperProps> = ({
  position,
  lod0,
  lod1,
  lod2,
  lod3,
}) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [lodLevel, setLodLevel] = useState<0 | 1 | 2 | 3>(0);

  const posVec = new THREE.Vector3(...position);

  useFrame(() => {
    if (!groupRef.current) return;

    const dist = camera.position.distanceTo(posVec);

    let nextLod: 0 | 1 | 2 | 3 = 0;
    if (dist > 75 && lod3) {
      nextLod = 3;
    } else if (dist > 45 && lod2) {
      nextLod = 2;
    } else if (dist > 20 && lod1) {
      nextLod = 1;
    }

    if (nextLod !== lodLevel) {
      setLodLevel(nextLod);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {lodLevel === 0 && lod0}
      {lodLevel === 1 && (lod1 || lod0)}
      {lodLevel === 2 && (lod2 || lod1 || lod0)}
      {lodLevel === 3 && (lod3 || lod2 || lod1 || lod0)}
    </group>
  );
};
