import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Alert } from '../common/Alert'
import { useAuth } from '../../contexts/AuthContext'

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        name
        emailVerified
        createdAt
        updatedAt
      }
    }
  }
`

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION)

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation({
        variables: { input: data },
      })

      const { accessToken, refreshToken, user } = result.data.login
      login(accessToken, refreshToken, user)
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by Apollo
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
