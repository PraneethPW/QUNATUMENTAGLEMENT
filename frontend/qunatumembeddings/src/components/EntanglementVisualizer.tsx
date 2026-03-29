import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function ParticleField({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null!);

  // Generate random particles
  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    // 🔥 rotate entire system
    ref.current.rotation.y += 0.002;
    ref.current.rotation.x += 0.001;

    if (active) {
      // 🔥 pulse effect
      ref.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      );
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#f97316"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// 🔥 CONNECTING LINES (ENTANGLEMENT FEEL)
function Connections() {
  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 100; i++) {
      vertices.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );

      vertices.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    return geometry;
  }, []);

  return (
    <lineSegments geometry={lines}>
      <lineBasicMaterial color="#fb923c" transparent opacity={0.3} />
    </lineSegments>
  );
}

export default function EntanglementVisualizer({ active }: { active: boolean }) {
  return (
    <div className="h-[400px] w-full mt-6 mb-6 rounded-xl overflow-hidden border border-zinc-800">

      <Canvas camera={{ position: [0, 0, 6] }}>

        {/* Ambient glow */}
        <ambientLight intensity={0.5} />

        {/* 🔥 PARTICLES */}
        <ParticleField active={active} />

        {/* 🔥 CONNECTIONS */}
        <Connections />

        {/* Controls (optional rotation) */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

      </Canvas>

    </div>
  );
}