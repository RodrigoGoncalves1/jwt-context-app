import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { ProtectedRoute } from './ProtectedRoute'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { ResetPassword } from '../pages/ResetPassword'
import { VerifyEmailPage } from '../pages/VerifyEmailPage'
import { Dashboard } from '../pages/Dashboard'

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}
