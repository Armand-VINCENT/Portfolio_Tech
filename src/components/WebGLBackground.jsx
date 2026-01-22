import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef();
  const particlesCount = 2000;

  useEffect(() => {
    console.log(
      "✅ [WebGL] ParticleField monté avec",
      particlesCount,
      "particules",
    );
    return () => console.log("🔴 [WebGL] ParticleField démonté");
  }, []);

  // Generate random positions for particles
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#39ff14"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function WebGLBackground() {
  useEffect(() => {
    console.log("✅ [WebGL] Canvas Three.js initialisé");
    return () => console.log("🔴 [WebGL] Canvas Three.js démonté");
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#39ff14" intensity={1} />
      </Canvas>
    </div>
  );
}

export default WebGLBackground;
