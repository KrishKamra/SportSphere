import { useRef } from 'react';
import { useThreeScene } from '@/hooks/useThreeScene';

export function SphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useThreeScene(canvasRef);

  return <canvas id="sphere-canvas" ref={canvasRef} aria-hidden="true" />;
}
