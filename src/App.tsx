import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { LoginPage } from './pages/LoginPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ManageJob } from './pages/admin/ManageJob'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/job/:jobId/manage" element={<ManageJob />} />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
