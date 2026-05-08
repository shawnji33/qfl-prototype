import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

// 12 months of mock data — upward trend with realistic volatility
const ALL_DATA = {
  '1M': [
    { date: 'Apr 7', value: 124820 },
    { date: 'Apr 10', value: 125340 },
    { date: 'Apr 13', value: 124190 },
    { date: 'Apr 17', value: 125810 },
    { date: 'Apr 21', value: 126340 },
    { date: 'Apr 24', value: 125970 },
    { date: 'Apr 28', value: 126880 },
    { date: 'May 1', value: 126410 },
    { date: 'May 5', value: 127432 },
  ],
  '3M': [
    { date: 'Feb', value: 119440 },
    { date: 'Feb 15', value: 121200 },
    { date: 'Mar 1', value: 120580 },
    { date: 'Mar 15', value: 122890 },
    { date: 'Apr 1', value: 123410 },
    { date: 'Apr 15', value: 125340 },
    { date: 'May 1', value: 126410 },
    { date: 'May 5', value: 127432 },
  ],
  '6M': [
    { date: 'Nov', value: 112800 },
    { date: 'Dec', value: 114200 },
    { date: 'Jan', value: 116500 },
    { date: 'Feb', value: 119440 },
    { date: 'Mar', value: 122100 },
    { date: 'Apr', value: 125340 },
    { date: 'May', value: 127432 },
  ],
  'YTD': [
    { date: 'Jan 1', value: 113900 },
    { date: 'Jan 15', value: 115200 },
    { date: 'Feb 1', value: 117800 },
    { date: 'Feb 15', value: 119440 },
    { date: 'Mar 1', value: 120580 },
    { date: 'Mar 15', value: 122890 },
    { date: 'Apr 1', value: 124100 },
    { date: 'Apr 15', value: 125600 },
    { date: 'May 1', value: 126410 },
    { date: 'May 5', value: 127432 },
  ],
  '1Y': [
    { date: 'May 23', value: 99210 },
    { date: 'Jun', value: 101540 },
    { date: 'Jul', value: 104800 },
    { date: 'Aug', value: 103200 },
    { date: 'Sep', value: 106500 },
    { date: 'Oct', value: 109700 },
    { date: 'Nov', value: 112800 },
    { date: 'Dec', value: 114200 },
    { date: 'Jan', value: 116500 },
    { date: 'Feb', value: 119440 },
    { date: 'Mar', value: 122100 },
    { date: 'Apr', value: 125340 },
    { date: 'May 24', value: 127432 },
  ],
  'All': [
    { date: 'Jan 23', value: 50000 },
    { date: 'Apr 23', value: 55800 },
    { date: 'Jul 23', value: 63200 },
    { date: 'Oct 23', value: 72400 },
    { date: 'Jan 24', value: 82100 },
    { date: 'Apr 24', value: 88600 },
    { date: 'Jul 24', value: 96300 },
    { date: 'Oct 24', value: 104500 },
    { date: 'Jan 25', value: 113900 },
    { date: 'Apr 25', value: 120400 },
    { date: 'May 25', value: 127432 },
  ],
}

const RANGES = ['1M', '3M', '6M', 'YTD', '1Y', 'All']

const ALLOCATIONS = [
  { label: 'US Equities', pct: 60, value: '$76,459', color: '#1B6FE8' },
  { label: 'International', pct: 20, value: '$25,486', color: '#0B1E3D' },
  { label: 'Bonds', pct: 15, value: '$19,115', color: '#0EA5C2' },
  { label: 'Alternatives', pct: 5, value: '$6,372', color: '#9DB0C8' },
]

const ACTIVITY = [
  {
    icon: '📈',
    title: 'Dividend received',
    sub: 'Vanguard S&P 500 ETF (VOO)',
    amount: '+$42.18',
    date: '2 days ago',
    positive: true,
  },
  {
    icon: '⚖️',
    title: 'Auto-rebalance',
    sub: 'Portfolio rebalanced to target allocation',
    amount: null,
    date: 'May 1, 2026',
    positive: null,
  },
  {
    icon: '💳',
    title: 'Monthly deposit',
    sub: 'Auto-invest from Chase Checking ····4821',
    amount: '+$500.00',
    date: 'Apr 30, 2026',
    positive: true,
  },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const val = payload[0].value
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: 'var(--shadow-sm)',
        fontSize: 13,
      }}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: 2, letterSpacing: '-0.2px' }}>{label}</div>
        <div style={{ fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.3px' }}>
          ${val.toLocaleString()}
        </div>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [range, setRange] = useState('1Y')
  const data = ALL_DATA[range]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '-0.3px', marginBottom: 4 }}>
          Total Portfolio Value
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 38, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px', lineHeight: 1 }}>
            $127,432.18
          </span>
          <span style={{
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--green)',
            letterSpacing: '-0.3px',
            background: 'var(--green-light)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
          }}>
            +$1,847.22 (1.47%) Today
          </span>
        </div>
      </div>

      {/* Performance chart */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: '20px 20px 16px',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px' }}>
            Portfolio Performance
          </h2>
          <div style={{ display: 'flex', gap: 4 }}>
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: '-0.2px',
                  background: range === r ? 'var(--navy)' : 'transparent',
                  color: range === r ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.12s',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A7F4B" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#1A7F4B" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11.5, fill: 'var(--text-tertiary)', letterSpacing: -0.2 }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              tick={{ fontSize: 11.5, fill: 'var(--text-tertiary)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1A7F4B"
              strokeWidth={2}
              fill="url(#greenGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#1A7F4B', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom grid: allocation + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Allocation */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          padding: '20px',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: 16 }}>
            Asset Allocation
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ALLOCATIONS.map((a) => (
              <div key={a.label}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{a.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '-0.2px' }}>{a.pct}%</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.3px', minWidth: 58, textAlign: 'right' }}>{a.value}</span>
                  </div>
                </div>
                <div style={{ height: 4, background: 'var(--bg)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${a.pct}%`,
                    background: a.color,
                    borderRadius: 'var(--radius-full)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          padding: '20px',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: 16 }}>
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {ACTIVITY.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '-0.2px', marginTop: 1 }}>
                    {item.sub}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {item.amount && (
                    <div style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: item.positive ? 'var(--green)' : 'var(--red)',
                      letterSpacing: '-0.3px',
                    }}>
                      {item.amount}
                    </div>
                  )}
                  <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', letterSpacing: '-0.2px', marginTop: 1 }}>
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Return', value: '+28.4%', sub: 'Since Jan 2023', positive: true },
          { label: 'Annualized Return', value: '+9.2%', sub: 'Avg per year', positive: true },
          { label: 'Since Inception', value: 'Jan 2023', sub: '~28 months', positive: null },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)',
              padding: '18px 20px',
            }}
          >
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', letterSpacing: '-0.2px', marginBottom: 6 }}>
              {m.label}
            </div>
            <div style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.6px',
              color: m.positive === true ? 'var(--green)' : m.positive === false ? 'var(--red)' : 'var(--navy)',
              lineHeight: 1,
              marginBottom: 4,
            }}>
              {m.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: '-0.2px' }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
