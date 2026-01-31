import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { useAuth } from '../contexts/AuthContext'

export function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to JWT Auth App
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A complete authentication system with JWT, email verification, and password reset.
        Built with React, GraphQL Yoga, and PostgreSQL.
      </p>

      <div className="flex justify-center gap-4">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Login</Button>
            </Link>
          </>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-4">🔐</div>
          <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
          <p className="text-gray-600 text-sm">
            JWT tokens with access and refresh token rotation for maximum security.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-4">📧</div>
          <h3 className="text-lg font-semibold mb-2">Email Verification</h3>
          <p className="text-gray-600 text-sm">
            Verify user emails with secure tokens and beautiful email templates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-4">🔄</div>
          <h3 className="text-lg font-semibold mb-2">Password Reset</h3>
          <p className="text-gray-600 text-sm">
            Complete password reset flow with time-limited tokens.
          </p>
        </div>
      </div>
    </div>
  )
}
