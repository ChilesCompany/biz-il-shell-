import { Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from '@/components/layout/AuthProvider'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import AppLayout      from '@/components/layout/AppLayout'
import LoginPage      from '@/pages/LoginPage'
import DashboardPage  from '@/pages/DashboardPage'
import PipelinePage   from '@/pages/PipelinePage'
import BriefingPage   from '@/pages/BriefingPage'
import ClientsPage    from '@/pages/ClientsPage'
import DealsPage      from '@/pages/DealsPage'
import ProposalsPage  from '@/pages/ProposalsPage'
import MeetingsPage   from '@/pages/MeetingsPage'
import KatanaPage     from '@/pages/KatanaPage'
import AgentsPage     from '@/pages/AgentsPage'
import KnowledgePage  from '@/pages/KnowledgePage'
import SettingsPage   from '@/pages/SettingsPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"  element={<DashboardPage />} />
          <Route path="pipeline"   element={<PipelinePage />} />
          <Route path="briefing"   element={<BriefingPage />} />
          <Route path="clients"    element={<ClientsPage />} />
          <Route path="deals"      element={<DealsPage />} />
          <Route path="proposals"  element={<ProposalsPage />} />
          <Route path="meetings"   element={<MeetingsPage />} />
          <Route path="katana"     element={<KatanaPage />} />
          <Route path="agents"     element={<AgentsPage />} />
          <Route path="knowledge"  element={<KnowledgePage />} />
          <Route path="settings"   element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
