import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Alert } from '../common/Alert'

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordReset($email: EmailAddress!) {
    requestPasswordReset(email: $email) {
      success
      message
    }
  }
`

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const [requestReset, { loading, error }] = useMutation(REQUEST_PASSWORD_RESET_MUTATION)

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await requestReset({ variables: { email: data.email } })
      setSubmitted(true)
    } catch (err) {
      // Error is handled by Apollo
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <p className="text-gray-600 mb-6">
            If an account exists with that email, we've sent you a password reset link.
          </p>
          <Link to="/login">
            <Button variant="outline">Back to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {error && (
          <Alert variant="error" className="mb-4">
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            Send Reset Link
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
