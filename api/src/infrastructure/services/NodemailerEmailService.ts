import nodemailer from 'nodemailer'
import { IEmailService, SendEmailOptions } from '../../application/interfaces/IEmailService.js'
import { config } from '../config/env.js'

export class NodemailerEmailService implements IEmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: config.smtp.user ? {
        user: config.smtp.user,
        pass: config.smtp.pass,
      } : undefined,
    })
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: config.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })
  }

  async sendVerificationEmail(email: string, name: string, token: string): Promise<void> {
    const verificationUrl = `${config.appUrl}/verify-email?token=${token}`

    await this.sendEmail({
      to: email,
      subject: 'Verify your email address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Welcome, ${name}!</h1>
            <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}"
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email
              </a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2563eb;">${verificationUrl}</p>
            <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </body>
        </html>
      `,
      text: `Welcome, ${name}!\n\nPlease verify your email by visiting: ${verificationUrl}\n\nThis link will expire in 24 hours.`,
    })
  }

  async sendPasswordResetEmail(email: string, name: string, token: string): Promise<void> {
    const resetUrl = `${config.appUrl}/reset-password?token=${token}`

    await this.sendEmail({
      to: email,
      subject: 'Reset your password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Password Reset Request</h1>
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}"
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2563eb;">${resetUrl}</p>
            <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        </body>
        </html>
      `,
      text: `Hi ${name},\n\nWe received a request to reset your password. Visit this link to create a new password: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, you can safely ignore this email.`,
    })
  }
}
