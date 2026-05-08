import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'

const HOLDINGS = [
  { asset: 'Vanguard Total Stock Market ETF', ticker: 'VTI',  shares: 184.22, price: 248.40, value: 45760, weight: 35.9, ret: 14.2, retPos: true },
  { asset: 'Vanguard Total International ETF', ticker: 'VXUS', shares: 412.80, price: 61.72, value: 25482, weight: 20.0, ret: 8.7,  retPos: true },
  { asset: 'Vanguard Total Bond Market ETF',  ticker: 'BND',  shares: 210.50, price: 73.44, value: 15459, weight: 12.1, ret: -1.4, retPos: false },
  { asset: 'Schwab US Dividend Equity ETF',   ticker: 'SCHD', shares: 95.40,  price: 28.86, value: 2753,  weight: 2.2,  ret: 11.8, retPos: true },
  { asset: 'Invesco QQQ Trust',               ticker: 'QQQ',  shares: 18.60,  price: 480.52, value: 8938, weight: 7.0,  ret: 22.4, retPos: true },
  { asset: 'Vanguard Real Estate ETF',        ticker: 'VNQ',  shares: 78.10,  price: 86.44, value: 6751,  weight: 5.3,  ret: -3.8, retPos: false },
  { asset: 'SPDR Gold Shares',                ticker: 'GLD',  shares: 14.30,  price: 224.80, value: 3215, weight: 2.5,  ret: 18.6, retPos: true },
  { asset: 'Vanguard Short-Term Inflation-Protected Securities', ticker: 'VTIP', shares: 155.00, price: 48.20, value: 7471, weight: 5.9, ret: 2.1, retPos: true },
]

// 2-year weekly performance data
const PERF_DATA = [
  { date: 'May 23', portfolio: 100, sp500: 100 },
  { date: 'Jun 23', portfolio: 103.2, sp500: 104.1 },
  { date: 'Jul 23', portfolio: 107.8, sp500: 108.2 },
  { date: 'Aug 23', portfolio: 105.4, sp500: 105.8 },
  { date: 'Sep 23', portfolio: 102.1, sp500: 101.2 },
  { date: 'Oct 23', portfolio: 104.8, sp500: 103.9 },
  { date: 'Nov 23', portfolio: 109.6, sp500: 110.4 },
  { date: 'Dec 23', portfolio: 113.2, sp500: 114.8 },
  { date: 'Jan 24', portfolio: 112.0, sp500: 112.2 },
  { date: 'Feb 24', portfolio: 116.4, sp500: 117.8 },
  { date: 'Mar 24', portfolio: 120.8, sp500: 121.6 },
  { date: 'Apr 24', portfolio: 118.6, sp500: 117.0 },
  { date: 'May 24', portfolio: 122.4, sp500: 120.4 },
  { date: 'Jun 24', portfolio: 126.1, sp500: 124.8 },
  { date: 'Jul 24', portfolio: 124.2, sp500: 122.0 },
  { date: 'Aug 24', portfolio: 128.8, sp500: 126.4 },
  { date: 'Sep 24', portfolio: 132.6, sp500: 130.2 },
  { date: 'Oct 24', portfolio: 130.4, sp500: 127.8 },
  { date: 'Nov 24', portfolio: 136.2, sp500: 132.6 },
  { date: 'Dec 24', portfolio: 139.8, sp500: 135.4 },
  { date: 'Jan 25', portfolio: 138.4, sp500: 133.8 },
  { date: 'Feb 25', portfolio: 143.6, sp500: 137.2 },
  { date: 'Mar 25', portfolio: 147.2, sp500: 140.6 },
  { date: 'Apr 25', portfolio: 150.8, sp500: 143.2 },
  { date: 'May 25', portfolio: 154.6, sp500: 146.8 },
]

function PerfTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: 'var(--shadow-sm)',
        fontSize: 12.5,
      }}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: 4, letterSpacing: '-0.2px' }}>{label}</div>
        {payload.map((p) => (
          <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
            <span style={{ color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
              {p.name}: <strong>{p.value.toFixed(1)}%</strong>
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Portfolio() {
  return (
    <div style={{ padding: '32px 36px', maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.6px', marginBottom: 4 }}>
              My Portfolio
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14.5, color: 'var(--text-secondary)', letterSpacing: '-0.3px' }}>
                Balanced Growth Portfolio
              </span>
              <span style={{
                background: 'rgba(27,111,232,0.08)',
                color: 'var(--blue)',
                fontSize: 11.5,
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '-0.2px',
              }}>
                Moderate Risk
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '-0.3px', marginBottom: 2 }}>
              Total Value
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.6px' }}>
              $115,829
            </div>
          </div>
        </div>
      </div>

      {/* Holdings table */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 20,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px' }}>
            Holdings
          </h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Asset', 'Ticker', 'Shares', 'Price', 'Value', 'Weight', 'Return'].map((col) => (
                  <th key={col} style={{
                    padding: '10px 16px',
                    textAlign: col === 'Asset' ? 'left' : 'right',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--text-tertiary)',
                    letterSpacing: '-0.2px',
                    whiteSpace: 'nowrap',
                    background: 'var(--surface-2)',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOLDINGS.map((h, i) => (
                <tr
                  key={h.ticker}
                  style={{
                    borderBottom: i < HOLDINGS.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.3px', maxWidth: 200 }}>
                      {h.asset}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--navy)',
                      background: 'var(--blue-light)',
                      padding: '2px 7px',
                      borderRadius: 4,
                      letterSpacing: '-0.1px',
                    }}>
                      {h.ticker}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, color: 'var(--text-secondary)', letterSpacing: '-0.3px' }}>
                    {h.shares.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                    ${h.price.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.3px' }}>
                    ${h.value.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                      <div style={{
                        width: 48,
                        height: 4,
                        background: 'var(--bg)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(h.weight * 2, 100)}%`,
                          background: 'var(--blue)',
                          borderRadius: 'var(--radius-full)',
                        }} />
                      </div>
                      <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', letterSpacing: '-0.2px', minWidth: 32, textAlign: 'right' }}>
                        {h.weight}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: h.retPos ? 'var(--green)' : 'var(--red)',
                      letterSpacing: '-0.3px',
                    }}>
                      {h.retPos ? '+' : ''}{h.ret}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: strategy + performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
        {/* Strategy explanation */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          padding: '20px',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: 12 }}>
            About your strategy
          </h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', letterSpacing: '-0.3px', lineHeight: 1.65, marginBottom: 16 }}>
            Your Balanced Growth Portfolio is designed by QFL&apos;s quantitative engine to maximize risk-adjusted returns over a long time horizon. It diversifies across asset classes using factor-based weighting, minimizing concentration risk while capturing equity market premiums.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Quarterly rebalancing to target weights',
              'Tax-loss harvesting enabled',
              '0.25% annual management fee',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--green-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13.5, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance vs benchmark */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px' }}>
              2-Year Performance
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 2, background: 'var(--blue)', borderRadius: 1 }} />
                <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', letterSpacing: '-0.2px' }}>Your portfolio</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 2, background: 'var(--text-tertiary)', borderRadius: 1, opacity: 0.7 }} />
                <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', letterSpacing: '-0.2px' }}>S&amp;P 500</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={PERF_DATA} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10.5, fill: 'var(--text-tertiary)' }}
                axisLine={false}
                tickLine={false}
                interval={4}
                dy={5}
              />
              <YAxis
                tick={{ fontSize: 10.5, fill: 'var(--text-tertiary)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={40}
                domain={[90, 165]}
              />
              <Tooltip content={<PerfTooltip />} />
              <Line
                type="monotone"
                dataKey="portfolio"
                name="Your portfolio"
                stroke="var(--blue)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--blue)', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="sp500"
                name="S&P 500"
                stroke="var(--text-tertiary)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={false}
                activeDot={{ r: 3, fill: 'var(--text-tertiary)', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div style={{
            marginTop: 12,
            padding: '10px 12px',
            background: 'var(--blue-light)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 12.5, color: 'var(--blue)', letterSpacing: '-0.2px', fontWeight: 500 }}>
              Outperforming S&amp;P 500 by 7.8%
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '-0.2px' }}>
              Over 2 years
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
