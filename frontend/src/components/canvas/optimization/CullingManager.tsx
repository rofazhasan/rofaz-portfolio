import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';

interface CullingManagerProps {
  fadeDistance?: number;
}

const projScreenMatrix = new THREE.Matrix4();
const frustum = new THREE.Frustum();
const tempSphere = new THREE.Sphere();

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
      ? 80
      : graphicsQuality === 'medium'
      ? 120
      : graphicsQuality === 'high'
      ? 180
      : 250; // ultra

  useFrame(() => {
    frameCountRef.current++;

    // Update camera frustum matrix
    camera.updateMatrixWorld();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);

    const camPos = camera.position;
    let visibleCount = 0;

    scene.traverse((child) => {
      // NEVER touch non-mesh nodes, player, lights, or objects inside a hidden parent
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

      // Ensure geometry bounding sphere exists
      if (!mesh.geometry.boundingSphere) {
        mesh.geometry.computeBoundingSphere();
      }

      // Calculate distance to camera
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);
      const distToCam = worldPos.distanceTo(camPos);

      // 1. Distance Culling
      if (distToCam > actualMaxDistance) {
        mesh.visible = false;
        return;
      }

      // 2. Frustum Culling using bounding sphere
      if (mesh.geometry.boundingSphere) {
        tempSphere.copy(mesh.geometry.boundingSphere);
        tempSphere.applyMatrix4(mesh.matrixWorld);

        if (!frustum.intersectsSphere(tempSphere)) {
          mesh.visible = false;
          return;
        }
      }

      // Object is visible
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
