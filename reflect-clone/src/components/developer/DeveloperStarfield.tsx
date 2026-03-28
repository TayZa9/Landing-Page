"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export function DeveloperStarfield() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <Stars
          radius={90}
          depth={60}
          count={5000}
          factor={3.5}
          saturation={0.3}
          fade
          speed={0.4}
        />
      </Canvas>
    </div>
  );
}
