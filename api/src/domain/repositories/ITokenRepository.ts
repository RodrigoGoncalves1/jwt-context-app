import { RefreshToken } from '../entities/RefreshToken.js'
import { VerificationToken } from '../entities/VerificationToken.js'
import { PasswordReset } from '../entities/PasswordReset.js'

export interface IRefreshTokenRepository {
  findByToken(token: string): Promise<RefreshToken | null>
  findByUserId(userId: string): Promise<RefreshToken[]>
  save(token: RefreshToken): Promise<RefreshToken>
  revoke(token: string): Promise<void>
  revokeAllByUserId(userId: string): Promise<void>
  deleteExpired(): Promise<void>
}

export interface IVerificationTokenRepository {
  findByToken(token: string): Promise<VerificationToken | null>
  findByUserId(userId: string): Promise<VerificationToken[]>
  save(token: VerificationToken): Promise<VerificationToken>
  markAsUsed(token: string): Promise<void>
  deleteByUserId(userId: string): Promise<void>
  deleteExpired(): Promise<void>
}

export interface IPasswordResetRepository {
  findByToken(token: string): Promise<PasswordReset | null>
  findByUserId(userId: string): Promise<PasswordReset[]>
  save(token: PasswordReset): Promise<PasswordReset>
  markAsUsed(token: string): Promise<void>
  deleteByUserId(userId: string): Promise<void>
  deleteExpired(): Promise<void>
}
