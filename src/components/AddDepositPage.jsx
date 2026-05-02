import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmergencyContext } from '../context/EmergencyContext';
import Button from './Button';

const AddDepositPage = () => {
  const navigate = useNavigate();
  const { handleAddDeposit, securityDeposit } = useContext(EmergencyContext);

  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // 'UPI', 'CARD', 'NETBANKING'
  const [step, setStep] = useState(1);

  // If already deposited, don't allow access
  if (securityDeposit > 0 && step === 1) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="fade-in-up" style={{ background: 'var(--color-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '480px', margin: '0 auto' }}>
          <h2>Deposit Already Made</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            You have already made your one-time security deposit of ₹{securityDeposit}.
          </p>
          <Button fullWidth onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleProceed = () => {
    const depAmount = parseInt(amount, 10);
    if (isNaN(depAmount) || depAmount < 500) {
      alert('Please enter a valid amount of at least ₹500.');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const res = handleAddDeposit(depAmount);
    if (res.success) {
      setStep(2); // Success step
    } else {
      alert(res.message);
    }
  };

  const paymentOptions = [
    { id: 'UPI', label: 'UPI / QR', icon: '📱' },
    { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
    { id: 'NETBANKING', label: 'Net Banking', icon: '🏦' }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="fade-in-up" style={{
        background: 'var(--color-surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        {step === 1 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛡️</div>
              <h1 style={{ marginBottom: '8px' }}>Security Deposit</h1>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Add a one-time deposit of at least ₹500 to unlock your credit limits.
              </p>
            </div>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Enter Deposit Amount</label>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', fontWeight: 600 }}>₹</span>
              <input 
                type="number" 
                placeholder="500" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 40px', borderRadius: 'var(--radius-md)', border: amount && parseInt(amount) < 500 ? '1px solid var(--color-danger)' : '1px solid var(--color-border)', fontSize: '1.5rem', fontWeight: 600, background: 'var(--color-bg)', color: 'var(--color-text)' }}
                autoFocus
              />
              {amount && parseInt(amount) < 500 && (
                <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 500 }}>
                  ⚠️ Minimum security deposit is ₹500.
                </p>
              )}
            </div>

            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Select Payment Method</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {paymentOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '16px', 
                    border: paymentMethod === option.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', 
                    borderRadius: 'var(--radius-md)',
                    background: paymentMethod === option.id ? 'var(--color-primary-light)' : 'var(--color-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem', marginRight: '16px' }}>{option.icon}</span>
                  <span style={{ fontWeight: 500, flex: 1, color: paymentMethod === option.id ? 'var(--color-primary-dark)' : 'var(--color-text)' }}>{option.label}</span>
                  {paymentMethod === option.id && <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>}
                </div>
              ))}
            </div>

            <Button 
              fullWidth 
              onClick={handleProceed} 
              variant="primary" 
              disabled={!amount || !paymentMethod || parseInt(amount) < 500}
            >
              Proceed to Pay
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
            <h2 style={{ marginBottom: '8px' }}>Deposit Successful!</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
              ₹{amount} has been securely added to your security deposit.
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

export default AddDepositPage;
