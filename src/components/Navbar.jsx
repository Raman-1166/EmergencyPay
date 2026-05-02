import React from 'react';
import './Navbar.css';

const Navbar = ({ userName = 'Raman', onLogout, isAuthenticated = false }) => {
  const [showUserInfo, setShowUserInfo] = React.useState(false);
  const [isRolling, setIsRolling] = React.useState(false);
  const [isHiding, setIsHiding] = React.useState(false);
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAvatarClick = () => {
    if (showUserInfo || isRolling || isHiding) return;
    
    setIsRolling(true);
    setTimeout(() => {
      setShowUserInfo(true);
      setIsRolling(false);
      
      // Start hiding after 4.5 seconds
      setTimeout(() => {
        setIsHiding(true);
        // Fully remove after fade-out animation (500ms)
        setTimeout(() => {
          setShowUserInfo(false);
          setIsHiding(false);
        }, 500);
      }, 4500);
    }, 800);
  };

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
        </div>

        {/* Right section */}
        <div className="navbar__actions">
          <button 
            className="navbar__theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {isAuthenticated && (
            <>
              <div className="navbar__user">
                <div 
                  className={`navbar__avatar ${isRolling ? 'navbar__avatar--rolling' : ''} ${!showUserInfo ? 'navbar__avatar--clickable' : ''}`}
                  aria-label="Toggle user info"
                  onClick={handleAvatarClick}
                  role="button"
                  tabIndex={0}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
                
                {showUserInfo && (
                  <div className={`navbar__user-info fade-in-right ${isHiding ? 'fade-out-right' : ''}`}>
                    <span className="navbar__user-label">Welcome back,</span>
                    <span className="navbar__user-name">{userName}</span>
                  </div>
                )}
              </div>

              {showUserInfo && (
                <button
                  id="logout-btn"
                  className={`navbar__logout-btn fade-in-right ${isHiding ? 'fade-out-right' : ''}`}
                  onClick={onLogout}
                  aria-label="Logout"
                  style={{ animationDelay: isHiding ? '0s' : '0.1s' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span className="navbar__logout-text">Logout</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
