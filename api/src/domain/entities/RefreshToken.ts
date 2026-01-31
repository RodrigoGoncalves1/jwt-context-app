import { v4 as uuidv4 } from 'uuid'

export interface RefreshTokenProps {
  id: string
  token: string
  userId: string
  expiresAt: Date
  createdAt: Date
  revoked: boolean
}

export class RefreshToken {
  private constructor(private props: RefreshTokenProps) {}

  static create(userId: string, expiresInDays: number = 7): RefreshToken {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000)

    return new RefreshToken({
      id: uuidv4(),
      token: uuidv4(),
      userId,
      expiresAt,
      createdAt: now,
      revoked: false,
    })
  }

  static fromPersistence(data: RefreshTokenProps): RefreshToken {
    return new RefreshToken(data)
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

  get revoked(): boolean {
    return this.props.revoked
  }

  isExpired(): boolean {
    return new Date() > this.props.expiresAt
  }

  isValid(): boolean {
    return !this.revoked && !this.isExpired()
  }

  revoke(): void {
    this.props.revoked = true
  }
}
