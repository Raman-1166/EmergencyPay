import './Navbar.css';

const Navbar = ({ userName = 'Raman', onLogout }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        {/* Brand */}
        <div className="navbar__brand">
          <div className="navbar__logo" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="navbar__app-name">EmergencyPay</span>
          <span className="navbar__badge">Dashboard</span>
        </div>

        {/* Right section */}
        <div className="navbar__actions">
          <div className="navbar__user">
            <div className="navbar__avatar" aria-hidden="true">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="navbar__user-info">
              <span className="navbar__user-label">Welcome back,</span>
              <span className="navbar__user-name">{userName}</span>
            </div>
          </div>

          <button
            id="logout-btn"
            className="navbar__logout-btn"
            onClick={onLogout}
            aria-label="Logout"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span className="navbar__logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
