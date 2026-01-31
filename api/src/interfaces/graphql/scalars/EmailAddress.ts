import { GraphQLScalarType, Kind } from 'graphql'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EmailAddressScalar = new GraphQLScalarType({
  name: 'EmailAddress',
  description: 'A valid email address',
  serialize(value: unknown): string {
    if (typeof value !== 'string') {
      throw new Error('EmailAddress cannot represent non-string type')
    }
    if (!EMAIL_REGEX.test(value)) {
      throw new Error(`Invalid email address: ${value}`)
    }
    return value.toLowerCase()
  },
  parseValue(value: unknown): string {
    if (typeof value !== 'string') {
      throw new Error('EmailAddress cannot represent non-string type')
    }
    if (!EMAIL_REGEX.test(value)) {
      throw new Error(`Invalid email address: ${value}`)
    }
    return value.toLowerCase()
  },
  parseLiteral(ast): string {
    if (ast.kind !== Kind.STRING) {
      throw new Error('EmailAddress cannot represent non-string type')
    }
    if (!EMAIL_REGEX.test(ast.value)) {
      throw new Error(`Invalid email address: ${ast.value}`)
    }
    return ast.value.toLowerCase()
  },
})
