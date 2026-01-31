export interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export interface IEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>
  sendVerificationEmail(email: string, name: string, token: string): Promise<void>
  sendPasswordResetEmail(email: string, name: string, token: string): Promise<void>
}
