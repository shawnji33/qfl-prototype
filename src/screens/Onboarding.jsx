import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const styles = `
  .ob-root {
    min-height: 100vh;
    background: linear-gradient(160deg, #f0f4fb 0%, #e8edf7 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px 48px;
  }
  .ob-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    width: 100%;
    max-width: 480px;
    padding: 40px 40px 36px;
  }
  @media (max-width: 540px) {
    .ob-card { padding: 28px 20px 28px; }
  }
  .ob-progress-wrap {
    width: 100%;
    max-width: 480px;
    margin-bottom: 24px;
  }
  .ob-progress-bar {
    height: 3px;
    background: var(--border);
    border-radius: var(--radius-full);
    overflow: hidden;
  }
  .ob-progress-fill {
    height: 100%;
    background: var(--blue);
    border-radius: var(--radius-full);
    transition: width 0.35s cubic-bezier(.4,0,.2,1);
  }
  .ob-step-label {
    font-size: 12px;
    color: var(--text-tertiary);
    letter-spacing: -0.2px;
    margin-bottom: 8px;
  }

  /* Welcome */
  .ob-welcome-logo {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }
  .ob-welcome-icon {
    width: 64px;
    height: 64px;
    background: var(--navy);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(11,30,61,0.18);
  }
  .ob-welcome-icon span {
    color: #fff;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: -0.5px;
  }
  .ob-headline {
    font-size: 26px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.5px;
    line-height: 1.22;
    text-align: center;
    margin-bottom: 14px;
  }
  .ob-sub {
    font-size: 14.5px;
    color: var(--text-secondary);
    letter-spacing: -0.3px;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 32px;
  }
  .ob-btn-primary {
    background: var(--navy);
    color: #fff;
    border-radius: var(--radius-full);
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 600;
    width: 100%;
    transition: background 0.15s;
    border: none;
    cursor: pointer;
    letter-spacing: -0.3px;
  }
  .ob-btn-primary:hover { background: var(--navy-800); }
  .ob-link-row {
    text-align: center;
    margin-top: 16px;
    font-size: 13.5px;
    color: var(--text-secondary);
    letter-spacing: -0.3px;
  }
  .ob-link {
    color: var(--blue);
    cursor: pointer;
    font-weight: 500;
  }
  .ob-link:hover { text-decoration: underline; }

  /* Step headings */
  .ob-step-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .ob-step-sub {
    font-size: 14px;
    color: var(--text-secondary);
    letter-spacing: -0.3px;
    margin-bottom: 24px;
  }
  .ob-back-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.3px;
    margin-bottom: 20px;
    cursor: pointer;
    width: fit-content;
    transition: color 0.12s;
  }
  .ob-back-btn:hover { color: var(--text-primary); }

  /* Form fields */
  .ob-field-group {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 28px;
  }
  .ob-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .ob-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .ob-label {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: -0.2px;
  }
  .ob-input {
    border: 1.5px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 11px 13px;
    font-size: 14.5px;
    width: 100%;
    outline: none;
    transition: border-color 0.15s;
    color: var(--text-primary);
    background: var(--surface);
    letter-spacing: -0.3px;
  }
  .ob-input:focus { border-color: var(--blue); }

  /* Option cards */
  .ob-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
  }
  .ob-option {
    border: 1.5px solid var(--border-strong);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--surface);
  }
  .ob-option:hover {
    border-color: rgba(27,111,232,0.3);
    background: var(--blue-light);
  }
  .ob-option.selected {
    border-color: var(--blue);
    background: var(--blue-light);
  }
  .ob-option-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--border-strong);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s;
  }
  .ob-option.selected .ob-option-dot {
    border-color: var(--blue);
    background: var(--blue);
  }
  .ob-option.selected .ob-option-dot::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }
  .ob-option-text {
    font-size: 14.5px;
    font-weight: 500;
    color: var(--text-primary);
    letter-spacing: -0.3px;
  }
  .ob-option.selected .ob-option-text {
    color: var(--blue);
  }

  /* Recommendation */
  .ob-reco-card {
    background: linear-gradient(135deg, #f0f5ff 0%, #eef4fd 100%);
    border: 1.5px solid rgba(27,111,232,0.15);
    border-radius: var(--radius-lg);
    padding: 24px;
    margin-bottom: 24px;
  }
  .ob-reco-name {
    font-size: 17px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.4px;
    margin-bottom: 4px;
  }
  .ob-reco-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .ob-badge {
    background: rgba(27,111,232,0.1);
    color: var(--blue);
    font-size: 11.5px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: var(--radius-full);
    letter-spacing: -0.2px;
  }
  .ob-reco-return {
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: -0.3px;
  }
  .ob-reco-return strong {
    color: var(--green);
    font-weight: 600;
  }
  .ob-donut-wrap {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .ob-donut {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  .ob-donut svg {
    transform: rotate(-90deg);
  }
  .ob-donut-center {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: -0.2px;
    flex-direction: column;
    gap: 0;
  }
  .ob-legend {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ob-legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ob-legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ob-legend-label {
    font-size: 12.5px;
    color: var(--text-secondary);
    letter-spacing: -0.2px;
    flex: 1;
  }
  .ob-legend-pct {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.2px;
  }
  .ob-adjust-link {
    text-align: center;
    margin-top: 12px;
    font-size: 13.5px;
    color: var(--blue);
    cursor: pointer;
    letter-spacing: -0.3px;
    font-weight: 500;
  }
  .ob-adjust-link:hover { text-decoration: underline; }
`

// Donut chart — pure SVG, no lib needed
function DonutChart() {
  const slices = [
    { pct: 60, color: '#1B6FE8', label: 'US Equities' },
    { pct: 20, color: '#0B1E3D', label: 'International' },
    { pct: 15, color: '#0EA5C2', label: 'Bonds' },
    { pct: 5, color: '#9DB0C8', label: 'Alternatives' },
  ]
  const cx = 50, cy = 50, r = 38, innerR = 24
  const circumference = 2 * Math.PI * r
  let offset = 0

  const arcs = slices.map((s) => {
    const len = (s.pct / 100) * circumference
    const gap = 1.5
    const arc = {
      ...s,
      dashArray: `${len - gap} ${circumference - len + gap}`,
      dashOffset: -offset,
    }
    offset += len
    return arc
  })

  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <div style={{ width: 100, height: 100, position: 'relative', flexShrink: 0 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E8EDF5" strokeWidth="13" />
          {arcs.map((arc, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth="13"
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.3px' }}>4</span>
          <span style={{ fontSize: 9.5, color: 'var(--text-tertiary)', letterSpacing: '-0.2px' }}>assets</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {slices.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', letterSpacing: '-0.2px', flex: 1 }}>{s.label}</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('Grow my wealth')
  const [horizon, setHorizon] = useState('10+ years')
  const [risk, setRisk] = useState('😐 Hold and wait it out')
  const navigate = useNavigate()

  const totalSteps = 5
  const progress = step === 0 ? 0 : (step / totalSteps) * 100

  return (
    <>
      <style>{styles}</style>
      <div className="ob-root">
        {step > 0 && step < 5 && (
          <div className="ob-progress-wrap">
            <div className="ob-step-label">Step {step} of {totalSteps}</div>
            <div className="ob-progress-bar">
              <div className="ob-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="ob-card">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <>
              <div className="ob-welcome-logo">
                <div className="ob-welcome-icon">
                  <span>QFL</span>
                </div>
              </div>
              <h1 className="ob-headline">Intelligent investing,<br />personalized for you</h1>
              <p className="ob-sub">
                QFL uses quantitative models and your financial goals to build and manage a portfolio optimized for long-term wealth.
              </p>
              <button className="ob-btn-primary" onClick={() => setStep(1)}>Get started</button>
              <div className="ob-link-row">
                Already have an account?{' '}
                <span className="ob-link" onClick={() => navigate('/dashboard')}>Sign in</span>
              </div>
            </>
          )}

          {/* Step 1: Create account */}
          {step === 1 && (
            <>
              <div className="ob-back-btn" onClick={() => setStep(0)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
              </div>
              <h2 className="ob-step-title">Create your account</h2>
              <p className="ob-step-sub">Get started in under 2 minutes.</p>
              <div className="ob-field-group">
                <div className="ob-field-row">
                  <div className="ob-field">
                    <label className="ob-label">First name</label>
                    <input className="ob-input" defaultValue="Shawn" />
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">Last name</label>
                    <input className="ob-input" defaultValue="Ji" />
                  </div>
                </div>
                <div className="ob-field">
                  <label className="ob-label">Email address</label>
                  <input className="ob-input" type="email" defaultValue="shawn@qfl.com" />
                </div>
                <div className="ob-field">
                  <label className="ob-label">Password</label>
                  <input className="ob-input" type="password" defaultValue="securepassword123" />
                </div>
              </div>
              <button className="ob-btn-primary" onClick={() => setStep(2)}>Continue</button>
            </>
          )}

          {/* Step 2: Investment goal */}
          {step === 2 && (
            <>
              <div className="ob-back-btn" onClick={() => setStep(1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
              </div>
              <h2 className="ob-step-title">What&apos;s your primary investment goal?</h2>
              <p className="ob-step-sub">We&apos;ll use this to tailor your portfolio strategy.</p>
              <div className="ob-options">
                {['Grow my wealth', 'Save for retirement', 'Build an emergency fund', 'Generate income'].map((opt) => (
                  <div
                    key={opt}
                    className={`ob-option${goal === opt ? ' selected' : ''}`}
                    onClick={() => setGoal(opt)}
                  >
                    <div className="ob-option-dot" />
                    <span className="ob-option-text">{opt}</span>
                  </div>
                ))}
              </div>
              <button className="ob-btn-primary" onClick={() => setStep(3)}>Continue</button>
            </>
          )}

          {/* Step 3: Time horizon */}
          {step === 3 && (
            <>
              <div className="ob-back-btn" onClick={() => setStep(2)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
              </div>
              <h2 className="ob-step-title">When do you plan to access this money?</h2>
              <p className="ob-step-sub">Your time horizon affects your risk profile.</p>
              <div className="ob-options">
                {['Less than 2 years', '2–5 years', '5–10 years', '10+ years'].map((opt) => (
                  <div
                    key={opt}
                    className={`ob-option${horizon === opt ? ' selected' : ''}`}
                    onClick={() => setHorizon(opt)}
                  >
                    <div className="ob-option-dot" />
                    <span className="ob-option-text">{opt}</span>
                  </div>
                ))}
              </div>
              <button className="ob-btn-primary" onClick={() => setStep(4)}>Continue</button>
            </>
          )}

          {/* Step 4: Risk tolerance */}
          {step === 4 && (
            <>
              <div className="ob-back-btn" onClick={() => setStep(3)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
              </div>
              <h2 className="ob-step-title">How would you react to a 20% portfolio drop?</h2>
              <p className="ob-step-sub">Be honest — there are no wrong answers.</p>
              <div className="ob-options">
                {[
                  '😰 Sell everything immediately',
                  '😟 Sell some to reduce risk',
                  '😐 Hold and wait it out',
                  '😤 Buy more — it\'s a discount',
                ].map((opt) => (
                  <div
                    key={opt}
                    className={`ob-option${risk === opt ? ' selected' : ''}`}
                    onClick={() => setRisk(opt)}
                  >
                    <div className="ob-option-dot" />
                    <span className="ob-option-text">{opt}</span>
                  </div>
                ))}
              </div>
              <button className="ob-btn-primary" onClick={() => setStep(5)}>Continue</button>
            </>
          )}

          {/* Step 5: Recommendation */}
          {step === 5 && (
            <>
              <h2 className="ob-step-title" style={{ marginBottom: 4 }}>Your personalized portfolio</h2>
              <p className="ob-step-sub">Based on your goals and risk profile.</p>

              <div className="ob-reco-card">
                <div className="ob-reco-name">Balanced Growth Portfolio</div>
                <div className="ob-reco-meta">
                  <span className="ob-badge">Moderate Risk</span>
                  <span className="ob-reco-return">Expected return: <strong>8.4–11.2% / yr</strong></span>
                </div>
                <DonutChart />
              </div>

              <button className="ob-btn-primary" onClick={() => navigate('/dashboard')}>
                Start investing with $5,000
              </button>
              <div className="ob-adjust-link">Adjust allocation</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
