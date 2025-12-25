import React from 'react';
import { Gamepad2, FlaskConical, Home, Sparkles } from 'lucide-react';

export function Layout({ children, onNavigate, currentPage }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="container header-content">
          <div className="logo" onClick={() => onNavigate('home')}>
            <span className="logo-icon">🧑</span>
            <span className="logo-text">Team 코딩하는남정네들</span>
          </div>
          <nav className="nav">
            <button
              className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
            >
              <Home size={20} />
              <span className="nav-label">홈</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'vocab' ? 'active' : ''}`}
              onClick={() => onNavigate('vocab')}
            >
              <Gamepad2 size={20} />
              <span className="nav-label">영단어</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'science' ? 'active' : ''}`}
              onClick={() => onNavigate('science')}
            >
              <FlaskConical size={20} />
              <span className="nav-label">과학상식</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'advice' ? 'active' : ''}`}
              onClick={() => onNavigate('advice')}
            >
              <Sparkles size={20} />
              <span className="nav-label">책님 알려주세요</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>리엑트는 신이다</p>
        </div>
      </footer>

      <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background-color: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1rem 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .logo-icon {
          -webkit-text-fill-color: initial;
        }

        .nav {
          display: flex;
          gap: 1rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--color-text-muted);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          transition: all 0.2s;
        }

        .nav-item:hover, .nav-item.active {
          color: var(--color-text-main);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: var(--color-primary);
          background-color: rgba(139, 92, 246, 0.1);
        }

        .main-content {
          flex: 1;
          padding: 2rem 0;
        }

        .footer {
          padding: 2rem 0;
          text-align: center;
          color: var(--color-text-muted);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 640px) {
          .nav-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
