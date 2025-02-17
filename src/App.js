// src/App.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { DraggableCube } from './components/Cube';
import { Background } from './components/Background';
import EmailForm from './components/EmailForm';
import Products from './components/Products';
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
      
      {/* Scrollable Content Section with Product Features */}
      <section className="content-section">
        <Products />
      </section>
    </div>
  );
}

export default App;