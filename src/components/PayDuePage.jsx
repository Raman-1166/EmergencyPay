import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmergencyContext } from '../context/EmergencyContext';
import Button from './Button';

const PayDuePage = () => {
  const navigate = useNavigate();
  const { pendingDue, setPendingDue, addTransaction } = useContext(EmergencyContext);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState(1); // 1: select method, 2: success

  const paymentOptions = [
    { id: 'UPI', label: 'UPI / QR Code', icon: '📱', desc: 'Pay via GPay, PhonePe, Paytm, etc.' },
    { id: 'NETBANKING', label: 'Net Banking', icon: '🏦', desc: 'Pay via your bank account' },
    { id: 'CARD', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay accepted' },
    { id: 'WALLET', label: 'Digital Wallet', icon: '👝', desc: 'Paytm, Amazon Pay, Mobikwik' },
  ];

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert('Please select a payment method to proceed.');
      return;
    }
    // Clear the pending due
    setPendingDue(0);
    addTransaction('Due Cleared', pendingDue, 'Credit');
    setStep(2);
  };

  if (pendingDue === 0 && step === 1) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="fade-in-up" style={{ background: 'var(--color-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
          <h2>No Dues Found</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            You have no pending dues. Your account is all clear!
          </p>
          <Button fullWidth onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

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
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔔</div>
              <h1 style={{ marginBottom: '8px' }}>Clear Your Due</h1>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Pay your pending due to unlock Emergency Payments again.
              </p>
            </div>

            {/* Auto-filled Amount Card */}
            <div style={{
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '28px',
              textAlign: 'center'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 500 }}>
                Pending Due Amount
              </p>
              <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px' }}>
                ₹{pendingDue}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '4px' }}>
                Full amount must be cleared at once
              </p>
            </div>

            {/* Payment Options */}
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
              Select Payment Method
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {paymentOptions.map(option => (
                <div
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 16px',
                    border: paymentMethod === option.id
                      ? '2px solid var(--color-primary)'
                      : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: paymentMethod === option.id
                      ? 'var(--color-primary-light)'
                      : 'var(--color-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{option.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 600,
                      color: paymentMethod === option.id ? 'var(--color-primary-dark)' : 'var(--color-text)'
                    }}>
                      {option.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      {option.desc}
                    </div>
                  </div>
                  {paymentMethod === option.id && (
                    <span style={{
                      width: '22px', height: '22px', background: 'var(--color-primary)',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0
                    }}>✓</span>
                  )}
                </div>
              ))}
            </div>

            <Button fullWidth variant="primary" onClick={handlePayNow} disabled={!paymentMethod}>
              Pay ₹{pendingDue} Now
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate('/dashboard')} style={{ marginTop: '12px' }}>
              Cancel
            </Button>
          </>
        )}

        {step === 2 && (
          <div className="fade-in-up" style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '80px', height: '80px', background: 'var(--color-success)', color: 'white',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', margin: '0 auto 24px'
            }}>✓</div>
            <h2 style={{ marginBottom: '8px' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              Your due of <strong>₹{pendingDue === 0 ? 'the full amount' : pendingDue}</strong> has been cleared.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
              Your account is now <strong style={{ color: 'var(--color-success)' }}>ACTIVE</strong> again.
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

export default PayDuePage;
