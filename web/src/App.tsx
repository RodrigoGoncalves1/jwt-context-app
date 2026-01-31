import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { apolloClient } from './lib/apollo'
import { AuthProvider } from './contexts/AuthContext'
import { AppRoutes } from './routes'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}
