import { useState } from 'react'

const STRATEGIES = [
  {
    name: 'Quantum Computing Leaders',
    desc: 'Companies at the forefront of quantum computing — IonQ, IBM, Google, Rigetti.',
    ret1y: '+38.4%', ret3y: '+71.2%', risk: 'High', category: 'Thematic',
    assets: 12, minInvest: '$500', active: true,
    color: '#72D46C',
  },
  {
    name: 'S&P 500 Core',
    desc: 'Broad US large-cap exposure tracking the S&P 500 with minimal tracking error.',
    ret1y: '+24.1%', ret3y: '+52.3%', risk: 'Low', category: 'Index',
    assets: 500, minInvest: '$100', active: true,
    color: '#111111',
  },
  {
    name: 'Global Dividend Growth',
    desc: 'High-quality dividend-growing companies across US, Europe, and emerging markets.',
    ret1y: '+19.7%', ret3y: '+44.1%', risk: 'Medium', category: 'Income',
    assets: 80, minInvest: '$250', active: true,
    color: '#BBBBBB',
  },
  {
    name: 'AI & Machine Learning',
    desc: 'Pure-play AI companies and enabling infrastructure — Nvidia, Microsoft, Anthropic partners.',
    ret1y: '+52.1%', ret3y: '+94.8%', risk: 'Very high', category: 'Thematic',
    assets: 18, minInvest: '$500', active: false,
    color: '#72D46C',
  },
  {
    name: 'Clean Energy Transition',
    desc: 'Solar, wind, storage, and grid modernization companies driving the energy transition.',
    ret1y: '+12.8%', ret3y: '+31.4%', risk: 'High', category: 'ESG',
    assets: 35, minInvest: '$250', active: false,
    color: '#45B83F',
  },
  {
    name: 'US Small Cap Value',
    desc: 'Undervalued small-cap US companies with strong fundamentals and mean-reversion potential.',
    ret1y: '+16.3%', ret3y: '+38.9%', risk: 'Medium-high', category: 'Factor',
    assets: 120, minInvest: '$250', active: false,
    color: '#888888',
  },
]

const CATEGORIES = ['All', 'Thematic', 'Index', 'Income', 'ESG', 'Factor']

const css = `
  .strats { padding: 32px 36px; }
  .strats-header { margin-bottom: 28px; }
  .strats-title { font-size: 22px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.5px; }
  .strats-sub { font-size: 13px; color: var(--gray-500); margin-top: 3px; }

  .filter-row { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
  .filter-chip { padding: 6px 14px; border-radius: var(--radius-full); font-size: 13px; font-weight: 500; color: var(--gray-600); background: var(--surface); border: 1px solid var(--border); cursor: pointer; transition: background 0.12s, border-color 0.12s, color 0.12s; }
  .filter-chip:hover { border-color: rgba(17,17,17,0.18); }
  .filter-chip.active { background: var(--black); color: #fff; border-color: var(--black); }

  .strats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }

  .strat-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 20px; cursor: pointer; transition: border-color 0.13s, box-shadow 0.13s; position: relative; }
  .strat-card:hover { border-color: rgba(17,17,17,0.18); box-shadow: var(--shadow-md); }
  .strat-card.active-strat { border-color: #72D46C; }

  .strat-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
  .strat-dot-name { display: flex; align-items: center; gap: 8px; }
  .strat-card-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
  .strat-card-name { font-size: 15px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.4px; line-height: 1.3; }
  .strat-card-cat { font-size: 11px; font-weight: 600; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.4px; }
  .active-badge { font-size: 11px; font-weight: 700; color: #45B83F; background: #EBF9EA; padding: 3px 8px; border-radius: 20px; white-space: nowrap; }

  .strat-card-desc { font-size: 13px; color: var(--gray-500); line-height: 1.55; margin-bottom: 16px; }

  .strat-card-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-top: 14px; border-top: 1px solid var(--border); }
  .strat-stat-label { font-size: 10.5px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.4px; }
  .strat-stat-val { font-size: 14px; font-weight: 800; color: var(--gray-900); letter-spacing: -0.4px; margin-top: 3px; }
  .strat-stat-val.pos { color: var(--pos); }

  .add-btn { margin-top: 14px; width: 100%; padding: 9px; background: var(--black); color: #fff; border-radius: 8px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; transition: background 0.12s; }
  .add-btn:hover { background: #2a2a2a; }
  .remove-btn { margin-top: 14px; width: 100%; padding: 9px; background: none; color: var(--gray-700); border-radius: 8px; font-size: 13px; font-weight: 600; border: 1.5px solid var(--border); cursor: pointer; transition: background 0.12s; }
  .remove-btn:hover { background: var(--gray-100); }

  @media (max-width: 600px) {
    .strats { padding: 24px 20px; }
    .strats-grid { grid-template-columns: 1fr; }
  }
`

export default function Strategies() {
  const [category, setCategory] = useState('All')
  const [added, setAdded] = useState(new Set(['Quantum Computing Leaders', 'S&P 500 Core', 'Global Dividend Growth']))

  const filtered = STRATEGIES.filter(s => category === 'All' || s.category === category)

  return (
    <>
      <style>{css}</style>
      <div className="strats">
        <div className="strats-header">
          <div className="strats-title">Strategy marketplace</div>
          <div className="strats-sub">50+ data-driven strategies — from index funds to thematic plays</div>
        </div>

        <div className="filter-row">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-chip${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>

        <div className="strats-grid">
          {filtered.map(s => {
            const isAdded = added.has(s.name)
            return (
              <div key={s.name} className={`strat-card${isAdded ? ' active-strat' : ''}`}>
                <div className="strat-card-top">
                  <div>
                    <div className="strat-dot-name">
                      <div className="strat-card-dot" style={{ background: s.color }}/>
                      <div className="strat-card-cat">{s.category}</div>
                    </div>
                    <div className="strat-card-name" style={{ marginTop: 4 }}>{s.name}</div>
                  </div>
                  {isAdded && <span className="active-badge">Active</span>}
                </div>
                <div className="strat-card-desc">{s.desc}</div>
                <div className="strat-card-stats">
                  <div>
                    <div className="strat-stat-label">1Y return</div>
                    <div className="strat-stat-val pos">{s.ret1y}</div>
                  </div>
                  <div>
                    <div className="strat-stat-label">Risk</div>
                    <div className="strat-stat-val">{s.risk}</div>
                  </div>
                  <div>
                    <div className="strat-stat-label">Min invest</div>
                    <div className="strat-stat-val">{s.minInvest}</div>
                  </div>
                </div>
                {isAdded
                  ? <button className="remove-btn" onClick={() => setAdded(prev => { const n = new Set(prev); n.delete(s.name); return n })}>Remove strategy</button>
                  : <button className="add-btn" onClick={() => setAdded(prev => new Set([...prev, s.name]))}>Add to portfolio →</button>
                }
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
