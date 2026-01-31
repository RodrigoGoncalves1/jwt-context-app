import { InvalidPasswordError } from '../errors/DomainError.js'

export class Password {
  private readonly value: string
  private readonly isHashed: boolean

  private constructor(password: string, isHashed: boolean) {
    this.value = password
    this.isHashed = isHashed
  }

  static create(password: string): Password {
    Password.validate(password)
    return new Password(password, false)
  }

  static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword, true)
  }

  private static validate(password: string): void {
    if (password.length < 8) {
      throw new InvalidPasswordError('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
      throw new InvalidPasswordError('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      throw new InvalidPasswordError('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      throw new InvalidPasswordError('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new InvalidPasswordError('Password must contain at least one special character')
    }
  }

  getValue(): string {
    return this.value
  }

  isAlreadyHashed(): boolean {
    return this.isHashed
  }
}
