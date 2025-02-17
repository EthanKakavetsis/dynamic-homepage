// src/components/Products.js
import React from 'react';
import './Products.css';

const Products = () => {
  return (
    <div className="products-section">
      <h2>Our Products</h2>
      <div className="products-container">
        <div
          className="product-card"
          onClick={() => window.open('https://example.com/ai-agents', '_blank')}
        >
          <h3>AI Agents</h3>
          <p>
            Intelligent, autonomous agents that optimize your trading strategies.
          </p>
        </div>
        <div
          className="product-card"
          onClick={() => window.open('https://example.com/portfolio-risk', '_blank')}
        >
          <h3>Portfolio & Risk Management</h3>
          <p>
            Advanced tools for managing stock portfolios and mitigating risk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;