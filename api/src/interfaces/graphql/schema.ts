import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './schema/typeDefs/index.js'
import { resolvers } from './schema/resolvers/index.js'
import { authDirectiveTransformer } from './directives/authDirective.js'

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Apply directives
schema = authDirectiveTransformer(schema)

export { schema }
