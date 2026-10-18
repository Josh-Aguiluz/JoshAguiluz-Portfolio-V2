import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

function ScrollingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lastScroll = useRef(0);
  
  // Use scroll monitoring directly inside the 3D component
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const currentYValue = scrollY.get();
    const currentProgress = scrollYProgress.get();

    // Calculate velocity for wind effect
    const scrollVelocity = currentYValue - lastScroll.current;
    lastScroll.current = currentYValue;

    // Mouse Lighting Interaction
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouse.current.x * 5, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mouse.current.y * 5, 0.1);
    }

    // Scroll Positioning Logic
    let targetX = 0;
    let targetY = 0.5;
    let targetScale = 2.2;

    if (currentProgress < 0.05) {
      const t = currentProgress / 0.05;
      targetX = THREE.MathUtils.lerp(3.5, -3.5, t);
      targetY = THREE.MathUtils.lerp(2.0, 0, t);
      targetScale = 2.2;
    } else if (currentProgress < 0.12) {
      const t = (currentProgress - 0.05) / 0.07;
      targetX = THREE.MathUtils.lerp(-3.5, 3.5, t);
      targetY = THREE.MathUtils.lerp(0, -1.5, t);
      targetScale = 2.2;
    } else if (currentProgress < 0.30) {
      const t = (currentProgress - 0.12) / 0.18;
      targetX = THREE.MathUtils.lerp(3.5, -2.5, t);
      targetY = THREE.MathUtils.lerp(-1.5, 0.5, t);
      targetScale = THREE.MathUtils.lerp(2.2, 2.0, t);
    } else if (currentProgress < 0.60) {
      const t = (currentProgress - 0.30) / 0.30;
      targetX = THREE.MathUtils.lerp(-2.5, 2.5, t);
      targetY = 0.5;
      targetScale = THREE.MathUtils.lerp(2.0, 1.8, t);
    } else if (currentProgress < 0.90) {
      const t = (currentProgress - 0.60) / 0.30;
      targetX = THREE.MathUtils.lerp(2.5, 0, t);
      targetY = 0.5;
      targetScale = THREE.MathUtils.lerp(1.8, 2.2, t);
    } else {
      targetX = 0;
      targetY = 0.5;
      targetScale = 2.2;
    }

    // Wind/Inertia Effect
    const windForce = scrollVelocity * 0.005;
    targetY += windForce;

    // Apply Transformations
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);

    const currentScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    meshRef.current.scale.set(nextScale, nextScale, nextScale);

    // Rotation Inertia
    meshRef.current.rotation.x += scrollVelocity * 0.002;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={2} color="#FDB931" distance={10} decay={2} />

      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron ref={meshRef} args={[1, 0]} position={[3.5, 2.0, 0]}>
          <meshStandardMaterial
            wireframe={true}
            color="#FFD700"
            roughness={0.5}
            transparent={true}
            opacity={0.6}
          />
        </Icosahedron>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <ScrollingSphere />
      </Canvas>
    </div>
  );
}
