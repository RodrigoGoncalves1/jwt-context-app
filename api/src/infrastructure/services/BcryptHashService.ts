import bcrypt from 'bcryptjs'
import { IHashService } from '../../application/interfaces/IHashService.js'

export class BcryptHashService implements IHashService {
  private readonly saltRounds = 12

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds)
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue)
  }
}
