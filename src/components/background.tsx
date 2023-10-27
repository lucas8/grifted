"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  MeshDistortMaterial,
  PerspectiveCamera,
} from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";

export const Background = () => {
  return (
    <Canvas className="canvas" dpr={[1, 2]}>
      <Scene />
    </Canvas>
  );
};

export default function Scene() {
  const sphere = useRef();
  const light = useRef();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
        <ambientLight intensity={1.5} />
        <pointLight
          ref={light}
          position-z={-15}
          intensity={1}
          color="#F8C069"
        />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <mesh ref={sphere} scale={1}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="white"
            envMapIntensity={0.4}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.1}
          />
        </mesh>
        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={0.8}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  );
}
