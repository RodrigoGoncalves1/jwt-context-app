import { Password } from '../../../domain/value-objects/Password.js'
import { InvalidTokenError, UserNotFoundError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IPasswordResetRepository, IRefreshTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { IHashService } from '../../interfaces/IHashService.js'
import { MessagePayload } from '../../dtos/AuthDTO.js'

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordResetRepository: IPasswordResetRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private hashService: IHashService
  ) {}

  async execute(token: string, newPassword: string): Promise<MessagePayload> {
    const passwordReset = await this.passwordResetRepository.findByToken(token)
    if (!passwordReset || !passwordReset.isValid()) {
      throw new InvalidTokenError()
    }

    const user = await this.userRepository.findById(passwordReset.userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    // Validate new password
    const password = Password.create(newPassword)
    const hashedPassword = await this.hashService.hash(password.getValue())

    user.updatePassword(Password.fromHashed(hashedPassword))
    await this.userRepository.update(user)

    // Mark token as used
    await this.passwordResetRepository.markAsUsed(token)

    // Revoke all refresh tokens (security measure)
    await this.refreshTokenRepository.revokeAllByUserId(user.id)

    return {
      success: true,
      message: 'Password reset successfully',
    }
  }
}
