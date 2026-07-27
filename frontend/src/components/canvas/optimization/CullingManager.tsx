import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';

interface CullingManagerProps {
  fadeDistance?: number;
}

export const CullingManager: React.FC<CullingManagerProps> = ({
  fadeDistance = 25,
}) => {
  const { camera, scene, gl } = useThree();
  const setPerfMetrics = useGameStore((s) => s.setPerfMetrics);
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);

  const frameCountRef = useRef(0);

  // Set distance threshold based on preset quality
  const actualMaxDistance =
    graphicsQuality === 'low'
      ? 90
      : graphicsQuality === 'medium'
      ? 140
      : graphicsQuality === 'high'
      ? 200
      : 300; // ultra

  useFrame(() => {
    frameCountRef.current++;

    // Explicitly update scene world matrix so positions are accurate
    scene.updateMatrixWorld(true);

    const camPos = camera.position;
    let visibleCount = 0;

    scene.traverse((child) => {
      // NEVER touch non-mesh nodes, player, lights, sky, or ground elements
      if (
        child.userData?.isPlayer ||
        child.userData?.alwaysVisible ||
        child.type.includes('Light') ||
        child.type === 'Scene' ||
        child.type === 'Group' ||
        !(child as THREE.Mesh).isMesh ||
        (child.parent && !child.parent.visible)
      ) {
        return;
      }

      const mesh = child as THREE.Mesh;

      // Enable Three.js native WebGL frustum culling
      mesh.frustumCulled = true;

      // Calculate distance from mesh to camera
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);
      const distToCam = worldPos.distanceTo(camPos);

      // Distance Culling (hide distant objects beyond threshold)
      if (distToCam > actualMaxDistance) {
        mesh.visible = false;
        return;
      }

      // Restore visibility if within range
      mesh.visible = true;
      visibleCount++;

      // Smooth Distance Fade Effect
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => applyFade(mat, distToCam, actualMaxDistance, fadeDistance));
        } else {
          applyFade(mesh.material, distToCam, actualMaxDistance, fadeDistance);
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
