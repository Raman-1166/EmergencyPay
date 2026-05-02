import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Admin.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    minDeposit: 500,
    serviceFee: 5,
    dailySpendLimit: 50,
    requestIncrement: 50
  });

  useEffect(() => {
    fetchUsers();
    fetchConfig();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await api.get('/admin/config');
      setConfig(res.data);
    } catch (err) {
      console.error('Failed to fetch config', err);
    }
  };

  const handleConfigChange = (e) => {
    setConfig({ ...config, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleUpdateSettings = async () => {
    try {
      await api.put('/admin/config', config);
      alert('System configuration updated successfully!');
    } catch (err) {
      console.error('Failed to update config', err);
      alert('Failed to update configuration.');
    }
  };

  return (
    <div className="admin-container fade-in-up">
      <header className="admin-header">
        <h1>Admin Control Center</h1>
        <p>Manage system limits and view registered users.</p>
      </header>

      <div className="admin-grid">
        {/* System Config */}
        <section className="admin-card">
          <h3>System Configuration</h3>
          <div className="config-form">
            <div className="form-group">
              <label>Min Security Deposit (₹)</label>
              <input type="number" name="minDeposit" value={config.minDeposit} onChange={handleConfigChange} />
            </div>
            <div className="form-group">
              <label>Service Fee (%)</label>
              <input type="number" name="serviceFee" value={config.serviceFee} onChange={handleConfigChange} />
            </div>
            <div className="form-group">
              <label>Daily Spend Limit (₹)</label>
              <input type="number" name="dailySpendLimit" value={config.dailySpendLimit} onChange={handleConfigChange} />
            </div>
            <div className="form-group">
              <label>Request Increment (₹)</label>
              <input type="number" name="requestIncrement" value={config.requestIncrement} onChange={handleConfigChange} />
            </div>
            <button className="admin-btn-primary" onClick={handleUpdateSettings}>Update Settings</button>
          </div>
        </section>

        {/* User List */}
        <section className="admin-card user-list-section">
          <h3>Registered Users</h3>
          {loading ? <p>Loading users...</p> : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Aadhaar (Last 4)</th>
                    <th>Card (Last 4)</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>**** **** {user.aadhaarLast4}</td>
                      <td>**** **** **** {user.cardLast4}</td>
                      <td><span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
