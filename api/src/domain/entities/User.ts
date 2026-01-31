import { Email } from '../value-objects/Email.js'
import { Password } from '../value-objects/Password.js'
import { UserId } from '../value-objects/UserId.js'

export interface UserProps {
  id: UserId
  email: Email
  password: Password
  name: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  email: string
  password: string
  name: string
}

export class User {
  private constructor(private props: UserProps) {}

  static create(input: CreateUserInput): User {
    const now = new Date()
    return new User({
      id: UserId.create(),
      email: Email.create(input.email),
      password: Password.create(input.password),
      name: input.name.trim(),
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    })
  }

  static fromPersistence(data: {
    id: string
    email: string
    password: string
    name: string
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
  }): User {
    return new User({
      id: UserId.fromString(data.id),
      email: Email.create(data.email),
      password: Password.fromHashed(data.password),
      name: data.name,
      emailVerified: data.emailVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  get id(): string {
    return this.props.id.getValue()
  }

  get email(): string {
    return this.props.email.getValue()
  }

  get password(): string {
    return this.props.password.getValue()
  }

  get name(): string {
    return this.props.name
  }

  get emailVerified(): boolean {
    return this.props.emailVerified
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  isPasswordHashed(): boolean {
    return this.props.password.isAlreadyHashed()
  }

  verifyEmail(): void {
    this.props.emailVerified = true
    this.props.updatedAt = new Date()
  }

  updatePassword(newPassword: Password): void {
    this.props.password = newPassword
    this.props.updatedAt = new Date()
  }

  toDTO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
