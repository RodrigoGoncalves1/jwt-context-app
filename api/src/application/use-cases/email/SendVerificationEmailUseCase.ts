import { VerificationToken } from '../../../domain/entities/VerificationToken.js'
import { UserNotFoundError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IVerificationTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { IEmailService } from '../../interfaces/IEmailService.js'
import { MessagePayload } from '../../dtos/AuthDTO.js'

export class SendVerificationEmailUseCase {
  constructor(
    private userRepository: IUserRepository,
    private verificationTokenRepository: IVerificationTokenRepository,
    private emailService: IEmailService
  ) {}

  async execute(userId: string): Promise<MessagePayload> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.emailVerified) {
      return {
        success: true,
        message: 'Email already verified',
      }
    }

    // Delete any existing tokens
    await this.verificationTokenRepository.deleteByUserId(userId)

    // Create new token
    const verificationToken = VerificationToken.create(userId)
    await this.verificationTokenRepository.save(verificationToken)

    await this.emailService.sendVerificationEmail(
      user.email,
      user.name,
      verificationToken.token
    )

    return {
      success: true,
      message: 'Verification email sent',
    }
  }
}
