import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button } from '../common/Button'
import { Alert } from '../common/Alert'
import { Loading } from '../common/Loading'

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
      message
    }
  }
`

export function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid or missing verification token.')
      return
    }

    verifyEmail({ variables: { token } })
      .then((result) => {
        if (result.data?.verifyEmail?.success) {
          setStatus('success')
          setMessage('Your email has been verified successfully!')
        } else {
          setStatus('error')
          setMessage(result.data?.verifyEmail?.message || 'Verification failed.')
        }
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err.message || 'Verification failed.')
      })
  }, [token, verifyEmail])

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {status === 'success' ? (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
            <Alert variant="error" className="mb-6">
              {message}
            </Alert>
            <Link to="/login">
              <Button>Go to Login</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
