import { RefreshToken } from '../../../domain/entities/RefreshToken.js'
import { InvalidTokenError, UserNotFoundError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IRefreshTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { IJwtService } from '../../interfaces/IJwtService.js'
import { AuthPayload } from '../../dtos/AuthDTO.js'

export class RefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private jwtService: IJwtService
  ) {}

  async execute(token: string): Promise<AuthPayload> {
    const refreshToken = await this.refreshTokenRepository.findByToken(token)
    if (!refreshToken || !refreshToken.isValid()) {
      throw new InvalidTokenError()
    }

    const user = await this.userRepository.findById(refreshToken.userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    // Revoke old refresh token (rotation)
    await this.refreshTokenRepository.revoke(token)

    // Generate new tokens
    const jwtPayload = { userId: user.id, email: user.email }
    const accessToken = this.jwtService.generateAccessToken(jwtPayload)

    const newRefreshToken = RefreshToken.create(user.id)
    await this.refreshTokenRepository.save(newRefreshToken)

    return {
      accessToken,
      refreshToken: newRefreshToken.token,
      user: user.toDTO(),
    }
  }
}
