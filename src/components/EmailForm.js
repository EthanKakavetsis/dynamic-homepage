// src/components/EmailForm.js
import React, { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, simply alert the email.
    // Later, you can integrate API calls to store this email.
    alert(`Email submitted: ${email}`);
    setEmail(''); // Reset the input after submission
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Subscribe</button>
    </form>
  );
}

// Optional inline styles for a simple design
const formStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px'
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  marginRight: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: '#fff',
  cursor: 'pointer'
};

export default EmailForm;