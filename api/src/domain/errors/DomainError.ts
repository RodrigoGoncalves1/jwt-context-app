export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message)
    this.name = 'DomainError'
  }
}

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`Invalid email format: ${email}`, 'INVALID_EMAIL')
  }
}

export class InvalidPasswordError extends DomainError {
  constructor(message: string) {
    super(message, 'INVALID_PASSWORD')
  }
}

export class UserNotFoundError extends DomainError {
  constructor() {
    super('User not found', 'USER_NOT_FOUND')
  }
}

export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`User with email ${email} already exists`, 'USER_ALREADY_EXISTS')
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid email or password', 'INVALID_CREDENTIALS')
  }
}

export class EmailNotVerifiedError extends DomainError {
  constructor() {
    super('Email not verified', 'EMAIL_NOT_VERIFIED')
  }
}

export class InvalidTokenError extends DomainError {
  constructor() {
    super('Invalid or expired token', 'INVALID_TOKEN')
  }
}

export class TokenExpiredError extends DomainError {
  constructor() {
    super('Token has expired', 'TOKEN_EXPIRED')
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super('Unauthorized', 'UNAUTHORIZED')
  }
}
