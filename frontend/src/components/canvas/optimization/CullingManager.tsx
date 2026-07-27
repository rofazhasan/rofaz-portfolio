import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';

interface CullingManagerProps {
  maxDistance?: number;
  fadeDistance?: number;
}

const projScreenMatrix = new THREE.Matrix4();
const frustum = new THREE.Frustum();

export const CullingManager: React.FC<CullingManagerProps> = ({
  maxDistance = 120,
  fadeDistance = 25,
}) => {
  const { camera, scene, gl } = useThree();
  const playerPos = useGameStore((s) => s.playerPos);
  const setPerfMetrics = useGameStore((s) => s.setPerfMetrics);
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);

  const frameCountRef = useRef(0);

  // Set distance threshold based on preset quality
  const actualMaxDistance =
    graphicsQuality === 'low'
      ? 65
      : graphicsQuality === 'medium'
      ? 90
      : graphicsQuality === 'high'
      ? 125
      : 160; // ultra

  useFrame(() => {
    frameCountRef.current++;

    // Run culling update every frame
    camera.updateMatrixWorld();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);

    const camPos = camera.position;
    let visibleCount = 0;

    scene.traverse((child) => {
      // Skip background, ground, lights, and player
      if (
        child.userData?.isPlayer ||
        child.userData?.alwaysVisible ||
        child.type.includes('Light') ||
        child.type === 'Scene'
      ) {
        return;
      }

      if ((child as THREE.Mesh).isMesh || child.type === 'Group') {
        // Calculate distance to camera / player
        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);

        const distToCam = worldPos.distanceTo(camPos);

        // Distance Culling
        if (distToCam > actualMaxDistance) {
          child.visible = false;
          return;
        }

        // Frustum Culling check
        const isInsideFrustum = child.userData?.boundingBox
          ? frustum.intersectsBox(child.userData.boundingBox)
          : frustum.containsPoint(worldPos);

        if (!isInsideFrustum) {
          child.visible = false;
          return;
        }

        // Visible object
        child.visible = true;
        visibleCount++;

        // Distance Fade Effect on Materials if close to maxDistance
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => applyFade(mat, distToCam, actualMaxDistance, fadeDistance));
          } else if (mesh.material) {
            applyFade(mesh.material, distToCam, actualMaxDistance, fadeDistance);
          }
        }
      }
    });

    // Periodically update debug panel metrics (every 10 frames)
    if (frameCountRef.current % 10 === 0) {
      const renderInfo = gl.info.render;
      const memoryInfo = gl.info.memory;

      setPerfMetrics({
        drawCalls: renderInfo.calls,
        triangles: renderInfo.triangles,
        geometries: memoryInfo.geometries,
        textures: memoryInfo.textures,
        visibleObjects: visibleCount,
      });
    }
  });

  return null;
};

function applyFade(material: THREE.Material, dist: number, maxDist: number, fadeDist: number): void {
  const startFade = maxDist - fadeDist;
  if (dist > startFade) {
    const alpha = 1 - (dist - startFade) / fadeDist;
    material.transparent = true;
    material.opacity = Math.max(0, Math.min(1, alpha));
  } else {
    if (material.userData?.wasTransparent === undefined) {
      material.userData.wasTransparent = material.transparent;
    }
    if (!material.userData.wasTransparent) {
      material.transparent = false;
      material.opacity = 1.0;
    }
  }
}
