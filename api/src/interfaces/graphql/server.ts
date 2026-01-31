import { createYoga } from 'graphql-yoga'
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
import { schema } from './schema.js'
import { createContext } from './context.js'
import { config } from '../../infrastructure/config/env.js'

export const yoga = createYoga({
  schema,
  context: ({ request }) => {
    // GraphQL Yoga uses Fetch API Request, we'll adapt it
    return createContext(request as any, {} as any)
  },
  graphqlEndpoint: '/graphql',
  landingPage: false,
  plugins: config.isProd ? [useDisableIntrospection()] : [],
  cors: {
    origin: config.appUrl,
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS'],
  },
})
