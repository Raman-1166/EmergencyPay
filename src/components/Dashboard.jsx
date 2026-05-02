import { useContext } from 'react';
import { EmergencyContext } from '../context/EmergencyContext';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import './Dashboard.css';

/* ── SVG Icons ── */
const WalletIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const EmergencyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const AddMoneyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const DepositIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-4.79"/>
    <polyline points="12 7 12 12 16 14"/>
  </svg>
);

/* ── Dashboard Component ── */
const Dashboard = () => {
  const navigate = useNavigate();

  const {
    walletBalance,
    securityDeposit,
    pendingDue,
    userStatus,
    transactions,
    handleAddDeposit,
    handleRequestNextAmount,
    setPendingDue
  } = useContext(EmergencyContext);

  const onAddDeposit = () => {
    navigate('/deposit');
  };

  const onRequestNextAmount = () => {
    navigate('/request');
  };

  const handleSimulateDue = () => {
    // Hidden debug function
    setPendingDue(1200);
  };

  const handleEmergencyPay = () => {
    if (userStatus === 'RESTRICTED') return;
    navigate('/payment');
  };

  return (
    <main className="dashboard" id="main-content" aria-label="Dashboard">

      {/* ── Hero greeting ── */}
      <section className="dashboard__hero fade-in-up" aria-label="User greeting">
        <div className="container">
          <div className="dashboard__greeting-row">
            <div>
              <h1 className="dashboard__heading">
                Hello, Raman 👋
              </h1>
              <p className="dashboard__subheading">
                Status: <span className={`status-pill status-pill--${userStatus.toLowerCase()}`}>{userStatus}</span>
              </p>
            </div>
            <div className="dashboard__meta">
              <span className="dashboard__account-id">EP-2024-00142</span>
              <span className="dashboard__member-since">Member since April 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Security Deposit Prompt Banner (Conditional) ── */}
      {transactions.length > 1 && securityDeposit === 0 && (
        <section className="dashboard__warning-wrap fade-in-up" style={{ marginBottom: '16px' }}>
          <div className="container">
            <div className="dashboard__warning-banner" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderColor: 'var(--color-primary)' }}>
              <ShieldIcon />
              <div className="dashboard__warning-content">
                <strong>Action Required:</strong> You've used your emergency limit! To unlock your next credit amount, please make a one-time security deposit.
              </div>
              <Button size="sm" variant="primary" onClick={onAddDeposit}>Deposit Now</Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Warning Banner (Conditional) ── */}
      {pendingDue > 0 && (
        <section className="dashboard__warning-wrap fade-in-up">
          <div className="container">
            <div className="dashboard__warning-banner">
              <AlertIcon />
              <div className="dashboard__warning-content">
                <strong>Account Restricted:</strong> You have a pending due of ₹{pendingDue}. Please clear it to resume Emergency Payments.
              </div>
              <Button size="sm" variant="secondary" onClick={() => navigate('/pay-due')}>Pay Now</Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Status banner (Standard) ── */}
      <section className="dashboard__banner-wrap" aria-label="Account status">
        <div className="container">
          <div className="dashboard__status-banner fade-in-up delay-1">
            <div className="dashboard__status-dot" aria-hidden="true" />
            <span className="dashboard__status-text">
              {userStatus === 'ACTIVE' ? 'All systems operational' : 'Limited functionality available'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="dashboard__section" aria-label="Financial summary">
        <div className="container">
          <div className="dashboard__cards">
            <div className="fade-in-up delay-2">
              <Card
                label="Wallet Balance"
                value={walletBalance}
                icon={<WalletIcon />}
                variant="default"
              />
            </div>
            <div className="fade-in-up delay-3">
              <Card
                label="Security Deposit"
                value={securityDeposit}
                icon={<ShieldIcon />}
                variant="success"
              />
            </div>
            <div className="fade-in-up delay-4">
              <Card
                label="Pending Due"
                value={pendingDue}
                icon={<AlertIcon />}
                variant={pendingDue > 0 ? "danger" : "default"}
                description={pendingDue > 0 ? "Payment overdue" : "No dues"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Actions ── */}
      <section className="dashboard__section" aria-label="Quick actions">
        <div className="container">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Quick Actions</h2>
            <p className="dashboard__section-subtitle" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Note: A 5% service fee applies to all emergency payments.
            </p>
          </div>

          <div className="dashboard__actions fade-in-up delay-5">
            <Button
              variant="primary"
              icon={<EmergencyIcon />}
              size="lg"
              disabled={userStatus === 'RESTRICTED'}
              onClick={handleEmergencyPay}
            >
              Emergency Pay
            </Button>

            <Button
              variant="secondary"
              icon={<AddMoneyIcon />}
              size="lg"
              onClick={onRequestNextAmount}
            >
              Request Amount
            </Button>

            <Button
              variant="ghost"
              icon={<DepositIcon />}
              size="lg"
              onClick={onAddDeposit}
            >
              Add Deposit
            </Button>

            {/* Hidden debug helper to simulate due */}
            <button className="debug-btn" onClick={handleSimulateDue}>Simulate Due</button>
          </div>
        </div>
      </section>

      {/* ── Recent Activity ── */}
      <section className="dashboard__section" aria-label="Recent transactions">
        <div className="container">
          <div className="dashboard__section-header fade-in-up delay-6">
            <h2 className="dashboard__section-title">Recent Transactions</h2>
            <button className="dashboard__link-btn">
              <HistoryIcon /> View History
            </button>
          </div>

          <div className="transactions-list fade-in-up delay-6">
            {transactions.map(tx => (
              <div key={tx.id} className="transaction-item">
                <div className="tx-icon">{tx.icon}</div>
                <div className="tx-info">
                  <span className="tx-type">{tx.type}</span>
                  <span className="tx-date">{tx.date}</span>
                </div>
                <div className={`tx-amount tx-amount--${tx.category.toLowerCase()}`}>
                  {tx.category === 'Credit' ? '+' : '-'} ₹{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="dashboard__footer">
        <div className="container dashboard__footer-inner">
          <span>© 2024 EmergencyPay • Secure & Encrypted</span>
        </div>
      </footer>
    </main>
  );
};

export default Dashboard;
