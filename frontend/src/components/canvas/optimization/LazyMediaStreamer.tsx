import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { disposeVideoTexture } from '@/lib/threeUtils';
import { useGameStore } from '@/store/useGameStore';

interface VideoScreenProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  videoUrl?: string;
  fallbackPoster?: string;
}

export const LazyVideoScreen: React.FC<VideoScreenProps> = ({
  position,
  rotation = [0, 0, 0],
  size = [4, 2.25],
  videoUrl,
  fallbackPoster = '#1e293b',
}) => {
  const { camera } = useThree();
  const audioMuted = useGameStore((s) => s.audioMuted);
  const sfxVolume = useGameStore((s) => s.sfxVolume);

  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isLoadedRef = useRef(false);

  const worldPos = new THREE.Vector3(...position);

  useFrame(() => {
    const dist = camera.position.distanceTo(worldPos);

    // Only stream video if within 25 meters
    const isNearby = dist < 25;

    if (isNearby && !isLoadedRef.current && videoUrl) {
      isLoadedRef.current = true;
      const vid = document.createElement('video');
      vid.src = videoUrl;
      vid.crossOrigin = 'Anonymous';
      vid.loop = true;
      vid.muted = true; // start muted for autoplay compliance
      vid.play().catch(() => {});

      const texture = new THREE.VideoTexture(vid);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      videoRef.current = vid;
      setVideoTexture(texture);
    } else if (!isNearby && isLoadedRef.current) {
      isLoadedRef.current = false;
      disposeVideoTexture(videoRef.current, videoTexture);
      videoRef.current = null;
      setVideoTexture(null);
    }
  });

  useEffect(() => {
    return () => {
      disposeVideoTexture(videoRef.current, videoTexture);
    };
  }, [videoTexture]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      {videoTexture ? (
        <meshBasicMaterial map={videoTexture} />
      ) : (
        <meshStandardMaterial color={fallbackPoster} roughness={0.4} />
      )}
    </mesh>
  );
};
