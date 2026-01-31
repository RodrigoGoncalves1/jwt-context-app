import { User } from '../../domain/entities/User.js'
import { IUserRepository } from '../../domain/repositories/IUserRepository.js'
import { prisma } from '../database/PrismaClient.js'

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return null
    return User.fromPersistence(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) return null
    return User.fromPersistence(user)
  }

  async save(user: User): Promise<User> {
    const savedUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        emailVerified: user.emailVerified,
      },
    })
    return User.fromPersistence(savedUser)
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        emailVerified: user.emailVerified,
        updatedAt: new Date(),
      },
    })
    return User.fromPersistence(updatedUser)
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
