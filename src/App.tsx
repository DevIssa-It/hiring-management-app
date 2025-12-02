import { memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import { AuthRedirect } from './components/shared/AuthRedirect'
import { ErrorBoundary } from './components/shared/ErrorBoundary'
import { LoginPage } from './pages/LoginPage'
import { Unauthorized } from './pages/Unauthorized'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ManageJob } from './pages/admin/ManageJob'
import { ApplicantDashboard } from './pages/applicant/ApplicantDashboard'
import { Resume } from './pages/applicant/Resume'
import ApplicationSuccess from './pages/applicant/ApplicationSuccess'

/**
 * Main application component
 * Handles routing, authentication, and global providers
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Admin routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/job/:jobId/manage" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ManageJob />
                  </ProtectedRoute>
                } 
              />
              
              {/* Applicant routes */}
              <Route 
                path="/applicant" 
                element={
                  <ProtectedRoute requiredRole="applicant">
                    <ApplicantDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/applicant/job/:jobId" 
                element={
                  <ProtectedRoute requiredRole="applicant">
                    <Resume />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/applicant/success" 
                element={
                  <ProtectedRoute requiredRole="applicant">
                    <ApplicationSuccess />
                  </ProtectedRoute>
                } 
              />

              {/* Default and fallback routes */}
              <Route path="/" element={<ApplicantDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

// Memoize App component to prevent unnecessary re-renders
export default memo(App);
