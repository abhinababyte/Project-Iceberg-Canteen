import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container glass">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Iceberg <span>Canteen</span></h2>
          <p>Delivering fresh, delicious college meals straight to your desk, library, or dorm.</p>
          <div className="social-links">
            <a href="#" className="social-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 4.42 3.22 8.1 7.42 9.42-.14-1.04-.26-2.65.05-3.8l1.45-6.17s-.37-.74-.37-1.84c0-1.73 1-3.02 2.25-3.02 1.06 0 1.57.8 1.57 1.76 0 1.07-.68 2.67-1.04 4.15-.3.1.24 2.2 1.84 2.2 2.2 0 3.9-2.32 3.9-5.67 0-2.96-2.13-5.04-5.18-5.04-3.5 0-5.56 2.63-5.56 5.35 0 1.06.4 2.2.93 2.8.1.13.12.24.09.38l-.34 1.37c-.05.18-.16.22-.36.13-1.3-.6-2.12-2.5-2.12-4.04 0-3.3 2.4-6.33 6.9-6.33 3.63 0 6.45 2.58 6.45 6.03 0 3.6-2.27 6.5-5.42 6.5-1.06 0-2.06-.55-2.4-1.2l-.66 2.5c-.24.9-.88 2.02-1.3 2.7 1.25.38 2.58.6 3.96.6 5.5 0 10-4.48 10-10.02s-4.5-10-10-10z"/></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Iceberg One</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="#">Help & Support</a></li>
              <li><a href="#">Partner with us</a></li>
              <li><a href="#">Ride with us</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Project Iceberg Canteen by Abhinaba Mandal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
