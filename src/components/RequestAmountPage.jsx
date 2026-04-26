import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmergencyContext } from '../context/EmergencyContext';
import Button from './Button';

const RequestAmountPage = () => {
  const navigate = useNavigate();
  const { handleRequestNextAmount, hasRequestedToday, securityDeposit, walletBalance } = useContext(EmergencyContext);

  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(1);

  // Guard checks
  if (securityDeposit === 0) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="fade-in-up" style={{ background: 'var(--color-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '480px', margin: '0 auto' }}>
          <h2>Deposit Required</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            You must make a one-time security deposit before you can request additional emergency funds.
          </p>
          <Button fullWidth onClick={() => navigate('/deposit')}>Add Deposit Now</Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/dashboard')} style={{ marginTop: '12px' }}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (walletBalance >= 50 && step === 1) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="fade-in-up" style={{ background: 'var(--color-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚡</div>
          <h2>Balance Available</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            Your current wallet balance is <strong>₹{walletBalance}</strong>. Please use your available balance first before requesting more funds.
          </p>
          <Button fullWidth onClick={() => navigate('/payment')}>Use Balance Now</Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/dashboard')} style={{ marginTop: '12px' }}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (hasRequestedToday && step === 1) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="fade-in-up" style={{ background: 'var(--color-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '480px', margin: '0 auto' }}>
          <h2>Daily Limit Reached</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            You have already made a credit request today. You are limited to 1 request per day.
          </p>
          <Button fullWidth onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!category) {
      alert('Please select an enquiry category.');
      return;
    }
    if (reason.trim().length < 5) {
      alert('Please provide a brief reason (at least 5 characters).');
      return;
    }

    const res = handleRequestNextAmount(category, reason);
    if (res.success) {
      setStep(2);
    } else {
      alert(res.message);
    }
  };

  const categories = [
    { id: 'Food', label: 'Food & Groceries', icon: '🍽️' },
    { id: 'Petrol', label: 'Petrol / Fuel', icon: '⛽' },
    { id: 'Payment', label: 'Payment to Someone', icon: '💸' },
    { id: 'Other', label: 'Other Emergency', icon: '🚨' },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="fade-in-up" style={{
        background: 'var(--color-surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {step === 1 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
              <h1 style={{ marginBottom: '8px' }}>Request Credit</h1>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Request your next emergency limit of ₹50. Please specify the reason below.
              </p>
            </div>

            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>What is the emergency?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {categories.map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px', 
                    border: category === cat.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', 
                    borderRadius: 'var(--radius-md)',
                    background: category === cat.id ? 'var(--color-primary-light)' : 'var(--color-bg)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{cat.icon}</span>
                  <span style={{ fontWeight: 500, color: category === cat.id ? 'var(--color-primary-dark)' : 'var(--color-text)' }}>{cat.label}</span>
                </div>
              ))}
            </div>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Brief Reason</label>
            <textarea 
              placeholder="E.g., Need to pay for auto rickshaw..." 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--color-border)', 
                fontSize: '1rem', 
                background: 'var(--color-bg)', 
                color: 'var(--color-text)',
                marginBottom: '32px',
                fontFamily: 'inherit',
                resize: 'none'
              }}
            />

            <Button fullWidth onClick={handleSubmit} variant="primary" disabled={!category || !reason.trim()}>
              Submit Request
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate('/dashboard')} style={{ marginTop: '12px' }}>
              Cancel
            </Button>
          </>
        )}

        {step === 2 && (
          <div className="fade-in-up" style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ 
              width: '80px', height: '80px', background: 'var(--color-success)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 24px' 
            }}>
              ✓
            </div>
            <h2 style={{ marginBottom: '8px' }}>Request Approved!</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
              ₹50 has been successfully added to your wallet balance.
            </p>
            <Button fullWidth onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestAmountPage;
