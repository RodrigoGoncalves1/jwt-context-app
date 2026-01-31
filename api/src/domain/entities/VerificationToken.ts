import { v4 as uuidv4 } from 'uuid'

export interface VerificationTokenProps {
  id: string
  token: string
  userId: string
  expiresAt: Date
  createdAt: Date
  used: boolean
}

export class VerificationToken {
  private constructor(private props: VerificationTokenProps) {}

  static create(userId: string, expiresInHours: number = 24): VerificationToken {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000)

    return new VerificationToken({
      id: uuidv4(),
      token: uuidv4(),
      userId,
      expiresAt,
      createdAt: now,
      used: false,
    })
  }

  static fromPersistence(data: VerificationTokenProps): VerificationToken {
    return new VerificationToken(data)
  }

  get id(): string {
    return this.props.id
  }

  get token(): string {
    return this.props.token
  }

  get userId(): string {
    return this.props.userId
  }

  get expiresAt(): Date {
    return this.props.expiresAt
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get used(): boolean {
    return this.props.used
  }

  isExpired(): boolean {
    return new Date() > this.props.expiresAt
  }

  isValid(): boolean {
    return !this.used && !this.isExpired()
  }

  markAsUsed(): void {
    this.props.used = true
  }
}
