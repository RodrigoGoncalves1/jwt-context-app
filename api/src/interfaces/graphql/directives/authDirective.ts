import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { GraphQLSchema, defaultFieldResolver } from 'graphql'
import { UnauthorizedError } from '../../../domain/errors/DomainError.js'
import { GraphQLContext } from '../context.js'

export function authDirectiveTransformer(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0]

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        fieldConfig.resolve = async function (source, args, context: GraphQLContext, info) {
          if (!context.user) {
            throw new UnauthorizedError()
          }
          return resolve(source, args, context, info)
        }
      }

      return fieldConfig
    },
  })
}
