import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PaymentPage from './components/PaymentPage';
import AddDepositPage from './components/AddDepositPage';
import RequestAmountPage from './components/RequestAmountPage';
import PayDuePage from './components/PayDuePage';
import { EmergencyProvider } from './context/EmergencyContext';
import './index.css';

const App = () => {
  const handleLogout = () => {
    // Logout logic will be wired to backend later
    alert('Logged out! (Auth integration pending)');
  };

  return (
    <EmergencyProvider>
      <BrowserRouter>
        <div className="page-shell">
          {/* Sticky Navbar */}
          <Navbar userName="Raman" onLogout={handleLogout} />

          {/* Page content (offset by nav height) */}
          <div className="page-content">
            <Routes>
              {/* Redirect root → /dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* Dashboard page */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Payment page */}
              <Route path="/payment" element={<PaymentPage />} />
              {/* Deposit page */}
              <Route path="/deposit" element={<AddDepositPage />} />
              {/* Request page */}
              <Route path="/request" element={<RequestAmountPage />} />
              {/* Pay Due page */}
              <Route path="/pay-due" element={<PayDuePage />} />
              {/* Catch-all → /dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </EmergencyProvider>
  );
};

export default App;
