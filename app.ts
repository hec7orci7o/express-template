import express from 'express'
import connectDB from './config/database'
import path from 'path'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { stamp } from './api_server/middlewares/timestamp'
import indexRouter from './api_server/routes/index'
import authRouter from './api_server/routes/auth'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
require('./auth/passport')

connectDB()
  .then(() => console.log('MongoDB has been connected'))
  .catch((err) => console.error(err))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: ['https://cdn.redoc.ly']
}))
app.use(helmet({
  contentSecurityPolicy: false
}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server is running → PORT ${String(PORT)}`)
})

app.use('/api/v1', stamp)
app.use('/api/v1', indexRouter)
app.use('/api/v1', authRouter)

export default app
