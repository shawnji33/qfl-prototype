import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'

const ALL_DATA = {
  '1M': [
    { d: 'Apr 7',  v: 124820 }, { d: 'Apr 12', v: 125340 }, { d: 'Apr 17', v: 124090 },
    { d: 'Apr 22', v: 125810 }, { d: 'Apr 27', v: 126340 }, { d: 'May 2',  v: 126880 },
    { d: 'May 7',  v: 127432 },
  ],
  '3M': [
    { d: 'Feb',    v: 119440 }, { d: 'Feb 15', v: 121200 }, { d: 'Mar 1',  v: 120580 },
    { d: 'Mar 15', v: 122890 }, { d: 'Apr 1',  v: 124100 }, { d: 'Apr 15', v: 125600 },
    { d: 'May 7',  v: 127432 },
  ],
  '6M': [
    { d: 'Nov', v: 112800 }, { d: 'Dec', v: 114200 }, { d: 'Jan', v: 116500 },
    { d: 'Feb', v: 119440 }, { d: 'Mar', v: 122100 }, { d: 'Apr', v: 125340 },
    { d: 'May', v: 127432 },
  ],
  'YTD': [
    { d: 'Jan 1',  v: 113900 }, { d: 'Jan 20', v: 115200 }, { d: 'Feb 5',  v: 117800 },
    { d: 'Feb 20', v: 119440 }, { d: 'Mar 5',  v: 120580 }, { d: 'Mar 20', v: 122890 },
    { d: 'Apr 5',  v: 124100 }, { d: 'Apr 20', v: 125600 }, { d: 'May 7',  v: 127432 },
  ],
  '1Y': [
    { d: 'May \'24', v: 99210 }, { d: 'Jun', v: 101540 }, { d: 'Jul', v: 104800 },
    { d: 'Aug',      v: 103200 }, { d: 'Sep', v: 106500 }, { d: 'Oct', v: 109700 },
    { d: 'Nov',      v: 112800 }, { d: 'Dec', v: 114200 }, { d: 'Jan', v: 116500 },
    { d: 'Feb',      v: 119440 }, { d: 'Mar', v: 122100 }, { d: 'Apr', v: 125340 },
    { d: 'May \'25', v: 127432 },
  ],
}

const RANGES = ['1M', '3M', '6M', 'YTD', '1Y']

const ALLOCATIONS = [
  { label: 'US Equities',   pct: 58, value: '$73,911', color: '#72D46C' },
  { label: 'International', pct: 20, value: '$25,486', color: '#111111' },
  { label: 'Fixed Income',  pct: 15, value: '$19,115', color: '#BBBBBB' },
  { label: 'Alternatives',  pct:  7, value: '$8,920',  color: '#DDDDDD' },
]

const ACTIVITY = [
  { type: 'div',      title: 'Dividend received',       sub: 'Vanguard S&P 500 ETF (VOO)',    amount: '+$42.18', positive: true,  date: 'May 6' },
  { type: 'rebal',    title: 'Auto-rebalance executed',  sub: '3 trades across 2 strategies',  amount: null,      positive: null,  date: 'May 4' },
  { type: 'deposit',  title: 'Deposit settled',           sub: 'Bank of America ••4291',        amount: '+$5,000', positive: true,  date: 'May 2' },
  { type: 'strategy', title: 'Strategy update',           sub: 'QC Leaders rebalanced',         amount: null,      positive: null,  date: 'Apr 29' },
]

const STATS = [
  { label: 'Total return',    value: '+$27,432', sub: 'since inception',  pos: true },
  { label: 'YTD return',      value: '+13.5%',   sub: '+$13,532 this year', pos: true },
  { label: 'Dividend income', value: '$842',     sub: 'last 12 months',   pos: false },
  { label: 'Next rebalance',  value: 'May 14',   sub: 'in 7 days',        pos: false },
]

function ActivityIcon({ type }) {
  const bgs  = { div: '#EBF9EA', rebal: '#F4F5F7', deposit: '#EBF9EA', strategy: '#F4F5F7' }
  const icons = {
    div:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#45B83F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    rebal:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
    deposit:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#45B83F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
    strategy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  }
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: bgs[type] || '#F4F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icons[type]}
    </div>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#fff', letterSpacing: '-0.2px' }}>
      <div style={{ fontWeight: 700 }}>${payload[0].value.toLocaleString()}</div>
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>{payload[0].payload.d}</div>
    </div>
  )
}

const css = `
  .dash { padding: 32px 36px; }

  .dash-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; }
  .dash-greeting { font-size: 22px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.5px; }
  .dash-date { font-size: 13px; color: var(--gray-500); margin-top: 3px; }
  .deposit-btn { display: flex; align-items: center; gap: 7px; background: var(--black); color: #fff; padding: 10px 18px; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 600; letter-spacing: -0.2px; transition: background 0.12s; }
  .deposit-btn:hover { background: #2a2a2a; }

  /* Hero card */
  .hero-card { background: var(--black); border-radius: var(--radius-lg); padding: 28px 32px 20px; margin-bottom: 20px; }
  .hero-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 8px; }
  .hero-value { font-size: 44px; font-weight: 800; color: #fff; letter-spacing: -2px; line-height: 1; margin-bottom: 10px; }
  .hero-pill { display: inline-flex; align-items: center; gap: 5px; background: rgba(114,212,108,0.15); color: #72D46C; padding: 4px 10px; border-radius: 20px; font-size: 12.5px; font-weight: 600; }
  .hero-since { font-size: 12px; color: rgba(255,255,255,0.3); margin-left: 8px; }

  .range-tabs { display: flex; gap: 3px; margin: 14px 0 4px; }
  .range-tab { padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.3); cursor: pointer; transition: background 0.1s, color 0.1s; border: none; background: none; }
  .range-tab:hover { color: rgba(255,255,255,0.65); }
  .range-tab.active { background: rgba(255,255,255,0.09); color: #fff; }

  /* Stats */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 18px; }
  .stat-label { font-size: 11px; font-weight: 600; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .stat-value { font-size: 20px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.8px; }
  .stat-value.pos { color: var(--pos); }
  .stat-sub { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

  /* Two-col */
  .dash-grid { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }

  .section-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 20px 22px; }
  .section-title { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 16px; }

  /* Alloc */
  .alloc-bar { display: flex; height: 5px; border-radius: 3px; overflow: hidden; gap: 2px; margin-bottom: 16px; }
  .alloc-seg { border-radius: 3px; }
  .alloc-rows { display: flex; flex-direction: column; gap: 11px; }
  .alloc-row { display: flex; align-items: center; gap: 10px; }
  .alloc-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .alloc-label { flex: 1; font-size: 13.5px; color: var(--gray-700); }
  .alloc-pct { font-size: 13px; font-weight: 500; color: var(--gray-500); width: 34px; text-align: right; }
  .alloc-val { font-size: 13.5px; font-weight: 600; color: var(--gray-900); text-align: right; min-width: 64px; letter-spacing: -0.2px; }

  /* Activity */
  .activity-list { display: flex; flex-direction: column; }
  .act-row { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--border); }
  .act-row:last-child { border-bottom: none; }
  .act-body { flex: 1; min-width: 0; }
  .act-title { font-size: 13.5px; font-weight: 500; color: var(--gray-900); }
  .act-sub { font-size: 12px; color: var(--gray-500); margin-top: 1px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .act-right { text-align: right; flex-shrink: 0; }
  .act-amount { font-size: 13.5px; font-weight: 600; }
  .act-amount.pos { color: var(--pos); }
  .act-date { font-size: 11.5px; color: var(--gray-500); margin-top: 2px; }

  @media (max-width: 1100px) {
    .dash-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .dash { padding: 24px 20px; }
  }
  @media (max-width: 600px) {
    .stats-grid { grid-template-columns: 1fr 1fr; }
  }
`

export default function Dashboard() {
  const [range, setRange] = useState('YTD')
  const data = ALL_DATA[range]
  const first = data[0].v
  const last  = data[data.length - 1].v
  const changePct = (((last - first) / first) * 100).toFixed(1)

  return (
    <>
      <style>{css}</style>
      <div className="dash">
        {/* Header */}
        <div className="dash-header">
          <div>
            <div className="dash-greeting">Good morning, Shawn</div>
            <div className="dash-date">Wednesday, May 7, 2025 · Portfolio is on track</div>
          </div>
          <button className="deposit-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Deposit funds
          </button>
        </div>

        {/* Portfolio chart hero */}
        <div className="hero-card">
          <div className="hero-label">Total portfolio value</div>
          <div className="hero-value">$127,432</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="hero-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
              +{changePct}% {range}
            </span>
            <span className="hero-since">+${(last - first).toLocaleString()} this period</span>
          </div>

          <div className="range-tabs">
            {RANGES.map(r => (
              <button key={r} className={`range-tab${range === r ? ' active' : ''}`} onClick={() => setRange(r)}>{r}</button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#72D46C" stopOpacity={0.22}/>
                  <stop offset="100%" stopColor="#72D46C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="d" tick={{ fill: 'rgba(255,255,255,0.28)', fontSize: 10.5 }} axisLine={false} tickLine={false} dy={6}/>
              <YAxis hide domain={['auto', 'auto']}/>
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}/>
              <Area type="monotone" dataKey="v" stroke="#72D46C" strokeWidth={2} fill="url(#gfill)" dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Key stats */}
        <div className="stats-grid">
          {STATS.map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-value${s.pos ? ' pos' : ''}`}>{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="section-card">
              <div className="section-title">Allocation</div>
              <div className="alloc-bar">
                {ALLOCATIONS.map(a => (
                  <div key={a.label} className="alloc-seg" style={{ flex: a.pct, background: a.color }}/>
                ))}
              </div>
              <div className="alloc-rows">
                {ALLOCATIONS.map(a => (
                  <div className="alloc-row" key={a.label}>
                    <div className="alloc-dot" style={{ background: a.color }}/>
                    <div className="alloc-label">{a.label}</div>
                    <div className="alloc-pct">{a.pct}%</div>
                    <div className="alloc-val">{a.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card">
              <div className="section-title">Recent activity</div>
              <div className="activity-list">
                {ACTIVITY.map((a, i) => (
                  <div className="act-row" key={i}>
                    <ActivityIcon type={a.type}/>
                    <div className="act-body">
                      <div className="act-title">{a.title}</div>
                      <div className="act-sub">{a.sub}</div>
                    </div>
                    <div className="act-right">
                      {a.amount && <div className={`act-amount${a.positive ? ' pos' : ''}`}>{a.amount}</div>}
                      <div className="act-date">{a.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="section-card">
              <div className="section-title">Active strategies</div>
              {[
                { name: 'Quantum Computing Leaders', ret: '+24.1%', dot: '#72D46C' },
                { name: 'S&P 500 Core',               ret: '+11.2%', dot: '#111111' },
                { name: 'Global Dividend Growth',      ret: '+8.7%',  dot: '#BBBBBB' },
              ].map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, flexShrink: 0 }}/>
                  <div style={{ flex: 1, fontSize: 13.5, color: 'var(--gray-900)', fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pos)' }}>{s.ret}</div>
                </div>
              ))}
              <button style={{ marginTop: 14, width: '100%', padding: '9px', background: 'var(--gray-100)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', letterSpacing: '-0.1px' }}>
                Browse all strategies →
              </button>
            </div>

            <div className="section-card" style={{ background: 'var(--black)' }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 8 }}>Auto-invest</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 3 }}>$500 / month</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Next draft: May 14, 2025</div>
              <button style={{ width: '100%', padding: '9px', background: 'rgba(114,212,108,0.13)', border: '1px solid rgba(114,212,108,0.22)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#72D46C' }}>
                Manage auto-invest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
