import React, { useState } from 'react';
import './Login.css';

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('@rcciit.org.in')) {
      setError('Please use your official @rcciit.org.in email ID.');
    } else {
      setError('');
      onLoginSuccess(email);
      onClose();
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className="login-overlay">
      <div className="login-box glass">
        <button className="btn-close-modal" onClick={onClose}>✕</button>
        <h2>{isSignUp ? 'Create an Account' : 'Student / Faculty Login'}</h2>
        <p className="login-desc">
          {isSignUp ? 'Join your campus food network.' : 'Access your canteen account using your college email address.'}
        </p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>College Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. cseai2025039@rcciit.org.in" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            {error && <p className="error-text">{error}</p>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="btn-primary w-100 login-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          {isSignUp ? (
            <p>Already have an account? <span onClick={toggleMode} style={{cursor: 'pointer', textDecoration: 'underline'}}>Sign in</span></p>
          ) : (
            <p>Don't have an account? <span onClick={toggleMode} style={{cursor: 'pointer', textDecoration: 'underline'}}>Sign up</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
