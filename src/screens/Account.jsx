import { useState } from 'react'

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 'var(--radius-full)',
        background: on ? 'var(--blue)' : 'var(--border-strong)',
        position: 'relative',
        transition: 'background 0.2s',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
      }}
      aria-pressed={on}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        left: on ? 21 : 3,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
        transition: 'left 0.18s cubic-bezier(.4,0,.2,1)',
      }} />
    </button>
  )
}

function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      ...style,
    }}>
      {children}
    </div>
  )
}

function CardHeader({ title, action }) {
  return (
    <div style={{
      padding: '16px 20px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px' }}>{title}</h2>
      {action}
    </div>
  )
}

function SettingRow({ label, sub, right, noBorder }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '13px 20px',
      borderBottom: noBorder ? 'none' : '1px solid var(--border)',
      gap: 12,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: '-0.2px', marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

export default function Account() {
  // Investment preferences
  const [autoInvest, setAutoInvest] = useState(true)
  const [reinvestDiv, setReinvestDiv] = useState(true)
  const [taxLoss, setTaxLoss] = useState(true)

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true)
  const [monthlyReports, setMonthlyReports] = useState(true)
  const [tradeConf, setTradeConf] = useState(true)

  const editBtn = (
    <button style={{
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--blue)',
      letterSpacing: '-0.3px',
      padding: '5px 12px',
      border: '1px solid rgba(27,111,232,0.25)',
      borderRadius: 'var(--radius-full)',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'background 0.12s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--blue-light)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      Edit profile
    </button>
  )

  return (
    <div style={{ padding: '32px 36px', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.6px', marginBottom: 24 }}>
        Account
      </h1>

      {/* Profile */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader title="Profile" action={editBtn} />
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.3px',
            flexShrink: 0,
          }}>
            SJ
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: 3 }}>
              Shawn Ji
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', letterSpacing: '-0.3px' }}>
              shawn@qfl.com
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)', letterSpacing: '-0.2px', marginTop: 2 }}>
              Member since January 2023
            </div>
          </div>
        </div>
      </Card>

      {/* Linked accounts */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader title="Linked Accounts" action={
          <button style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--blue)',
            letterSpacing: '-0.3px',
            padding: '5px 12px',
            border: '1px solid rgba(27,111,232,0.25)',
            borderRadius: 'var(--radius-full)',
            background: 'transparent',
            cursor: 'pointer',
          }}>
            + Link account
          </button>
        } />
        {[
          { name: 'Chase Checking', last4: '4821', balance: '$12,440.00', color: '#1B6FE8', initial: 'C' },
          { name: 'Wells Fargo Savings', last4: '3892', balance: '$28,200.00', color: '#CC0000', initial: 'W' },
        ].map((acct, i, arr) => (
          <div
            key={acct.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 20px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: acct.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}>
              {acct.initial}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                {acct.name} <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>····{acct.last4}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '-0.3px', marginTop: 2 }}>
                {acct.balance}
              </div>
            </div>
            <span style={{
              fontSize: 11.5,
              fontWeight: 600,
              color: 'var(--green)',
              background: 'var(--green-light)',
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '-0.2px',
            }}>
              Connected
            </span>
          </div>
        ))}
      </Card>

      {/* Investment preferences */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader title="Investment Preferences" />
        <SettingRow
          label="Auto-invest"
          sub="$500 deposited monthly from Chase ····4821"
          right={<Toggle on={autoInvest} onChange={setAutoInvest} />}
        />
        <SettingRow
          label="Reinvest dividends"
          sub="Automatically reinvest all dividend income"
          right={<Toggle on={reinvestDiv} onChange={setReinvestDiv} />}
        />
        <SettingRow
          label="Tax-loss harvesting"
          sub="Automatically harvest losses to offset gains"
          right={<Toggle on={taxLoss} onChange={setTaxLoss} />}
          noBorder
        />
      </Card>

      {/* Notifications */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader title="Notifications" />
        <SettingRow
          label="Email notifications"
          sub="Portfolio alerts and important updates"
          right={<Toggle on={emailNotif} onChange={setEmailNotif} />}
        />
        <SettingRow
          label="Monthly reports"
          sub="Summary of portfolio performance each month"
          right={<Toggle on={monthlyReports} onChange={setMonthlyReports} />}
        />
        <SettingRow
          label="Trade confirmations"
          sub="Email when trades are executed"
          right={<Toggle on={tradeConf} onChange={setTradeConf} />}
          noBorder
        />
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader title="Danger Zone" />
        <div style={{ padding: '16px 20px' }}>
          <button
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--red)',
              letterSpacing: '-0.3px',
              background: 'transparent',
              border: '1px solid rgba(200,55,45,0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '9px 16px',
              cursor: 'pointer',
              transition: 'background 0.12s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--red-light)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Close account
          </button>
          <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)', letterSpacing: '-0.2px', marginTop: 8, lineHeight: 1.5 }}>
            This will permanently close your QFL account and liquidate all positions. This action cannot be undone.
          </p>
        </div>
      </Card>
    </div>
  )
}
