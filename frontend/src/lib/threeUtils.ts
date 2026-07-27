import * as THREE from 'three';

/**
 * Safely disposes of a Three.js object, its geometry, material(s), and texture(s).
 * Prevents memory leaks in WebGL applications.
 */
export function disposeThreeObject(object: THREE.Object3D | null | undefined): void {
  if (!object) return;

  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh || (child as THREE.InstancedMesh).isInstancedMesh) {
      const mesh = child as THREE.Mesh;

      if (mesh.geometry) {
        mesh.geometry.dispose();
      }

      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => disposeMaterial(mat));
        } else {
          disposeMaterial(mesh.material);
        }
      }
    }
  });

  if (object.parent) {
    object.parent.remove(object);
  }
}

/**
 * Helper to dispose a material and all its texture properties.
 */
export function disposeMaterial(material: THREE.Material): void {
  if (!material) return;

  const matAny = material as any;
  for (const key of Object.keys(matAny)) {
    const value = matAny[key];
    if (value && typeof value === 'object' && value.isTexture) {
      (value as THREE.Texture).dispose();
    }
  }

  material.dispose();
}

/**
 * Disposes an HTML5 Video Element & associated VideoTexture cleanly.
 */
export function disposeVideoTexture(videoEl: HTMLVideoElement | null, texture: THREE.VideoTexture | null): void {
  if (texture) {
    texture.dispose();
  }

  if (videoEl) {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
  }
}
