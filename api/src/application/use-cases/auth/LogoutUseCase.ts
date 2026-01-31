import { IRefreshTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { MessagePayload } from '../../dtos/AuthDTO.js'

export class LogoutUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(userId: string): Promise<MessagePayload> {
    await this.refreshTokenRepository.revokeAllByUserId(userId)

    return {
      success: true,
      message: 'Logged out successfully',
    }
  }
}
