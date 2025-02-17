// src/App.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { DraggableCube } from './components/Cube';
import { Background } from './components/Background';
import EmailForm from './components/EmailForm';
import Products from './components/Products';
import { SpeedInsights } from '@vercel/speed-insights/react'; // Import SpeedInsights
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Fixed Header Bar */}
      <header className="header-bar">
        <h1>Systematic Trading and Financial Modeling Application</h1>
      </header>
      
      {/* Hero Section with 3D Scene */}
      <section className="hero-section">
        <Canvas className="hero-canvas" camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Background />
          <DraggableCube />
        </Canvas>
        <div className="newsletter-container">
          <EmailForm />
        </div>
      </section>
      
      {/* Scrollable Content Section with Products */}
      <section className="content-section">
        <Products />
      </section>

      {/* Vercel Speed Insights Component */}
      <SpeedInsights dsn="Q3R2eN2pld1oTQdqQKMGLbjMtB8" />
    </div>
  );
}

export default App;