import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { setStatus } from '@/lib/utils'
import { Limiter, SpeedLimiter } from '@/api_server/middlewares/limiters'
import { stamp } from '@/api_server/middlewares/timestamp'
import { connectDB } from '@/lib/database'

import healthRouter from '@/api_server/routes/health'
import authRouter from '@/api_server/routes/auth'

connectDB()
  .then(() => console.log('MongoDB has been connected'))
  .catch((err) => console.error(err))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

app.use(express.static(path.join(__dirname, 'public')))

app.use(Limiter, SpeedLimiter)
app.use('/v1', stamp)
app.use('/v1/health', healthRouter)
app.use('/v1/auth', authRouter)

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  if (!err.status) {
    console.error(err.stack)
    res
      .status(500)
      .json({ status: setStatus(req, 500, 'Internal Server Error') })
    return
  }

  res
    .status(err.status)
    .json({ status: setStatus(req, err.status, err.message) })
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server is running → PORT ${String(PORT)}`)
})

export default app
