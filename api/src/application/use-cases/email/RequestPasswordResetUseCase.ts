import { PasswordReset } from '../../../domain/entities/PasswordReset.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IPasswordResetRepository } from '../../../domain/repositories/ITokenRepository.js'
import { IEmailService } from '../../interfaces/IEmailService.js'
import { MessagePayload } from '../../dtos/AuthDTO.js'

export class RequestPasswordResetUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordResetRepository: IPasswordResetRepository,
    private emailService: IEmailService
  ) {}

  async execute(email: string): Promise<MessagePayload> {
    // Always return success to prevent email enumeration
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      return {
        success: true,
        message: 'If an account exists, a password reset email has been sent',
      }
    }

    // Delete any existing tokens
    await this.passwordResetRepository.deleteByUserId(user.id)

    // Create new token
    const passwordReset = PasswordReset.create(user.id)
    await this.passwordResetRepository.save(passwordReset)

    await this.emailService.sendPasswordResetEmail(
      user.email,
      user.name,
      passwordReset.token
    )

    return {
      success: true,
      message: 'If an account exists, a password reset email has been sent',
    }
  }
}
