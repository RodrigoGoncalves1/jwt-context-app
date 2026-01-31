import { RefreshToken } from '../../domain/entities/RefreshToken.js'
import { VerificationToken } from '../../domain/entities/VerificationToken.js'
import { PasswordReset } from '../../domain/entities/PasswordReset.js'
import {
  IRefreshTokenRepository,
  IVerificationTokenRepository,
  IPasswordResetRepository,
} from '../../domain/repositories/ITokenRepository.js'
import { prisma } from '../database/PrismaClient.js'

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async findByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findUnique({ where: { token } })
    if (!refreshToken) return null
    return RefreshToken.fromPersistence(refreshToken)
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const tokens = await prisma.refreshToken.findMany({ where: { userId } })
    return tokens.map((t) => RefreshToken.fromPersistence(t))
  }

  async save(token: RefreshToken): Promise<RefreshToken> {
    const saved = await prisma.refreshToken.create({
      data: {
        id: token.id,
        token: token.token,
        userId: token.userId,
        expiresAt: token.expiresAt,
        revoked: token.revoked,
      },
    })
    return RefreshToken.fromPersistence(saved)
  }

  async revoke(token: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    })
  }

  async revokeAllByUserId(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    })
  }

  async deleteExpired(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    })
  }
}

export class PrismaVerificationTokenRepository implements IVerificationTokenRepository {
  async findByToken(token: string): Promise<VerificationToken | null> {
    const verificationToken = await prisma.verificationToken.findUnique({ where: { token } })
    if (!verificationToken) return null
    return VerificationToken.fromPersistence(verificationToken)
  }

  async findByUserId(userId: string): Promise<VerificationToken[]> {
    const tokens = await prisma.verificationToken.findMany({ where: { userId } })
    return tokens.map((t) => VerificationToken.fromPersistence(t))
  }

  async save(token: VerificationToken): Promise<VerificationToken> {
    const saved = await prisma.verificationToken.create({
      data: {
        id: token.id,
        token: token.token,
        userId: token.userId,
        expiresAt: token.expiresAt,
        used: token.used,
      },
    })
    return VerificationToken.fromPersistence(saved)
  }

  async markAsUsed(token: string): Promise<void> {
    await prisma.verificationToken.update({
      where: { token },
      data: { used: true },
    })
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.verificationToken.deleteMany({ where: { userId } })
  }

  async deleteExpired(): Promise<void> {
    await prisma.verificationToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    })
  }
}

export class PrismaPasswordResetRepository implements IPasswordResetRepository {
  async findByToken(token: string): Promise<PasswordReset | null> {
    const passwordReset = await prisma.passwordReset.findUnique({ where: { token } })
    if (!passwordReset) return null
    return PasswordReset.fromPersistence(passwordReset)
  }

  async findByUserId(userId: string): Promise<PasswordReset[]> {
    const tokens = await prisma.passwordReset.findMany({ where: { userId } })
    return tokens.map((t) => PasswordReset.fromPersistence(t))
  }

  async save(token: PasswordReset): Promise<PasswordReset> {
    const saved = await prisma.passwordReset.create({
      data: {
        id: token.id,
        token: token.token,
        userId: token.userId,
        expiresAt: token.expiresAt,
        used: token.used,
      },
    })
    return PasswordReset.fromPersistence(saved)
  }

  async markAsUsed(token: string): Promise<void> {
    await prisma.passwordReset.update({
      where: { token },
      data: { used: true },
    })
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.passwordReset.deleteMany({ where: { userId } })
  }

  async deleteExpired(): Promise<void> {
    await prisma.passwordReset.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    })
  }
}
