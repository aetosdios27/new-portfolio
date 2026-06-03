"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type PatternFieldProps = {
  mode: "projects" | "blog";
  agitated?: boolean;
};

function Lines({ mode, agitated = false }: PatternFieldProps) {
  const ref = useRef<THREE.LineSegments>(null);
  const points = useMemo(() => {
    return Array.from({ length: mode === "projects" ? 32 : 18 }, (_, index) => ({
      seed: index * 1.713,
      x: Math.random() * 6 - 3,
      y: Math.random() * 4 - 2,
    }));
  }, [mode]);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime * (agitated ? 2.8 : 0.65);
    const verts: number[] = [];

    if (mode === "projects") {
      const moved = points.map((p) => ({
        x: p.x + Math.sin(time + p.seed) * 0.22,
        y: p.y + Math.cos(time * 0.8 + p.seed) * 0.18,
      }));
      for (let i = 0; i < moved.length; i += 1) {
        for (let j = i + 1; j < moved.length; j += 1) {
          const dx = moved[i].x - moved[j].x;
          const dy = moved[i].y - moved[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < 1.05) {
            verts.push(moved[i].x, moved[i].y, 0, moved[j].x, moved[j].y, 0);
          }
        }
      }
    } else {
      for (const p of points) {
        let x = p.x;
        let y = p.y;
        for (let i = 0; i < 14; i += 1) {
          const angle = Math.sin(x * 1.5 + time + p.seed) + Math.cos(y * 1.2 - time);
          const nx = x + Math.cos(angle) * 0.16;
          const ny = y + Math.sin(angle) * 0.16;
          verts.push(x, y, 0, nx, ny, 0);
          x = nx;
          y = ny;
        }
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geometry.computeBoundingSphere();
    if (ref.current) ref.current.geometry = geometry;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={mode === "projects" ? "#38bdf8" : "#98a7ff"} transparent opacity={0.22} />
    </lineSegments>
  );
}

export function PatternField(props: PatternFieldProps) {
  return (
    <div className="pattern-stage" aria-hidden="true">
      <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 86 }}>
        <Lines {...props} />
      </Canvas>
    </div>
  );
}
