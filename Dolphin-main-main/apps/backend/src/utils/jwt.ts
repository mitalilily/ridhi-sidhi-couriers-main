import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import path from 'path'

// Load correct .env based on NODE_ENV
const env = process.env.NODE_ENV || 'development'
dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) })

const ACCESS_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  process.env.JWT_SECRET ||
  'ridhi-sidhi-test-access-secret'
const REFRESH_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  process.env.JWT_SECRET ||
  'ridhi-sidhi-test-refresh-secret'

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  console.warn(
    '[Auth JWT] ACCESS_TOKEN_SECRET/REFRESH_TOKEN_SECRET missing. Using test fallback secrets.',
  )
}

export interface RefreshPayload {
  sub: string // userId
  role: string
  jti: string
  iat: number
  exp: number
}
export const signAccessToken = (id: string, role: string) =>
  jwt.sign({ sub: id, role }, ACCESS_SECRET, { expiresIn: '24h' })

export const signRefreshToken = (id: string, role: string) => {
  const jti = randomUUID()
  return {
    token: jwt.sign({ sub: id, role, jti }, REFRESH_SECRET, {
      expiresIn: '7d',
    }),
    jti,
  }
}

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET) as { sub: string; role: string }

export const verifyRefreshToken = (token: string): RefreshPayload =>
  jwt.verify(token, REFRESH_SECRET) as RefreshPayload
