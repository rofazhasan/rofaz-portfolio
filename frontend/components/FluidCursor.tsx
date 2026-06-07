"use client";

import { useEffect } from 'react';
import useFluidCursor from '../hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    useFluidCursor();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] select-none">
      <canvas id="fluid" className="h-full w-full opacity-[0.55] block" />
    </div>
  );
};

export default FluidCursor;
