import { GraphQLScalarType, Kind } from 'graphql'

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A date-time string at UTC, such as 2019-12-03T09:54:33Z',
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString()
    }
    throw new Error('DateTime cannot represent non-Date type')
  },
  parseValue(value: unknown): Date {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value)
    }
    throw new Error('DateTime cannot represent non-string/number type')
  },
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return new Date(ast.kind === Kind.INT ? parseInt(ast.value, 10) : ast.value)
    }
    throw new Error('DateTime cannot represent non-string/int type')
  },
})
