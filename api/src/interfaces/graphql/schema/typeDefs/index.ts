export const typeDefs = /* GraphQL */ `
  scalar DateTime
  scalar EmailAddress

  directive @auth on FIELD_DEFINITION

  type User {
    id: ID!
    email: EmailAddress!
    name: String!
    emailVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  type MessagePayload {
    success: Boolean!
    message: String!
  }

  input RegisterInput {
    email: EmailAddress!
    password: String!
    name: String!
  }

  input LoginInput {
    email: EmailAddress!
    password: String!
  }

  input ResetPasswordInput {
    token: String!
    newPassword: String!
  }

  type Query {
    me: User @auth
  }

  type Mutation {
    # Auth
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    refreshToken(token: String!): AuthPayload!
    logout: MessagePayload! @auth

    # Email Verification
    verifyEmail(token: String!): MessagePayload!
    resendVerificationEmail: MessagePayload! @auth

    # Password Reset
    requestPasswordReset(email: EmailAddress!): MessagePayload!
    resetPassword(input: ResetPasswordInput!): MessagePayload!
  }
`
