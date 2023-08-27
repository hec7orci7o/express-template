import { Request } from 'express'

export const setStatus = (
  req: Request,
  errorCode: number,
  errorMessage: string
): object => {
  return {
    timestamp: new Date().toISOString(),
    error_code: errorCode,
    error_message: errorMessage,
    elapsed: Math.floor(
      performance.now() - Number(req.headers['X-Request-Time'])
    )
  }
}
