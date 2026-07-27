import React from 'react';
import { Sky } from '@react-three/drei';
import { useGameStore } from '@/store/useGameStore';

export const DynamicLighting: React.FC = () => {
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const weather = useGameStore((s) => s.weather);
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);

  // Compute sun position based on timeOfDay (0 to 24)
  const sunElevation = Math.sin(((timeOfDay - 6) / 12) * Math.PI) * 90;
  const isNight = timeOfDay < 6 || timeOfDay > 18 || weather === 'night';

  const enableShadows = graphicsQuality !== 'low';
  const shadowMapSize =
    graphicsQuality === 'ultra'
      ? 2048
      : graphicsQuality === 'high'
      ? 1024
      : 512;

  return (
    <>
      {/* Dynamic Sunlight / Moonlight */}
      <directionalLight
        position={[
          Math.cos(((timeOfDay - 6) / 12) * Math.PI) * 50,
          Math.max(10, sunElevation * 0.8),
          30,
        ]}
        intensity={isNight ? 0.3 : weather === 'golden_hour' ? 2.5 : 1.8}
        color={
          isNight
            ? '#38bdf8'
            : weather === 'golden_hour'
            ? '#fb923c'
            : weather === 'rain'
            ? '#94a3b8'
            : '#ffffff'
        }
        castShadow={enableShadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0005}
      />

      <ambientLight intensity={isNight ? 0.35 : 0.65} />

      {/* Procedural Sky */}
      <Sky
        distance={450000}
        sunPosition={[
          Math.cos(((timeOfDay - 6) / 12) * Math.PI) * 100,
          Math.max(-10, sunElevation),
          50,
        ]}
        inclination={0.6}
        azimuth={0.25}
      />

      {/* Fog based on weather */}
      {(weather === 'fog' || weather === 'rain') && (
        <fog attach="fog" args={['#64748b', 10, weather === 'fog' ? 45 : 70]} />
      )}
    </>
  );
};
