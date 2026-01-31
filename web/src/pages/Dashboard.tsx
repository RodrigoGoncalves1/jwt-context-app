import { useQuery, useMutation, gql } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/common/Button'
import { Alert } from '../components/common/Alert'
import { Loading } from '../components/common/Loading'

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      emailVerified
      createdAt
      updatedAt
    }
  }
`

const RESEND_VERIFICATION_MUTATION = gql`
  mutation ResendVerificationEmail {
    resendVerificationEmail {
      success
      message
    }
  }
`

export function Dashboard() {
  const { updateUser } = useAuth()
  const { data, loading, error, refetch } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      if (data.me) {
        updateUser(data.me)
      }
    },
  })

  const [resendVerification, { loading: resending }] = useMutation(RESEND_VERIFICATION_MUTATION)

  if (loading) return <Loading />

  if (error) {
    return (
      <Alert variant="error">
        Error loading user data: {error.message}
      </Alert>
    )
  }

  const user = data?.me

  const handleResendVerification = async () => {
    try {
      await resendVerification()
      alert('Verification email sent!')
    } catch (err) {
      alert('Failed to send verification email')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {!user?.emailVerified && (
        <Alert variant="warning" className="mb-6">
          <div className="flex items-center justify-between">
            <span>Your email is not verified. Please check your inbox.</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleResendVerification}
              isLoading={resending}
            >
              Resend Email
            </Button>
          </div>
        </Alert>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-lg">{user?.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-lg flex items-center gap-2">
              {user?.email}
              {user?.emailVerified ? (
                <span className="text-green-500 text-sm">✓ Verified</span>
              ) : (
                <span className="text-yellow-500 text-sm">⚠ Not verified</span>
              )}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Member since</label>
            <p className="text-lg">
              {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
