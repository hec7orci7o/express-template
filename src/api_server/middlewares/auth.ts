import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

function validarJWT(token: string): string | jwt.JwtPayload | null {
  try {
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY))
    return decoded
  } catch (error) {
    return null // El token es inválido o ha expirado
  }
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const token = req.headers['x-api-key'] as string

  if (!token || !validarJWT(token)) {
    throw createHttpError(401, 'Unauthorized')
  }

  next()
}
