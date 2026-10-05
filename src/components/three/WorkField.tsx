import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const layout: Array<{ position: [number, number, number]; size: [number, number] }> = [
  { position: [-3.15, 0.55, -0.8], size: [1.9, 2.45] },
  { position: [-1.15, -0.55, 0.55], size: [1.55, 2.05] },
  { position: [0.7, 0.85, -0.2], size: [1.7, 2.15] },
  { position: [2.55, -0.15, 0.35], size: [1.85, 2.35] },
  { position: [-2.35, -1.45, -1.8], size: [1.5, 1.9] },
  { position: [1.35, -1.35, -1.1], size: [1.65, 2.05] },
  { position: [0.05, 0.05, -2.3], size: [2.05, 1.35] },
  { position: [3.15, 1.15, -1.7], size: [1.35, 1.75] },
];

function Shot({ url, position, size }: { url: string; position: [number, number, number]; size: [number, number] }) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Gallery({ urls }: { urls: string[] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;
    const targetY = state.pointer.x * 0.28;
    const targetX = state.pointer.y * -0.1;
    node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, targetY, 0.045);
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, targetX, 0.045);
    node.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
  });

  return (
    <group ref={group}>
      {urls.slice(0, layout.length).map((url, index) => (
        <Shot key={url + index} url={url} position={layout[index].position} size={layout[index].size} />
      ))}
    </group>
  );
}

export default function WorkField({ urls }: { urls: string[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 36 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Gallery urls={urls} />
      </Suspense>
    </Canvas>
  );
}
