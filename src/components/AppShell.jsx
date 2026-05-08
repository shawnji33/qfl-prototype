import { NavLink } from 'react-router-dom'

const styles = `
  .shell-root {
    display: flex;
    height: 100%;
    min-height: 100vh;
    background: var(--bg);
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 232px;
    min-width: 232px;
    background: var(--black);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar-logo {
    padding: 24px 20px 22px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 6px;
  }

  .logo-mark {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  /* SVG Q mark */
  .logo-icon {
    flex-shrink: 0;
  }

  .logo-wordmark {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .logo-name {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    line-height: 1.1;
  }

  .logo-sub {
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.3px;
    line-height: 1;
    text-transform: uppercase;
  }

  /* ── Nav ── */
  .sidebar-nav {
    flex: 1;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    padding: 12px 8px 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: var(--radius-sm);
    font-size: 13.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: -0.1px;
    transition: background 0.12s, color 0.12s;
    cursor: pointer;
    text-decoration: none;
  }

  .nav-item:hover {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.8);
  }

  .nav-item.active {
    background: rgba(114,212,108,0.15);
    color: var(--green);
  }

  .nav-item.active .nav-dot {
    background: var(--green);
  }

  .nav-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    flex-shrink: 0;
    margin-right: 2px;
    transition: background 0.12s;
  }

  /* ── User footer ── */
  .sidebar-footer {
    padding: 14px 12px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    background: var(--green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
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
    color: rgba(255,255,255,0.85);
    letter-spacing: -0.2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-role {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: -0.1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  /* ── Main ── */
  .shell-main {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
  }

  /* ── Mobile bottom bar ── */
  .mobile-tab-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--black);
    border-top: 1px solid rgba(255,255,255,0.06);
    z-index: 100;
    padding: 0 4px;
    align-items: stretch;
  }

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    text-decoration: none;
    color: rgba(255,255,255,0.35);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    transition: color 0.12s;
    padding: 8px 4px;
  }

  .tab-item.active {
    color: var(--green);
  }

  .tab-item svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .mobile-tab-bar { display: flex; }
    .shell-main { padding-bottom: 60px; }
  }
`

/* The distinctive QF Q-mark as SVG */
function QFLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle ring */}
      <circle cx="19" cy="19" r="16" fill="#72D46C"/>
      {/* Inner counter (hole) */}
      <circle cx="18" cy="18" r="8" fill="#111111"/>
      {/* Diagonal tail slash — bottom right */}
      <rect x="24" y="24" width="10" height="7" rx="3.5" transform="rotate(-42 24 24)" fill="#72D46C"/>
    </svg>
  )
}

function IconDashboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  )
}

function IconPortfolio() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function IconStrategies() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  )
}

function IconAccount() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <nav className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon">
                <QFLogo size={34} />
              </div>
              <div className="logo-wordmark">
                <span className="logo-name">Quantitative</span>
                <span className="logo-name">Finance</span>
              </div>
            </div>
          </div>

          <div className="sidebar-nav">
            <div className="nav-section-label">Invest</div>

            <NavLink to="/dashboard" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <IconDashboard />
              Dashboard
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <IconPortfolio />
              Portfolio
            </NavLink>
            <NavLink to="/strategies" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <IconStrategies />
              Strategies
            </NavLink>

            <div className="nav-section-label" style={{marginTop: 4}}>Settings</div>

            <NavLink to="/account" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <IconAccount />
              Account
            </NavLink>
          </div>

          <div className="sidebar-footer">
            <div className="user-avatar">SJ</div>
            <div className="user-info">
              <div className="user-name">Shawn Ji</div>
              <div className="user-role">Investor</div>
            </div>
          </div>
        </nav>

        <main className="shell-main">
          {children}
        </main>

        <nav className="mobile-tab-bar">
          <NavLink to="/dashboard" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconDashboard />
            Home
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconPortfolio />
            Portfolio
          </NavLink>
          <NavLink to="/strategies" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconStrategies />
            Strategies
          </NavLink>
          <NavLink to="/account" className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}>
            <IconAccount />
            Account
          </NavLink>
        </nav>
      </div>
    </>
  )
}
