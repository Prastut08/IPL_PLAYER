import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HolographicSphere() {
  const sphereRef = useRef();
  const groupRef = useRef();
  const particlesRef = useRef([]);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.002;
      sphereRef.current.rotation.y += 0.003;
    }
    if (groupRef.current) groupRef.current.rotation.y += 0.0008;

    // Animate particles simple lifecycle
    particlesRef.current.forEach((p, i) => {
      p.position.x += p.vx;
      p.position.y += p.vy;
      p.position.z += p.vz;
      p.life -= 0.01;
      if (p.life <= 0) particlesRef.current.splice(i, 1);
    });
  });

  useEffect(() => {
    const spawn = setInterval(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.4 + Math.random() * 0.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      particlesRef.current.push({ position: new THREE.Vector3(x, y, z), vx: (Math.random() - 0.5) * 0.01, vy: (Math.random() - 0.5) * 0.01, vz: (Math.random() - 0.5) * 0.01, size: Math.random() * 0.03 + 0.02, life: 1.0 });
    }, 120);
    return () => clearInterval(spawn);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Core layered icosahedron */}
      <mesh ref={sphereRef} scale={1.15}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={0.8} roughness={0.2} metalness={0.6} transparent opacity={0.95} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={1.17}>
        <icosahedronGeometry args={[1.01, 3]} />
        <meshBasicMaterial color="#a020f0" wireframe opacity={0.35} transparent />
      </mesh>

      {/* Rings */}
      <group rotation={[0.5, 0, 0.3]}>
        <mesh>
          <torusGeometry args={[1.5, 0.03, 16, 64]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.9} metalness={0.8} roughness={0.1} />
        </mesh>
      </group>

      <group rotation={[0, 0.4, 0.2]}>
        <mesh>
          <torusGeometry args={[1.85, 0.02, 12, 64]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.7} />
        </mesh>
      </group>

      <group rotation={[0.3, 0.7, 0]}>
        <mesh>
          <torusGeometry args={[1.3, 0.04, 12, 64]} />
          <meshStandardMaterial color="#ff006e" emissive="#ff006e" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Soft glow shell */}
      <mesh scale={1.35}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.12} />
      </mesh>

      {/* Particle dots rendered as small meshes */}
      <group>
        {particlesRef.current.map((p, i) => (
          <mesh key={i} position={[p.position.x, p.position.y, p.position.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial color={'#00d9ff'} emissive={'#00d9ff'} transparent opacity={Math.max(0, p.life)} />
          </mesh>
        ))}
      </group>

      {/* Stadium rim and spotlights for cinematic feel */}
      <group position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[3.5, 0.2, 16, 200]} />
          <meshStandardMaterial color="#0f1742" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <spotLight position={[5, 5, 5]} angle={0.6} penumbra={0.4} intensity={1.2} color="#00d9ff" />
      <spotLight position={[-5, 5, 5]} angle={0.6} penumbra={0.4} intensity={0.9} color="#ffd700" />
    </group>
  );
}
