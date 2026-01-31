import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useSearchParams } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Alert } from '../common/Alert'

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD_MUTATION)

  if (!token) {
    return (
      <div className="max-w-md mx-auto">
        <Alert variant="error">
          Invalid or missing reset token. Please request a new password reset.
        </Alert>
        <div className="mt-4 text-center">
          <Link to="/forgot-password">
            <Button>Request New Reset</Button>
          </Link>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        variables: {
          input: {
            token,
            newPassword: data.newPassword,
          },
        },
      })
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
          <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
          <p className="text-gray-600 mb-6">
            Your password has been reset successfully. You can now login with your new password.
          </p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {error && (
          <Alert variant="error" className="mb-4">
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  )
}
