import React, { useState } from 'react';
import './Header.css';

const Header = ({ cartCount, onCartClick, onLoginClick, activeTab, onTabChange, searchQuery, onSearchChange, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header glass">
      <div className="header-brand">
        <button className="btn-hamburger" onClick={() => setIsMobileMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1>Iceberg <span>Canteen</span></h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="header-nav">
        <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>Home</button>
        {user && (
          <button className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => handleTabClick('orders')}>Orders</button>
        )}
        <button className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabClick('about')}>About Us</button>
        <button className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => handleTabClick('contact')}>Contact Us</button>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mobile-menu-drawer glass ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="btn-close-mobile" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>
        <nav className="mobile-nav-links">
          <button className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>Home</button>
          {user && (
            <button className={`mobile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => handleTabClick('orders')}>Orders</button>
          )}
          <button className={`mobile-nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabClick('about')}>About Us</button>
          <button className={`mobile-nav-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => handleTabClick('contact')}>Contact Us</button>
        </nav>
      </div>
      <div className="header-search">
        <svg className="search-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search for biryani, dosa, burger..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="header-actions">
        {user ? (
          <div className="user-profile">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <span className="user-name">{user.name.split(' ')[0]}</span>
            <button className="btn-logout" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className="btn-icon" onClick={onLoginClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}
        <button className="btn-cart" onClick={onCartClick}>
          <div className="cart-icon">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <span className="cart-text">Cart</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
