import { useState } from 'react'

const css = `
  .acct { padding: 32px 36px; max-width: 720px; }
  .acct-title { font-size: 22px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.5px; margin-bottom: 28px; }

  .sc { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 16px; overflow: hidden; }
  .sc-header { padding: 16px 20px; border-bottom: 1px solid var(--border); }
  .sc-label { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.6px; }

  /* Profile */
  .profile-row { display: flex; align-items: center; gap: 16px; padding: 20px; }
  .avatar-lg { width: 52px; height: 52px; background: var(--black); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #72D46C; flex-shrink: 0; letter-spacing: -0.5px; }
  .profile-name { font-size: 16px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.4px; }
  .profile-email { font-size: 13px; color: var(--gray-500); margin-top: 2px; }
  .profile-badge { display: inline-flex; align-items: center; gap: 5px; margin-top: 6px; background: #EBF9EA; color: #45B83F; padding: 3px 9px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .edit-btn { margin-left: auto; padding: 8px 16px; background: var(--gray-100); border: 1px solid var(--border); border-radius: 8px; font-size: 13px; font-weight: 600; color: var(--gray-700); cursor: pointer; transition: background 0.12s; flex-shrink: 0; }
  .edit-btn:hover { background: var(--gray-200); }

  /* Info rows */
  .info-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .info-row:last-child { border-bottom: none; }
  .info-key { font-size: 13.5px; color: var(--gray-500); }
  .info-val { font-size: 13.5px; font-weight: 500; color: var(--gray-900); letter-spacing: -0.2px; }

  /* Linked accounts */
  .bank-row { display: flex; align-items: center; gap: 12px; padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .bank-row:last-child { border-bottom: none; }
  .bank-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; flex-shrink: 0; border: 1px solid var(--border); }
  .bank-body { flex: 1; }
  .bank-name { font-size: 13.5px; font-weight: 600; color: var(--gray-900); }
  .bank-acct { font-size: 12px; color: var(--gray-500); margin-top: 2px; }
  .bank-status { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; }
  .bank-status.ok { color: #45B83F; }
  .bank-right { text-align: right; flex-shrink: 0; }
  .bank-balance { font-size: 14px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.3px; }

  /* Toggles */
  .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label { font-size: 13.5px; font-weight: 500; color: var(--gray-900); }
  .toggle-sub { font-size: 12px; color: var(--gray-500); margin-top: 2px; }
  .toggle { position: relative; width: 38px; height: 22px; flex-shrink: 0; }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track { position: absolute; inset: 0; background: var(--gray-200); border-radius: 11px; cursor: pointer; transition: background 0.15s; }
  .toggle input:checked + .toggle-track { background: #72D46C; }
  .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2); transition: transform 0.15s; }
  .toggle input:checked ~ .toggle-thumb { transform: translateX(16px); }

  /* Danger zone */
  .danger-btn { display: block; width: 100%; padding: 11px 20px; text-align: left; font-size: 13.5px; font-weight: 500; color: var(--neg); background: none; border: none; cursor: pointer; transition: background 0.12s; }
  .danger-btn:hover { background: #FFF5F5; }

  @media (max-width: 600px) {
    .acct { padding: 24px 20px; }
  }
`

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <label className="toggle">
      <input type="checkbox" checked={on} onChange={() => setOn(!on)}/>
      <div className="toggle-track"/>
      <div className="toggle-thumb"/>
    </label>
  )
}

export default function Account() {
  return (
    <>
      <style>{css}</style>
      <div className="acct">
        <div className="acct-title">Account</div>

        {/* Profile */}
        <div className="sc">
          <div className="sc-header"><div className="sc-label">Profile</div></div>
          <div className="profile-row">
            <div className="avatar-lg">SJ</div>
            <div>
              <div className="profile-name">Shawn Ji</div>
              <div className="profile-email">shawn@quantitativefinance.io</div>
              <div className="profile-badge">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
                Active investor
              </div>
            </div>
            <button className="edit-btn">Edit profile</button>
          </div>
          <div className="info-row"><span className="info-key">Member since</span><span className="info-val">January 2023</span></div>
          <div className="info-row"><span className="info-key">Account type</span><span className="info-val">Individual brokerage</span></div>
          <div className="info-row"><span className="info-key">Risk profile</span><span className="info-val">Moderate-aggressive</span></div>
          <div className="info-row"><span className="info-key">Investment goal</span><span className="info-val">Long-term growth</span></div>
        </div>

        {/* Linked accounts */}
        <div className="sc">
          <div className="sc-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="sc-label">Linked accounts</div>
            <button style={{ fontSize: 13, fontWeight: 600, color: '#72D46C', background: 'none', border: 'none', cursor: 'pointer' }}>+ Connect</button>
          </div>
          {[
            { name: 'Bank of America',  acct: 'Checking ••4291', balance: '$6,420.00',  icon: '🏦', color: '#E8F0FE' },
            { name: 'Alpaca Securities', acct: 'Brokerage ••8812', balance: '$127,432.14', icon: '📈', color: '#EBF9EA' },
          ].map(b => (
            <div className="bank-row" key={b.name}>
              <div className="bank-icon" style={{ background: b.color }}>{b.icon}</div>
              <div className="bank-body">
                <div className="bank-name">{b.name}</div>
                <div className="bank-acct">{b.acct}</div>
              </div>
              <div className="bank-right">
                <div className="bank-balance">{b.balance}</div>
                <div className="bank-status ok" style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 3, fontSize: 12 }}>
                  <svg width="7" height="7" viewBox="0 0 10 10" fill="#45B83F"><circle cx="5" cy="5" r="5"/></svg>
                  Connected
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="sc">
          <div className="sc-header"><div className="sc-label">Preferences</div></div>
          {[
            { label: 'Auto-rebalance',        sub: 'Automatically rebalance when drift exceeds 5%', on: true  },
            { label: 'Dividend reinvestment',  sub: 'Reinvest dividends automatically (DRIP)',      on: true  },
            { label: 'Tax-loss harvesting',    sub: 'Offset gains with strategic loss realization',  on: false },
            { label: 'Auto-invest',            sub: '$500/month on the 1st of each month',           on: true  },
          ].map(p => (
            <div className="toggle-row" key={p.label}>
              <div>
                <div className="toggle-label">{p.label}</div>
                <div className="toggle-sub">{p.sub}</div>
              </div>
              <Toggle defaultOn={p.on}/>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="sc">
          <div className="sc-header"><div className="sc-label">Notifications</div></div>
          {[
            { label: 'Rebalance alerts',   sub: 'When your portfolio is rebalanced',       on: true  },
            { label: 'Dividend alerts',    sub: 'When dividends are received or reinvested', on: true  },
            { label: 'Market summaries',   sub: 'Weekly email performance recap',            on: false },
            { label: 'Strategy updates',   sub: 'When strategy holdings change',             on: true  },
          ].map(p => (
            <div className="toggle-row" key={p.label}>
              <div>
                <div className="toggle-label">{p.label}</div>
                <div className="toggle-sub">{p.sub}</div>
              </div>
              <Toggle defaultOn={p.on}/>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="sc">
          <div className="sc-header"><div className="sc-label">Account actions</div></div>
          <button className="danger-btn">Download account data</button>
          <button className="danger-btn">Close account</button>
        </div>
      </div>
    </>
  )
}
