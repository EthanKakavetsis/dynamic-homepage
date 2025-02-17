// src/components/Cube.js
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export function DraggableCube(props) {
  const meshRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState(null);
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [rotationVelocity, setRotationVelocity] = useState({ x: 0, y: 0, z: 0 });

  const onPointerDown = (e) => {
    setDragging(true);
    setLastPointer({ x: e.clientX, y: e.clientY });
    setVelocity({ x: 0, y: 0, z: 0 });
    setRotationVelocity({ x: 0, y: 0, z: 0 });
  };

  const onPointerMove = (e) => {
    if (!dragging || !lastPointer || !meshRef.current) return;
    const dx = e.clientX - lastPointer.x;
    const dy = e.clientY - lastPointer.y;
    setLastPointer({ x: e.clientX, y: e.clientY });
    // Update cube's position
    meshRef.current.position.x += dx * 0.01;
    meshRef.current.position.y -= dy * 0.01;
    // Update momentum for translation and rotation
    setVelocity({ x: dx * 0.005, y: -dy * 0.005, z: 0 });
    setRotationVelocity({ x: dy * 0.005, y: dx * 0.005, z: 0 });
  };

  const onPointerUp = () => {
    setDragging(false);
    setLastPointer(null);
  };

  useFrame((state, delta) => {
    if (!dragging && meshRef.current) {
      // Continue moving with momentum
      meshRef.current.position.x += velocity.x * delta;
      meshRef.current.position.y += velocity.y * delta;
      setVelocity((prev) => ({
        x: prev.x * 0.98,
        y: prev.y * 0.98,
        z: prev.z * 0.98,
      }));
      // Apply rotation momentum
      meshRef.current.rotation.x += rotationVelocity.x * delta;
      meshRef.current.rotation.y += rotationVelocity.y * delta;
      setRotationVelocity((prev) => ({
        x: prev.x * 0.98,
        y: prev.y * 0.98,
        z: prev.z * 0.98,
      }));
    }
  });

  return (
    <mesh
      ref={meshRef}
      {...props}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}