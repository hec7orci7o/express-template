import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { stamp } from '@/api_server/middlewares/timestamp'
import { connectDB } from '@/lib/database'

import healthRouter from '@/api_server/routes/health'
import authRouter from '@/api_server/routes/auth'

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

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server is running → PORT ${String(PORT)}`)
  connectDB()
    .then(() => console.log('MongoDB has been connected'))
    .catch((err) => console.error(err))
})

app.use('/v1', stamp)
app.use('/v1/health', healthRouter)
app.use('/v1/auth', authRouter)

export default app
