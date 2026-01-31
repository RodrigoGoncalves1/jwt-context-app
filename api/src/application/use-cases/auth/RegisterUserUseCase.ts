import { User } from '../../../domain/entities/User.js'
import { VerificationToken } from '../../../domain/entities/VerificationToken.js'
import { UserAlreadyExistsError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { IVerificationTokenRepository } from '../../../domain/repositories/ITokenRepository.js'
import { IHashService } from '../../interfaces/IHashService.js'
import { IEmailService } from '../../interfaces/IEmailService.js'
import { RegisterInput, UserDTO } from '../../dtos/AuthDTO.js'

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private verificationTokenRepository: IVerificationTokenRepository,
    private hashService: IHashService,
    private emailService: IEmailService
  ) {}

  async execute(input: RegisterInput): Promise<UserDTO> {
    const existingUser = await this.userRepository.findByEmail(input.email)
    if (existingUser) {
      throw new UserAlreadyExistsError(input.email)
    }

    const user = User.create(input)
    const hashedPassword = await this.hashService.hash(user.password)

    const userToSave = User.fromPersistence({
      id: user.id,
      email: user.email,
      password: hashedPassword,
      name: user.name,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })

    const savedUser = await this.userRepository.save(userToSave)

    const verificationToken = VerificationToken.create(savedUser.id)
    await this.verificationTokenRepository.save(verificationToken)

    await this.emailService.sendVerificationEmail(
      savedUser.email,
      savedUser.name,
      verificationToken.token
    )

    return savedUser.toDTO()
  }
}
