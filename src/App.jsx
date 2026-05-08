import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import Onboarding from './screens/Onboarding.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Portfolio from './screens/Portfolio.jsx'
import Account from './screens/Account.jsx'
import Strategies from './screens/Strategies.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard"  element={<AppShell><Dashboard /></AppShell>} />
      <Route path="/portfolio"  element={<AppShell><Portfolio /></AppShell>} />
      <Route path="/strategies" element={<AppShell><Strategies /></AppShell>} />
      <Route path="/account"    element={<AppShell><Account /></AppShell>} />
    </Routes>
  )
}

export default App
