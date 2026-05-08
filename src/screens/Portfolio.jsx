import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const PERF_DATA = [
  { d: 'Jan', qfl: 100, sp: 100 },
  { d: 'Feb', qfl: 103.4, sp: 101.8 },
  { d: 'Mar', qfl: 108.2, sp: 103.5 },
  { d: 'Apr', qfl: 106.8, sp: 102.9 },
  { d: 'May', qfl: 112.6, sp: 105.2 },
  { d: 'Jun', qfl: 118.4, sp: 107.8 },
  { d: 'Jul', qfl: 122.1, sp: 109.4 },
  { d: 'Aug', qfl: 119.5, sp: 108.1 },
  { d: 'Sep', qfl: 125.8, sp: 111.3 },
  { d: 'Oct', qfl: 131.2, sp: 113.6 },
  { d: 'Nov', qfl: 129.4, sp: 112.8 },
  { d: 'Dec', qfl: 134.7, sp: 115.2 },
  { d: 'Jan', qfl: 138.9, sp: 116.4 },
  { d: 'Feb', qfl: 143.5, sp: 118.2 },
  { d: 'Mar', qfl: 149.8, sp: 120.1 },
  { d: 'Apr', qfl: 147.2, sp: 119.3 },
  { d: 'May', qfl: 153.4, sp: 121.8 },
]

const HOLDINGS = [
  { ticker: 'VOO',  name: 'Vanguard S&P 500 ETF',          shares: 48,   price: '$519.24', value: '$24,923', ret: '+18.4%', pos: true,  alloc: 19.6 },
  { ticker: 'QQQ',  name: 'Invesco QQQ Trust',              shares: 28,   price: '$472.88', value: '$13,241', ret: '+22.1%', pos: true,  alloc: 10.4 },
  { ticker: 'QCLS', name: 'QFL Quantum Computing Leaders',  shares: 112,  price: '$89.44',  value: '$10,017', ret: '+24.1%', pos: true,  alloc: 7.9  },
  { ticker: 'SOXX', name: 'iShares Semiconductor ETF',      shares: 22,   price: '$228.50', value: '$5,027',  ret: '+31.2%', pos: true,  alloc: 3.9  },
  { ticker: 'AGG',  name: 'iShares Core US Aggregate Bond', shares: 180,  price: '$98.32',  value: '$17,698', ret: '-1.2%',  pos: false, alloc: 13.9 },
  { ticker: 'VEA',  name: 'Vanguard FTSE Developed Mkts',  shares: 290,  price: '$49.18',  value: '$14,262', ret: '+8.7%',  pos: true,  alloc: 11.2 },
  { ticker: 'VWO',  name: 'Vanguard FTSE Emerging Mkts',   shares: 210,  price: '$44.76',  value: '$9,400',  ret: '+5.3%',  pos: true,  alloc: 7.4  },
  { ticker: 'GLD',  name: 'SPDR Gold Trust',                shares: 44,   price: '$215.62', value: '$9,487',  ret: '+12.8%', pos: true,  alloc: 7.4  },
]

const STRATEGIES = [
  { name: 'Quantum Computing Leaders', pct: 24.1, value: '$30,617', risk: 'High',   status: 'Active', ret: '+24.1%' },
  { name: 'S&P 500 Core',              pct: 47.3, value: '$60,228', risk: 'Low',    status: 'Active', ret: '+11.2%' },
  { name: 'Global Dividend Growth',    pct: 28.6, value: '$36,387', risk: 'Medium', status: 'Active', ret: '+8.7%'  },
]

const css = `
  .port { padding: 32px 36px; }
  .port-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .port-title { font-size: 22px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.5px; }
  .port-val { font-size: 13px; color: var(--gray-500); margin-top: 3px; }

  .port-tabs { display: flex; gap: 2px; background: var(--gray-100); border-radius: 10px; padding: 3px; }
  .port-tab { padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: background 0.12s, color 0.12s; letter-spacing: -0.1px; border: none; background: none; }
  .port-tab.active { background: var(--surface); color: var(--gray-900); font-weight: 600; box-shadow: 0 1px 4px rgba(17,17,17,0.08); }

  .summary-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .sum-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 18px; }
  .sum-label { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .sum-value { font-size: 20px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.8px; }
  .sum-value.pos { color: var(--pos); }
  .sum-value.neg { color: var(--neg); }
  .sum-sub { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

  /* Section card */
  .sc { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 20px 22px; margin-bottom: 20px; }
  .sc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .sc-title { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.6px; }
  .sc-action { font-size: 13px; font-weight: 500; color: var(--green-ui); cursor: pointer; }

  /* Holdings table */
  .hold-table { width: 100%; border-collapse: collapse; }
  .hold-table th { font-size: 11px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.4px; padding: 0 0 10px; text-align: left; border-bottom: 1px solid var(--border); }
  .hold-table th:not(:first-child) { text-align: right; }
  .hold-table td { padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 13.5px; color: var(--gray-900); letter-spacing: -0.2px; }
  .hold-table td:not(:first-child) { text-align: right; }
  .hold-table tr:last-child td { border-bottom: none; }
  .hold-ticker { font-weight: 700; font-size: 13.5px; color: var(--gray-900); }
  .hold-name { font-size: 12px; color: var(--gray-500); margin-top: 2px; }
  .hold-ret.pos { color: var(--pos); font-weight: 600; }
  .hold-ret.neg { color: var(--neg); font-weight: 600; }

  /* Strategies */
  .strat-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
  .strat-row:last-child { border-bottom: none; }
  .strat-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .strat-body { flex: 1; }
  .strat-name { font-size: 14px; font-weight: 600; color: var(--gray-900); letter-spacing: -0.3px; }
  .strat-meta { display: flex; gap: 12px; margin-top: 3px; }
  .strat-tag { font-size: 11.5px; color: var(--gray-500); }
  .strat-right { text-align: right; }
  .strat-val { font-size: 14px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.3px; }
  .strat-ret { font-size: 13px; font-weight: 600; color: var(--pos); margin-top: 2px; }

  /* Perf chart tooltip */
  .perf-tooltip { background: #fff; border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; font-size: 12.5px; color: var(--gray-900); box-shadow: var(--shadow-sm); }

  @media (max-width: 900px) {
    .summary-row { grid-template-columns: 1fr 1fr; }
    .port { padding: 24px 20px; }
  }
`

function PerfTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="perf-tooltip">
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }}/>
          <span style={{ color: '#888', fontSize: 12 }}>{p.name === 'qfl' ? 'My portfolio' : 'S&P 500'}</span>
          <span style={{ fontWeight: 700, marginLeft: 'auto', paddingLeft: 16 }}>{(p.value - 100).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  )
}

const STRAT_COLORS = ['#72D46C', '#111111', '#BBBBBB']

export default function Portfolio() {
  const [tab, setTab] = useState('holdings')

  return (
    <>
      <style>{css}</style>
      <div className="port">
        <div className="port-header">
          <div>
            <div className="port-title">Portfolio</div>
            <div className="port-val">$127,432.14 total value · updated just now</div>
          </div>
          <div className="port-tabs">
            {['holdings', 'strategies', 'performance'].map(t => (
              <button key={t} className={`port-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="summary-row">
          <div className="sum-card">
            <div className="sum-label">Market value</div>
            <div className="sum-value">$127,432</div>
            <div className="sum-sub">Across 8 positions</div>
          </div>
          <div className="sum-card">
            <div className="sum-label">Total gain/loss</div>
            <div className="sum-value pos">+$27,432</div>
            <div className="sum-sub">+27.4% all time</div>
          </div>
          <div className="sum-card">
            <div className="sum-label">YTD return</div>
            <div className="sum-value pos">+13.5%</div>
            <div className="sum-sub">vs S&P +9.8% YTD</div>
          </div>
          <div className="sum-card">
            <div className="sum-label">Cash available</div>
            <div className="sum-value">$3,212</div>
            <div className="sum-sub">Ready to invest</div>
          </div>
        </div>

        {/* Holdings tab */}
        {tab === 'holdings' && (
          <div className="sc">
            <div className="sc-head">
              <div className="sc-title">Holdings</div>
              <div className="sc-action">+ Add position</div>
            </div>
            <table className="hold-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Value</th>
                  <th>Alloc</th>
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>
                {HOLDINGS.map(h => (
                  <tr key={h.ticker}>
                    <td>
                      <div className="hold-ticker">{h.ticker}</div>
                      <div className="hold-name">{h.name}</div>
                    </td>
                    <td>{h.shares}</td>
                    <td>{h.price}</td>
                    <td style={{ fontWeight: 600 }}>{h.value}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                        <div style={{ width: 40, height: 3, background: 'var(--gray-200)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ width: `${h.alloc / 20 * 100}%`, height: '100%', background: '#72D46C', borderRadius: 2 }}/>
                        </div>
                        {h.alloc}%
                      </div>
                    </td>
                    <td className={`hold-ret ${h.pos ? 'pos' : 'neg'}`}>{h.ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Strategies tab */}
        {tab === 'strategies' && (
          <div className="sc">
            <div className="sc-head">
              <div className="sc-title">Active strategies</div>
              <div className="sc-action">Browse more →</div>
            </div>
            {STRATEGIES.map((s, i) => (
              <div className="strat-row" key={s.name}>
                <div className="strat-dot" style={{ background: STRAT_COLORS[i] }}/>
                <div className="strat-body">
                  <div className="strat-name">{s.name}</div>
                  <div className="strat-meta">
                    <span className="strat-tag">Risk: {s.risk}</span>
                    <span className="strat-tag">{s.pct}% of portfolio</span>
                    <span className="strat-tag" style={{ color: '#72D46C', fontWeight: 600 }}>{s.status}</span>
                  </div>
                </div>
                <div className="strat-right">
                  <div className="strat-val">{s.value}</div>
                  <div className="strat-ret">{s.ret} YTD</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performance tab */}
        {tab === 'performance' && (
          <div className="sc">
            <div className="sc-head">
              <div className="sc-title">Performance vs S&P 500</div>
              <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>Indexed to 100 · 17 months</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={PERF_DATA} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
                <XAxis dataKey="d" tick={{ fill: '#888', fontSize: 11.5 }} axisLine={false} tickLine={false} dy={6}/>
                <YAxis tick={{ fill: '#888', fontSize: 11.5 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[95, 165]}/>
                <Tooltip content={<PerfTooltip />} cursor={{ stroke: 'var(--gray-200)', strokeWidth: 1 }}/>
                <Line type="monotone" dataKey="qfl" stroke="#72D46C" strokeWidth={2.5} dot={false} name="qfl"/>
                <Line type="monotone" dataKey="sp"  stroke="#CCCCCC" strokeWidth={1.5} dot={false} name="sp" strokeDasharray="4 3"/>
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--gray-600)' }}>
                <div style={{ width: 20, height: 2, background: '#72D46C', borderRadius: 1 }}/>
                My portfolio <strong style={{ color: 'var(--gray-900)', marginLeft: 4 }}>+53.4%</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--gray-600)' }}>
                <div style={{ width: 20, height: 2, background: '#CCC', borderRadius: 1 }}/>
                S&P 500 <strong style={{ color: 'var(--gray-900)', marginLeft: 4 }}>+21.8%</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
