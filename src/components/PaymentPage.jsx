import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmergencyContext } from '../context/EmergencyContext';
import Button from './Button';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { handleSpendBalance } = useContext(EmergencyContext);

  const [activeTab, setActiveTab] = useState('QR'); // 'QR' or 'PHONE'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1); // 1: Select/Input, 2: Amount, 3: Success

  const handlePhoneProceed = () => {
    if (phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    setStep(2);
  };

  const handleQRScan = () => {
    // Simulate successful QR scan
    setStep(2);
  };

  const handlePayment = () => {
    const payAmount = parseInt(amount, 10);
    if (isNaN(payAmount) || payAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const res = handleSpendBalance(payAmount);
    if (res.success) {
      setStep(3);
    } else {
      alert(res.message);
    }
  };

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
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ marginBottom: '8px' }}>Emergency Pay</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Pay instantly within your emergency limit.</p>
        </div>

        {step === 1 && (
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'var(--color-bg)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
              <button 
                onClick={() => setActiveTab('QR')}
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', background: activeTab === 'QR' ? 'var(--color-surface)' : 'transparent', color: activeTab === 'QR' ? 'var(--color-text)' : 'var(--color-text-secondary)', border: 'none', boxShadow: activeTab === 'QR' ? 'var(--shadow-sm)' : 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
              >
                Scan QR
              </button>
              <button 
                onClick={() => setActiveTab('PHONE')}
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', background: activeTab === 'PHONE' ? 'var(--color-surface)' : 'transparent', color: activeTab === 'PHONE' ? 'var(--color-text)' : 'var(--color-text-secondary)', border: 'none', boxShadow: activeTab === 'PHONE' ? 'var(--shadow-sm)' : 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
              >
                Phone Number
              </button>
            </div>

            {activeTab === 'QR' && (
              <div 
                onClick={handleQRScan}
                style={{ 
                  height: '240px', 
                  border: '2px dashed var(--color-border)', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  background: 'var(--color-bg)',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📷</div>
                <p style={{ fontWeight: 600 }}>Tap to Simulate QR Scan</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Align QR code within the frame</p>
              </div>
            )}

            {activeTab === 'PHONE' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Recipient Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. 9876543210" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '1.1rem', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                />
                <Button fullWidth style={{ marginTop: '16px' }} onClick={handlePhoneProceed} disabled={phoneNumber.length < 10}>
                  Proceed
                </Button>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <div className="fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '24px', padding: '16px', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Paying to</p>
              <h3 style={{ margin: 0 }}>{activeTab === 'QR' ? 'Merchant Name (Scanned)' : `+91 ${phoneNumber}`}</h3>
            </div>
            
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Enter Amount (Max ₹50/day)</label>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', fontWeight: 600 }}>₹</span>
              <input 
                type="number" 
                placeholder="0" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '1.5rem', fontWeight: 600, background: 'var(--color-bg)', color: 'var(--color-text)' }}
                autoFocus
              />
            </div>
            
            <Button fullWidth onClick={handlePayment} variant="primary">
              Pay ₹{amount || 0}
            </Button>
            <Button fullWidth variant="ghost" onClick={() => setStep(1)} style={{ marginTop: '8px' }}>
              Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in-up" style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ 
              width: '80px', height: '80px', background: 'var(--color-success)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 24px' 
            }}>
              ✓
            </div>
            <h2 style={{ marginBottom: '8px' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
              ₹{amount} has been paid securely using your emergency limit.
            </p>
            <Button fullWidth onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        )}
        
        {step === 1 && (
          <Button fullWidth variant="ghost" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
