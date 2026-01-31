export interface RegisterInput {
  email: string
  password: string
  name: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthPayload {
  accessToken: string
  refreshToken: string
  user: UserDTO
}

export interface UserDTO {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MessagePayload {
  success: boolean
  message: string
}
