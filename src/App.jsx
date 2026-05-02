import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PaymentPage from './components/PaymentPage';
import AddDepositPage from './components/AddDepositPage';
import RequestAmountPage from './components/RequestAmountPage';
import PayDuePage from './components/PayDuePage';
import { EmergencyProvider } from './context/EmergencyContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated && isAdmin ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <AuthProvider>
      <EmergencyProvider>
        <Router>
          <AuthContent />
        </Router>
      </EmergencyProvider>
    </AuthProvider>
  );
};

const AuthContent = () => {
  const { logout, user, isAuthenticated } = useAuth();

  return (
    <div className="page-shell">
      <Navbar userName={user?.email?.split('@')[0] || 'User'} onLogout={logout} isAuthenticated={isAuthenticated} />
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/deposit" element={<ProtectedRoute><AddDepositPage /></ProtectedRoute>} />
          <Route path="/request" element={<ProtectedRoute><RequestAmountPage /></ProtectedRoute>} />
          <Route path="/pay-due" element={<ProtectedRoute><PayDuePage /></ProtectedRoute>} />
          
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
