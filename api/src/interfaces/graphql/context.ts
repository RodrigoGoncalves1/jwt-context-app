import { FastifyRequest, FastifyReply } from 'fastify'
import { JwtService } from '../../infrastructure/services/JwtService.js'
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository.js'
import {
  PrismaRefreshTokenRepository,
  PrismaVerificationTokenRepository,
  PrismaPasswordResetRepository,
} from '../../infrastructure/repositories/PrismaTokenRepository.js'
import { BcryptHashService } from '../../infrastructure/services/BcryptHashService.js'
import { NodemailerEmailService } from '../../infrastructure/services/NodemailerEmailService.js'
import { JwtPayload } from '../../application/interfaces/IJwtService.js'

// Repositories
const userRepository = new PrismaUserRepository()
const refreshTokenRepository = new PrismaRefreshTokenRepository()
const verificationTokenRepository = new PrismaVerificationTokenRepository()
const passwordResetRepository = new PrismaPasswordResetRepository()

// Services
const jwtService = new JwtService()
const hashService = new BcryptHashService()
const emailService = new NodemailerEmailService()

export interface GraphQLContext {
  req: FastifyRequest
  res: FastifyReply
  user: JwtPayload | null
  repositories: {
    user: typeof userRepository
    refreshToken: typeof refreshTokenRepository
    verificationToken: typeof verificationTokenRepository
    passwordReset: typeof passwordResetRepository
  }
  services: {
    jwt: typeof jwtService
    hash: typeof hashService
    email: typeof emailService
  }
}

export async function createContext(req: FastifyRequest, res: FastifyReply): Promise<GraphQLContext> {
  let user: JwtPayload | null = null

  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    user = jwtService.verifyAccessToken(token)
  }

  return {
    req,
    res,
    user,
    repositories: {
      user: userRepository,
      refreshToken: refreshTokenRepository,
      verificationToken: verificationTokenRepository,
      passwordReset: passwordResetRepository,
    },
    services: {
      jwt: jwtService,
      hash: hashService,
      email: emailService,
    },
  }
}
