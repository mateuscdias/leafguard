import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="lp-header-fixed">
      <nav className="lp-nav">
        <a href="/" className="lp-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <div className="lp-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 7c-2 0-3 1.5-3 3.5 0 2 3 4.5 3 4.5s3-2.5 3-4.5c0-2-1-3.5-3-3.5z" fill="white" stroke="none" />
            </svg>
          </div>
          <span className="lp-logo-text">LeafGuard</span>
        </a>
        <ul className="lp-nav-links">
          <li><a href="#">Detecção Ativa</a></li>
          <li><a href="#" className="lp-nav-cta" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Início</a></li>
        </ul>
      </nav>
    </header>
  );
}