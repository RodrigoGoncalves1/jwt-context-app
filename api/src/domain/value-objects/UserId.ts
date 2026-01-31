import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

export class UserId {
  private readonly value: string

  private constructor(id: string) {
    this.value = id
  }

  static create(): UserId {
    return new UserId(uuidv4())
  }

  static fromString(id: string): UserId {
    if (!uuidValidate(id)) {
      throw new Error(`Invalid user ID format: ${id}`)
    }
    return new UserId(id)
  }

  getValue(): string {
    return this.value
  }

  equals(other: UserId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
