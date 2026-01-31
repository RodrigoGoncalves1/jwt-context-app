import { GraphQLContext } from '../../context.js'
import { DateTimeScalar } from '../../scalars/DateTime.js'
import { EmailAddressScalar } from '../../scalars/EmailAddress.js'
import { RegisterUserUseCase } from '../../../../application/use-cases/auth/RegisterUserUseCase.js'
import { AuthenticateUserUseCase } from '../../../../application/use-cases/auth/AuthenticateUserUseCase.js'
import { RefreshTokenUseCase } from '../../../../application/use-cases/auth/RefreshTokenUseCase.js'
import { LogoutUseCase } from '../../../../application/use-cases/auth/LogoutUseCase.js'
import { VerifyEmailUseCase } from '../../../../application/use-cases/email/VerifyEmailUseCase.js'
import { SendVerificationEmailUseCase } from '../../../../application/use-cases/email/SendVerificationEmailUseCase.js'
import { RequestPasswordResetUseCase } from '../../../../application/use-cases/email/RequestPasswordResetUseCase.js'
import { ResetPasswordUseCase } from '../../../../application/use-cases/email/ResetPasswordUseCase.js'
import { GetCurrentUserUseCase } from '../../../../application/use-cases/user/GetCurrentUserUseCase.js'

interface RegisterInput {
  email: string
  password: string
  name: string
}

interface LoginInput {
  email: string
  password: string
}

interface ResetPasswordInput {
  token: string
  newPassword: string
}

export const resolvers = {
  DateTime: DateTimeScalar,
  EmailAddress: EmailAddressScalar,

  Query: {
    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const useCase = new GetCurrentUserUseCase(context.repositories.user)
      return useCase.execute(context.user!.userId)
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      { input }: { input: RegisterInput },
      context: GraphQLContext
    ) => {
      const useCase = new RegisterUserUseCase(
        context.repositories.user,
        context.repositories.verificationToken,
        context.services.hash,
        context.services.email
      )
      const user = await useCase.execute(input)

      // Auto-login after registration
      const authUseCase = new AuthenticateUserUseCase(
        context.repositories.user,
        context.repositories.refreshToken,
        context.services.hash,
        context.services.jwt
      )
      return authUseCase.execute({ email: input.email, password: input.password })
    },

    login: async (
      _: unknown,
      { input }: { input: LoginInput },
      context: GraphQLContext
    ) => {
      const useCase = new AuthenticateUserUseCase(
        context.repositories.user,
        context.repositories.refreshToken,
        context.services.hash,
        context.services.jwt
      )
      return useCase.execute(input)
    },

    refreshToken: async (
      _: unknown,
      { token }: { token: string },
      context: GraphQLContext
    ) => {
      const useCase = new RefreshTokenUseCase(
        context.repositories.user,
        context.repositories.refreshToken,
        context.services.jwt
      )
      return useCase.execute(token)
    },

    logout: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const useCase = new LogoutUseCase(context.repositories.refreshToken)
      return useCase.execute(context.user!.userId)
    },

    verifyEmail: async (
      _: unknown,
      { token }: { token: string },
      context: GraphQLContext
    ) => {
      const useCase = new VerifyEmailUseCase(
        context.repositories.user,
        context.repositories.verificationToken
      )
      return useCase.execute(token)
    },

    resendVerificationEmail: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      const useCase = new SendVerificationEmailUseCase(
        context.repositories.user,
        context.repositories.verificationToken,
        context.services.email
      )
      return useCase.execute(context.user!.userId)
    },

    requestPasswordReset: async (
      _: unknown,
      { email }: { email: string },
      context: GraphQLContext
    ) => {
      const useCase = new RequestPasswordResetUseCase(
        context.repositories.user,
        context.repositories.passwordReset,
        context.services.email
      )
      return useCase.execute(email)
    },

    resetPassword: async (
      _: unknown,
      { input }: { input: ResetPasswordInput },
      context: GraphQLContext
    ) => {
      const useCase = new ResetPasswordUseCase(
        context.repositories.user,
        context.repositories.passwordReset,
        context.repositories.refreshToken,
        context.services.hash
      )
      return useCase.execute(input.token, input.newPassword)
    },
  },
}
