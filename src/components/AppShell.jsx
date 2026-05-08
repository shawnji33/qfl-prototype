import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const styles = `
  .shell-root {
    display: flex;
    height: 100%;
    min-height: 100vh;
    background: var(--bg);
  }
  .sidebar {
    width: 240px;
    min-width: 240px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 8px;
  }
  .logo-mark {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-icon {
    width: 36px;
    height: 36px;
    background: var(--navy);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .logo-icon span {
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.5px;
  }
  .logo-text-wrap {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .logo-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.4px;
    line-height: 1;
  }
  .logo-sub {
    font-size: 10.5px;
    color: var(--text-tertiary);
    letter-spacing: -0.2px;
    line-height: 1;
  }
  .sidebar-nav {
    flex: 1;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: -0.3px;
    transition: background 0.12s, color 0.12s;
    cursor: pointer;
    text-decoration: none;
  }
  .nav-item:hover {
    background: var(--bg);
    color: var(--text-primary);
  }
  .nav-item.active {
    background: var(--blue-light);
    color: var(--blue);
  }
  .nav-item.active svg {
    color: var(--blue);
  }
  .nav-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .user-avatar {
    width: 34px;
    height: 34px;
    background: var(--navy);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: 0.2px;
  }
  .user-info {
    flex: 1;
    min-width: 0;
  }
  .user-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-email {
    font-size: 11.5px;
    color: var(--text-tertiary);
    letter-spacing: -0.2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .shell-main {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
  }
  /* Mobile bottom tab bar */
  .mobile-tab-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    z-index: 100;
    padding: 0 8px;
    align-items: stretch;
    box-shadow: 0 -2px 12px rgba(11,30,61,0.06);
  }
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-decoration: none;
    color: var(--text-tertiary);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: -0.2px;
    transition: color 0.12s;
    padding: 8px 4px;
    border-radius: var(--radius-sm);
  }
  .tab-item.active {
    color: var(--blue);
  }
  .tab-item svg {
    width: 22px;
    height: 22px;
  }
  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
    .mobile-tab-bar {
      display: flex;
    }
    .shell-main {
      padding-bottom: 64px;
    }
  }
`

function IconDashboard({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  )
}

function IconPortfolio({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function IconAccount({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export default function AppShell({ children }) {
  return (
    <>
      <style>{styles}</style>
      <div className="shell-root">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon">
                <span>QFL</span>
              </div>
              <div className="logo-text-wrap">
                <span className="logo-name">QFL</span>
                <span className="logo-sub">Quantitative Finance</span>
              </div>
            </div>
          </div>

          <div className="sidebar-nav">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <span className="nav-icon"><IconDashboard /></span>
              Dashboard
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <span className="nav-icon"><IconPortfolio /></span>
              Portfolio
            </NavLink>
            <NavLink to="/account" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <span className="nav-icon"><IconAccount /></span>
              Account
            </NavLink>
          </div>

          <div className="sidebar-footer">
            <div className="user-avatar">SJ</div>
            <div className="user-info">
              <div className="user-name">Shawn Ji</div>
              <div className="user-email">shawn@qfl.com</div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="shell-main">
          {children}
        </main>

        {/* Mobile bottom tab bar */}
        <nav className="mobile-tab-bar">
          <NavLink to="/dashboard" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconDashboard size={22} />
            Dashboard
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconPortfolio size={22} />
            Portfolio
          </NavLink>
          <NavLink to="/account" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconAccount size={22} />
            Account
          </NavLink>
        </nav>
      </div>
    </>
  )
}
