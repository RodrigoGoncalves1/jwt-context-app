import { InvalidTokenError, UserNotFoundError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IVerificationTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { MessagePayload } from '../../dtos/AuthDTO.js'

export class VerifyEmailUseCase {
  constructor(
    private userRepository: IUserRepository,
    private verificationTokenRepository: IVerificationTokenRepository
  ) {}

  async execute(token: string): Promise<MessagePayload> {
    const verificationToken = await this.verificationTokenRepository.findByToken(token)
    if (!verificationToken || !verificationToken.isValid()) {
      throw new InvalidTokenError()
    }

    const user = await this.userRepository.findById(verificationToken.userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    user.verifyEmail()
    await this.userRepository.update(user)
    await this.verificationTokenRepository.markAsUsed(token)

    return {
      success: true,
      message: 'Email verified successfully',
    }
  }
}
