import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getAccessToken, removeTokens, setTokens } from './auth'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHORIZED') {
        // Token expired, try to refresh
        // For now, just remove tokens and redirect to login
        removeTokens()
        window.location.href = '/login'
      }
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})
