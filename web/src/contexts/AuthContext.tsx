import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useApolloClient } from '@apollo/client'
import { getAccessToken, setTokens, removeTokens } from '../lib/auth'

interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (accessToken: string, refreshToken: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const client = useApolloClient()

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      // TODO: Fetch user data from API
      // For now, just mark as not loading
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = (accessToken: string, refreshToken: string, userData: User) => {
    setTokens(accessToken, refreshToken)
    setUser(userData)
  }

  const logout = () => {
    removeTokens()
    setUser(null)
    client.resetStore()
  }

  const updateUser = (userData: User) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
