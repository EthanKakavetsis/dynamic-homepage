// src/components/Background.js
import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';

// Advanced fractal background material with dynamic Riemann simulation and fade
const AdvancedFractalMaterial = shaderMaterial(
  { time: 0 },
  // Vertex Shader: pass UV coordinates.
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader: Render a dynamic fractal simulation with Riemann sum fill and fade effect.
  glsl`
    uniform float time;
    varying vec2 vUv;
    
    // Dynamic function: a sine wave with changing amplitude.
    float f(float x) {
      return 0.5 + 0.3 * sin(6.0 * x + time);
    }
    
    void main() {
      // Map uv from [0,1] to [-1,1]
      vec2 uv = (vUv - 0.5) * 2.0;
      // Zoom out a bit (adjust scale as needed)
      uv *= 1.0;
      
      // Base background color is black.
      vec3 bgColor = vec3(0.0);
      
      // Evaluate the function at normalized x
      float xNorm = (uv.x + 1.0) * 0.5;
      float yCurve = f(xNorm);
      float yCurveMapped = yCurve * 2.0 - 1.0;
      
      // Simulate Riemann sums:
      float intervals = 10.0;
      float rectWidth = 2.0 / intervals;
      float col = floor((uv.x + 1.0) / rectWidth);
      float xLeft = -1.0 + col * rectWidth;
      float xMid = xLeft + rectWidth * 0.5;
      float xMidNorm = (xMid + 1.0) * 0.5;
      float yRect = f(xMidNorm);
      float yRectMapped = yRect * 2.0 - 1.0;
      
      // Create a fade factor over time for a more dynamic effect.
      float fade = 0.5 + 0.5 * sin(time * 0.5);
      
      // Determine if current fragment is under the rectangle fill.
      float inRect = step(uv.y, yRectMapped) * fade;
      
      // Use dark green fill for the rectangle.
      vec3 fillColor = vec3(0.0, 0.8, 0.0);
      // Use white for an edge outline.
      vec3 outlineColor = vec3(1.0);
      
      vec3 baseColor = mix(bgColor, fillColor, inRect);
      
      // Add a subtle outline near the edge of the function.
      float edge = smoothstep(0.02, 0.04, abs(uv.y - yRectMapped));
      vec3 finalColor = mix(baseColor, outlineColor, edge);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);
extend({ AdvancedFractalMaterial });

export function Background() {
  const materialRef = useRef();
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
  });
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <advancedFractalMaterial ref={materialRef} />
    </mesh>
  );
}