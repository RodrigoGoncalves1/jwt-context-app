import Fastify from 'fastify'
import cors from '@fastify/cors'
import { createYoga } from 'graphql-yoga'
import { schema } from './interfaces/graphql/schema.js'
import { createContext } from './interfaces/graphql/context.js'
import { connectDatabase } from './infrastructure/database/PrismaClient.js'
import { config } from './infrastructure/config/env.js'

async function main() {
  const app = Fastify({ logger: true })

  // CORS
  await app.register(cors, {
    origin: [config.appUrl, 'https://jwt-context-web.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })

  // GraphQL Yoga
  const yoga = createYoga({
    schema,
    context: async ({ request }) => {
      // Adapt request for Fastify
      const authHeader = request.headers.get('authorization')
      const mockReq = { headers: { authorization: authHeader } }
      return createContext(mockReq as any, {} as any)
    },
    graphqlEndpoint: '/graphql',
    landingPage: false,
  })

  // Bind GraphQL Yoga to Fastify
  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await yoga.handle(
        new Request(`http://localhost:${config.port}${req.url}`, {
          method: req.method,
          headers: req.headers as any,
          body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
        }),
        { req, reply }
      )

      response.headers.forEach((value, key) => {
        reply.header(key, value)
      })

      reply.status(response.status)

      // Convert ReadableStream to text before sending
      const body = await response.text()
      reply.send(body)
    },
  })

  // Altair GraphQL Playground
  app.get('/altair', async (req, reply) => {
    reply.type('text/html')
    reply.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Altair GraphQL Client</title>
  <base href="https://cdn.jsdelivr.net/npm/altair-static@latest/build/dist/">
  <link rel="stylesheet" href="styles.css">
  <script src="https://cdn.jsdelivr.net/npm/altair-static@latest/build/dist/polyfills.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/altair-static@latest/build/dist/main.js"></script>
</head>
<body>
  <app-altair>Loading...</app-altair>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      AltairGraphQL.init({
        endpointURL: '/graphql',
        initialSettings: {
          theme: 'dark',
          'theme.fontsize': 14,
          'request.withCredentials': true,
        },
      });
    });
  </script>
</body>
</html>
    `)
  })

  // Health check
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))

  // Connect to database
  await connectDatabase()

  // Start server
  try {
    await app.listen({ port: config.port, host: '0.0.0.0' })
    console.log(`
🚀 Server ready at http://localhost:${config.port}/graphql
🎮 Altair Playground at http://localhost:${config.port}/altair
    `)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()
