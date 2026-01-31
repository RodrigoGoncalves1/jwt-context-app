import { UserNotFoundError } from '../../../domain/errors/DomainError.js'
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js'
import { UserDTO } from '../../dtos/AuthDTO.js'

export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    return user.toDTO()
  }
}
