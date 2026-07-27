import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';

export const DeviceBenchmark: React.FC = () => {
  const { gl } = useThree();
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);
  const setGraphicsQuality = useGameStore((s) => s.setGraphicsQuality);

  useEffect(() => {
    // Only benchmark if quality is set to 'auto' or 'high' initially
    if (graphicsQuality !== 'auto') return;

    let frameCount = 0;
    let startTime = performance.now();
    let animId: number;

    const measure = () => {
      frameCount++;
      const elapsed = performance.now() - startTime;

      if (elapsed >= 1200) {
        const fps = (frameCount * 1000) / elapsed;

        // Auto-assign quality preset based on benchmark FPS
        if (fps >= 55) {
          setGraphicsQuality('ultra');
        } else if (fps >= 42) {
          setGraphicsQuality('high');
        } else if (fps >= 28) {
          setGraphicsQuality('medium');
        } else {
          setGraphicsQuality('low');
        }
      } else {
        animId = requestAnimationFrame(measure);
      }
    };

    animId = requestAnimationFrame(measure);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [graphicsQuality, setGraphicsQuality]);

  return null;
};
