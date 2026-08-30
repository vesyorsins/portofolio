"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function PorcelainSculpture() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerTorusRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (outerTorusRef.current) {
      outerTorusRef.current.rotation.z += delta * 0.1;
      outerTorusRef.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        {/* Core Geometric Solid: Warm Matte Ceramic Clay */}
        <mesh ref={coreRef} scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#e7e4dc"
            roughness={0.4}
            metalness={0.15}
            flatShading
          />
        </mesh>

        {/* Outer Ring: Warm Stone & Sand Torus */}
        <group ref={outerTorusRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.2, 0.018, 16, 80]} />
            <meshStandardMaterial color="#a8a29e" roughness={0.3} metalness={0.3} />
          </mesh>

          <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[2.5, 0.012, 16, 80]} />
            <meshStandardMaterial color="#c7c2b8" roughness={0.3} metalness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function WarmStudioLighting() {
  return (
    <>
      <ambientLight intensity={1.2} color="#fffcf5" />
      <directionalLight position={[6, 8, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-6, -4, -3]} intensity={0.8} color="#f4efe6" />
      <pointLight position={[0, 0, 4]} intensity={1} color="#ffffff" />
    </>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="relative w-full h-[380px] md:h-[480px] lg:h-[520px] flex items-center justify-center select-none">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <WarmStudioLighting />
          <PorcelainSculpture />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 2.8}
          />
        </Suspense>
      </Canvas>

      {/* Clean HUD label */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[11px] font-mono text-stone-500 border-t border-[#e6e3db] pt-2">
        <span className="text-stone-700 font-medium">3D CERAMIC SCULPTURE</span>
        <span className="hidden sm:inline text-stone-400">DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
