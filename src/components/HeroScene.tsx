'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Liquid metal sphere ── */
function LiquidSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    /* Smooth mouse follow */
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, pointer.x * 0.15, 0.03);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, pointer.y * 0.1, 0.03);
    meshRef.current.rotation.x = mouseRef.current.y + Math.sin(Date.now() * 0.0002) * 0.05;
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z = mouseRef.current.x * 0.3;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.38;

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.2}
      floatIntensity={0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#1a1a1a"
          roughness={0.05}
          metalness={0.95}
          distort={0.25}
          speed={1.8}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

/* ── Thin orbiting ring ── */
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x += 0.001;
    ringRef.current.rotation.z += 0.003;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.5;

  return (
    <mesh ref={ringRef} scale={scale} position={[0, 0, -0.3]}>
      <torusGeometry args={[1, 0.008, 16, 120]} />
      <meshStandardMaterial
        color="#d4d4d4"
        roughness={0.3}
        metalness={0.6}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

/* ── Subtle floating particles ── */
function Particles({ count = 20 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a0a0a0"
        size={0.02}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Main exported component ── */
export default function HeroScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: 400 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Studio-style lighting for premium look */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#6b9478" />
        <directionalLight position={[0, -3, 4]} intensity={0.3} color="#e0e0e0" />

        {/* Environment map for realistic reflections */}
        <Environment preset="city" environmentIntensity={0.6} />

        <LiquidSphere />
        <OrbitRing />
        <Particles />
      </Canvas>
    </div>
  );
}
