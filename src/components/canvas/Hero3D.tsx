'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function generateSpherePoints(count: number, radius: number) {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

function Stars(props: React.ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => generateSpherePoints(5000, 1.5));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingShapes() {
    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[1, 1, 0]} scale={0.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#8b5cf6" wireframe />
            </mesh>
            <mesh position={[-1, -1, 0]} scale={0.3}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#ec4899" wireframe />
            </mesh>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <Stars />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
