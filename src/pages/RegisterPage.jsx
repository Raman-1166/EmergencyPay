import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    aadhaar: '',
    cardNumber: '',
    cardExpiry: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Masking and length validation
    if (name === 'mobile' && value.length > 10) return;
    if (name === 'aadhaar' && value.length > 12) return;
    if (name === 'cardNumber' && value.length > 16) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.mobile.length !== 10) return setError('Mobile number must be 10 digits.');
    if (formData.aadhaar.length !== 12) return setError('Aadhaar number must be 12 digits.');
    if (formData.cardNumber.length !== 16) return setError('Card number must be 16 digits.');
    if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) return setError('Expiry must be in MM/YY format.');

    try {
      await api.post('/auth/register', formData);
      
      // Auto-login after successful registration
      const loginResponse = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { jwt, email, role } = loginResponse.data;
      login({ email, role }, jwt);
      
      alert('Registration successful! Redirecting to dashboard...');
      navigate('/');
    } catch (err) {
      const errorData = err.response?.data;
      const errorMessage = typeof errorData === 'string' 
        ? errorData 
        : (errorData?.message || errorData?.error || 'Registration failed. Please try again.');
      setError(errorMessage);
    }
  };

  const maskValue = (value, showLast4 = 4) => {
    if (!value) return '';
    const visiblePart = value.slice(-showLast4);
    const maskedPart = value.slice(0, -showLast4).replace(/\d/g, '*');
    return maskedPart + visiblePart;
  };

  return (
    <div className="auth-container fade-in-up">
      <div className="auth-card">
        <h2>Join EmergencyPay</h2>
        <p>Create your secure account to access micro-credit.</p>
        
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="10-digit number" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aadhaar Number (Secure)</label>
              <input 
                type="password" 
                name="aadhaar" 
                value={formData.aadhaar} 
                onChange={handleChange} 
                required 
                placeholder="12-digit Aadhaar"
              />
              {formData.aadhaar && (
                <div style={{ marginTop: '8px', fontSize: '14px', letterSpacing: '2px', color: '#4facfe', fontWeight: '500' }}>
                  Entered: {maskValue(formData.aadhaar, 4)}
                </div>
              )}
              <small>Only last 4 digits are visible to admins.</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Debit Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleChange} 
                required 
                placeholder="16-digit card number"
              />
            </div>
            <div className="form-group" style={{ maxWidth: '120px' }}>
              <label>Expiry</label>
              <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} required placeholder="MM/YY" />
            </div>
          </div>

          <div className="form-group">
            <label>Create Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Min 6 characters" minLength="6" />
          </div>

          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
