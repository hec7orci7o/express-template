import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

const API_KEY = 'your_api_key_here' // Cambia esto por tu clave API

export const checkApiKey = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers.API_KEY

  if (!apiKey || apiKey !== API_KEY) {
    throw createHttpError(401, 'Unauthorized')
  }

  next()
}
