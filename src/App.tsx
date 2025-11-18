import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import { AuthRedirect } from './components/shared/AuthRedirect'
import { LoginPage } from './pages/LoginPage'
import { Unauthorized } from './pages/Unauthorized'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ManageJob } from './pages/admin/ManageJob'
import { ApplicantDashboard } from './pages/applicant/ApplicantDashboard'
import { Resume } from './pages/applicant/Resume'
import ApplicationSuccess from './pages/applicant/ApplicationSuccess'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/job/:jobId/manage" element={
              <ProtectedRoute requiredRole="admin">
                <ManageJob />
              </ProtectedRoute>
            } />
            
            <Route path="/applicant" element={
              <ProtectedRoute requiredRole="applicant">
                <ApplicantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/applicant/job/:jobId" element={
              <ProtectedRoute requiredRole="applicant">
                <Resume />
              </ProtectedRoute>
            } />
            <Route path="/applicant/success" element={
              <ProtectedRoute requiredRole="applicant">
                <ApplicationSuccess />
              </ProtectedRoute>
            } />

            <Route path="/" element={<AuthRedirect />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
