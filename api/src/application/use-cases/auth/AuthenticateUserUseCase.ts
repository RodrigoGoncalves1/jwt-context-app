import { RefreshToken } from '../../../domain/entities/RefreshToken.js'
import { InvalidCredentialsError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IRefreshTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { IHashService } from '../../interfaces/IHashService.js'
import { IJwtService } from '../../interfaces/IJwtService.js'
import { LoginInput, AuthPayload } from '../../dtos/AuthDTO.js'

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private hashService: IHashService,
    private jwtService: IJwtService
  ) {}

  async execute(input: LoginInput): Promise<AuthPayload> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordValid = await this.hashService.compare(input.password, user.password)
    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    const jwtPayload = { userId: user.id, email: user.email }
    const accessToken = this.jwtService.generateAccessToken(jwtPayload)

    const refreshTokenEntity = RefreshToken.create(user.id)
    await this.refreshTokenRepository.save(refreshTokenEntity)

    return {
      accessToken,
      refreshToken: refreshTokenEntity.token,
      user: user.toDTO(),
    }
  }
}
