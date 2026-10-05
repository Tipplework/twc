import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Planes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;
    node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, state.pointer.x * 0.4, 0.05);
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, state.pointer.y * -0.18, 0.05);
  });

  return (
    <group ref={group}>
      <mesh position={[-1.8, 0.15, -0.4]} rotation={[0.15, 0.45, 0.08]}>
        <planeGeometry args={[2.4, 3.1]} />
        <meshBasicMaterial color="#FFC700" transparent opacity={0.28} />
      </mesh>
      <mesh position={[1.7, -0.2, -0.8]} rotation={[-0.1, -0.4, 0.05]}>
        <planeGeometry args={[2.1, 2.7]} />
        <meshBasicMaterial color="#FF3D00" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.2, 0.8, -1.6]} rotation={[0.2, 0.1, -0.15]}>
        <planeGeometry args={[2.6, 1.5]} />
        <meshBasicMaterial color="#8A2BE2" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function HeroDepth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Planes />
    </Canvas>
  );
}
