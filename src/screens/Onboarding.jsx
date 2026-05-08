import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { id: 'welcome',    label: 'Welcome'     },
  { id: 'profile',    label: 'Profile'     },
  { id: 'goal',       label: 'Goal'        },
  { id: 'horizon',    label: 'Horizon'     },
  { id: 'risk',       label: 'Risk'        },
  { id: 'result',     label: 'Portfolio'   },
]

const GOALS = [
  { id: 'growth',      icon: '📈', label: 'Long-term growth',   sub: 'Maximize wealth over 10+ years'      },
  { id: 'income',      icon: '💰', label: 'Passive income',     sub: 'Generate steady dividend returns'     },
  { id: 'retirement',  icon: '🏖️', label: 'Retirement',         sub: 'Build a secure retirement portfolio'  },
  { id: 'saving',      icon: '🎯', label: 'Specific goal',      sub: 'Save for a home, education, or event' },
]

const HORIZONS = [
  { id: 'short',  label: 'Under 3 years',  sub: 'Near-term focus'      },
  { id: 'mid',    label: '3–7 years',       sub: 'Medium-term growth'   },
  { id: 'long',   label: '7–15 years',      sub: 'Long-term compounding' },
  { id: 'vlong',  label: '15+ years',       sub: 'Generational wealth'  },
]

const RISK_OPTIONS = [
  { id: 'conservative',  label: 'Conservative',        sub: 'Capital preservation, low volatility',  exp: '+4–7% / year'   },
  { id: 'moderate',      label: 'Moderate',            sub: 'Balanced growth and stability',          exp: '+7–11% / year'  },
  { id: 'aggressive',    label: 'Aggressive',          sub: 'Higher growth, higher volatility',        exp: '+11–18% / year' },
  { id: 'very_agg',      label: 'Very aggressive',     sub: 'Maximum growth potential',                exp: '+15–25% / year' },
]

function QFLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
      <circle cx="19" cy="19" r="16" fill="#72D46C"/>
      <circle cx="18" cy="18" r="8" fill="#111"/>
      <rect x="24" y="24" width="10" height="7" rx="3.5" transform="rotate(-42 24 24)" fill="#72D46C"/>
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  )
}

/* Donut chart for the portfolio result screen */
function Donut({ slices }) {
  const r = 60, cx = 70, cy = 70, stroke = 28
  const circ = 2 * Math.PI * r
  let offset = 0
  const arcs = slices.map(s => {
    const len = (s.pct / 100) * circ
    const arc = { ...s, len, offset }
    offset += len
    return arc
  })
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={a.color}
          strokeWidth={stroke}
          strokeDasharray={`${a.len} ${circ - a.len}`}
          strokeDashoffset={-a.offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px' }}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#111" fontSize="13" fontWeight="700">+13.5%</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#888" fontSize="10">YTD</text>
    </svg>
  )
}

const css = `
  .onboard-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    padding: 40px 20px;
  }

  .onboard-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    width: 100%;
    max-width: 520px;
    overflow: hidden;
  }

  /* Progress bar */
  .progress-bar-wrap {
    height: 3px;
    background: var(--gray-100);
  }
  .progress-bar-fill {
    height: 100%;
    background: #72D46C;
    border-radius: 0 2px 2px 0;
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  /* Step indicator */
  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 16px 24px 0;
  }
  .step-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gray-200);
    transition: background 0.2s, width 0.2s;
  }
  .step-dot.done { background: #45B83F; }
  .step-dot.active { background: #72D46C; width: 18px; border-radius: 3px; }

  /* Content */
  .onboard-body { padding: 32px 36px 28px; }

  .step-tag { font-size: 11px; font-weight: 700; color: #72D46C; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
  .step-heading { font-size: 24px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.8px; line-height: 1.2; margin-bottom: 8px; }
  .step-sub { font-size: 14px; color: var(--gray-500); line-height: 1.55; margin-bottom: 28px; }

  /* Options grid */
  .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
  .option-card {
    padding: 16px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color 0.13s, background 0.13s;
    text-align: left;
  }
  .option-card:hover { border-color: rgba(17,17,17,0.18); background: var(--gray-50); }
  .option-card.selected { border-color: #72D46C; background: #EBF9EA; }
  .option-icon { font-size: 22px; margin-bottom: 8px; }
  .option-label { font-size: 14px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.3px; }
  .option-sub { font-size: 12px; color: var(--gray-500); margin-top: 3px; line-height: 1.4; }
  .option-exp { font-size: 12px; font-weight: 600; color: #45B83F; margin-top: 6px; }

  /* List options */
  .options-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
  .option-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color 0.13s, background 0.13s;
  }
  .option-row:hover { border-color: rgba(17,17,17,0.18); background: var(--gray-50); }
  .option-row.selected { border-color: #72D46C; background: #EBF9EA; }
  .opt-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--gray-300); flex-shrink: 0; transition: border-color 0.13s; display: flex; align-items: center; justify-content: center; }
  .option-row.selected .opt-radio { border-color: #72D46C; }
  .opt-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #72D46C; opacity: 0; transition: opacity 0.13s; }
  .option-row.selected .opt-radio-dot { opacity: 1; }

  /* Input */
  .field-label { font-size: 12px; font-weight: 600; color: var(--gray-700); text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 6px; }
  .field-input { width: 100%; padding: 12px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 15px; font-weight: 400; color: var(--gray-900); outline: none; transition: border-color 0.13s; margin-bottom: 14px; font-family: inherit; }
  .field-input:focus { border-color: #72D46C; }

  /* Footer nav */
  .onboard-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 36px;
    border-top: 1px solid var(--border);
    background: var(--gray-50);
  }
  .btn-back { display: flex; align-items: center; gap: 7px; padding: 10px 18px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 600; color: var(--gray-700); background: none; border: 1px solid var(--border); cursor: pointer; transition: background 0.12s; }
  .btn-back:hover { background: var(--gray-100); }
  .btn-next { display: flex; align-items: center; gap: 7px; padding: 10px 22px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 700; color: #fff; background: var(--black); cursor: pointer; transition: background 0.12s; border: none; }
  .btn-next:hover { background: #2a2a2a; }
  .btn-next:disabled { background: var(--gray-200); color: var(--gray-500); cursor: not-allowed; }

  /* Result screen */
  .result-body { padding: 28px 36px 8px; }
  .result-grid { display: grid; grid-template-columns: 140px 1fr; gap: 24px; align-items: center; margin-bottom: 28px; }
  .result-chart-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .result-match { display: inline-flex; align-items: center; gap: 6px; background: #EBF9EA; color: #45B83F; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; margin-bottom: 4px; }
  .result-heading { font-size: 20px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.6px; margin-bottom: 6px; }
  .result-sub { font-size: 13px; color: var(--gray-500); line-height: 1.5; }
  .result-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
  .result-metric { background: var(--gray-100); border-radius: var(--radius-sm); padding: 12px 14px; }
  .result-metric-label { font-size: 10.5px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.4px; }
  .result-metric-val { font-size: 17px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.5px; margin-top: 4px; }
  .result-metric-val.pos { color: var(--pos); }
  .legend-list { display: flex; flex-direction: column; gap: 7px; }
  .legend-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--gray-700); }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .legend-pct { margin-left: auto; font-weight: 700; color: var(--gray-900); }

  /* Welcome */
  .welcome-body { padding: 48px 36px 36px; text-align: center; }
  .welcome-logo { display: flex; justify-content: center; margin-bottom: 24px; }
  .welcome-heading { font-size: 28px; font-weight: 800; color: var(--gray-900); letter-spacing: -1px; line-height: 1.2; margin-bottom: 12px; }
  .welcome-sub { font-size: 15px; color: var(--gray-500); line-height: 1.6; margin-bottom: 36px; max-width: 380px; margin-left: auto; margin-right: auto; }
  .welcome-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 36px; }
  .welcome-stat { background: var(--gray-100); border-radius: var(--radius-md); padding: 16px 12px; }
  .welcome-stat-val { font-size: 22px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.8px; }
  .welcome-stat-label { font-size: 11.5px; color: var(--gray-500); margin-top: 4px; line-height: 1.3; }
  .btn-get-started { width: 100%; padding: 14px; background: var(--black); color: #fff; border-radius: var(--radius-sm); font-size: 15px; font-weight: 700; letter-spacing: -0.3px; display: flex; align-items: center; justify-content: center; gap: 8px; border: none; cursor: pointer; transition: background 0.12s; }
  .btn-get-started:hover { background: #2a2a2a; }
`

const PORTFOLIO_SLICES = [
  { pct: 50, color: '#72D46C', label: 'US Equities' },
  { pct: 20, color: '#111111', label: 'International' },
  { pct: 15, color: '#BBBBBB', label: 'Fixed income' },
  { pct: 10, color: '#DDDDDD', label: 'Alternatives' },
  { pct:  5, color: '#F0F0F0', label: 'Cash' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState(null)
  const [horizon, setHorizon] = useState(null)
  const [risk, setRisk] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const progress = (step / (STEPS.length - 1)) * 100

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return firstName.trim() && email.trim()
    if (step === 2) return goal !== null
    if (step === 3) return horizon !== null
    if (step === 4) return risk !== null
    return true
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else navigate('/dashboard')
  }
  function back() {
    if (step > 0) setStep(s => s - 1)
  }

  return (
    <>
      <style>{css}</style>
      <div className="onboard-wrap">
        <div className="onboard-card">
          {/* Progress */}
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}/>
          </div>

          {/* Step dots */}
          <div className="step-indicator">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`step-dot${i < step ? ' done' : i === step ? ' active' : ''}`}/>
            ))}
          </div>

          {/* ── Step 0: Welcome ── */}
          {step === 0 && (
            <div className="welcome-body">
              <div className="welcome-logo"><QFLogo/></div>
              <div className="welcome-heading">Modern markets require modern solutions</div>
              <div className="welcome-sub">
                Quantitative Finance builds personalized, data-driven portfolios using automated strategies — so your money works smarter, every day.
              </div>
              <div className="welcome-stats">
                <div className="welcome-stat">
                  <div className="welcome-stat-val">8</div>
                  <div className="welcome-stat-label">Brokers supported</div>
                </div>
                <div className="welcome-stat">
                  <div className="welcome-stat-val">50+</div>
                  <div className="welcome-stat-label">Strategies available</div>
                </div>
                <div className="welcome-stat">
                  <div className="welcome-stat-val">1B+</div>
                  <div className="welcome-stat-label">Datapoints analyzed</div>
                </div>
              </div>
              <button className="btn-get-started" onClick={next}>
                Get started <ArrowRight/>
              </button>
            </div>
          )}

          {/* ── Step 1: Profile ── */}
          {step === 1 && (
            <div className="onboard-body">
              <div className="step-tag">Step 1 of {STEPS.length - 1}</div>
              <div className="step-heading">Let's get to know you</div>
              <div className="step-sub">We'll use this to personalize your experience and keep your account secure.</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div className="field-label">First name</div>
                  <input className="field-input" type="text" placeholder="Shawn" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div>
                  <div className="field-label">Last name</div>
                  <input className="field-input" type="text" placeholder="Ji" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
              </div>
              <div className="field-label">Email address</div>
              <input className="field-input" type="email" placeholder="shawn@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
              <div className="field-label">Phone number (optional)</div>
              <input className="field-input" type="tel" placeholder="+1 (555) 000-0000"/>
            </div>
          )}

          {/* ── Step 2: Goal ── */}
          {step === 2 && (
            <div className="onboard-body">
              <div className="step-tag">Step 2 of {STEPS.length - 1}</div>
              <div className="step-heading">What's your primary goal?</div>
              <div className="step-sub">We'll match you with strategies built around what matters most to you.</div>
              <div className="options-grid">
                {GOALS.map(g => (
                  <div key={g.id} className={`option-card${goal === g.id ? ' selected' : ''}`} onClick={() => setGoal(g.id)}>
                    <div className="option-icon">{g.icon}</div>
                    <div className="option-label">{g.label}</div>
                    <div className="option-sub">{g.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Time horizon ── */}
          {step === 3 && (
            <div className="onboard-body">
              <div className="step-tag">Step 3 of {STEPS.length - 1}</div>
              <div className="step-heading">What's your time horizon?</div>
              <div className="step-sub">Longer horizons allow for more aggressive strategies with higher growth potential.</div>
              <div className="options-list">
                {HORIZONS.map(h => (
                  <div key={h.id} className={`option-row${horizon === h.id ? ' selected' : ''}`} onClick={() => setHorizon(h.id)}>
                    <div className="opt-radio"><div className="opt-radio-dot"/></div>
                    <div>
                      <div className="option-label">{h.label}</div>
                      <div className="option-sub">{h.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 4: Risk tolerance ── */}
          {step === 4 && (
            <div className="onboard-body">
              <div className="step-tag">Step 4 of {STEPS.length - 1}</div>
              <div className="step-heading">What's your risk tolerance?</div>
              <div className="step-sub">Higher risk means more short-term volatility, but greater long-term growth potential.</div>
              <div className="options-list">
                {RISK_OPTIONS.map(r => (
                  <div key={r.id} className={`option-row${risk === r.id ? ' selected' : ''}`} onClick={() => setRisk(r.id)}>
                    <div className="opt-radio"><div className="opt-radio-dot"/></div>
                    <div style={{ flex: 1 }}>
                      <div className="option-label">{r.label}</div>
                      <div className="option-sub">{r.sub}</div>
                    </div>
                    <div className="option-exp">{r.exp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 5: Recommendation ── */}
          {step === 5 && (
            <div className="result-body">
              <div className="step-tag">Your personalized portfolio</div>
              <div className="result-grid">
                <div className="result-chart-wrap">
                  <Donut slices={PORTFOLIO_SLICES}/>
                </div>
                <div>
                  <div className="result-match">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
                    96% match
                  </div>
                  <div className="result-heading">Moderate Growth Portfolio</div>
                  <div className="result-sub">A diversified, data-driven portfolio optimized for your goals — with automated rebalancing and tax efficiency.</div>
                </div>
              </div>

              <div className="result-metrics">
                <div className="result-metric">
                  <div className="result-metric-label">Expected return</div>
                  <div className="result-metric-val pos">+11–14%</div>
                </div>
                <div className="result-metric">
                  <div className="result-metric-label">Volatility</div>
                  <div className="result-metric-val">Medium</div>
                </div>
                <div className="result-metric">
                  <div className="result-metric-label">Strategies</div>
                  <div className="result-metric-val">3 active</div>
                </div>
              </div>

              <div className="legend-list" style={{ marginBottom: 28 }}>
                {PORTFOLIO_SLICES.map(s => (
                  <div className="legend-row" key={s.label}>
                    <div className="legend-dot" style={{ background: s.color }}/>
                    {s.label}
                    <div className="legend-pct">{s.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          {step > 0 && (
            <div className="onboard-footer">
              <button className="btn-back" onClick={back}><ArrowLeft/> Back</button>
              <button className="btn-next" onClick={next} disabled={!canNext()}>
                {step === STEPS.length - 1 ? 'Launch my portfolio' : 'Continue'}
                <ArrowRight/>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
