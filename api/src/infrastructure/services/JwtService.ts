import jwt from 'jsonwebtoken'
import { IJwtService, JwtPayload } from '../../application/interfaces/IJwtService.js'
import { config } from '../config/env.js'

export class JwtService implements IJwtService {
  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    })
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    })
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload
      return decoded
    } catch {
      return null
    }
  }

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, config.jwt.refreshSecret) as JwtPayload
      return decoded
    } catch {
      return null
    }
  }
}
