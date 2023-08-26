import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { stamp } from '@/api_server/middlewares/timestamp'

import indexRouter from '@/api_server/routes/health'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet({
  contentSecurityPolicy: false
}))

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server is running → PORT ${String(PORT)}`)
})

app.use('/v1', stamp)
app.use('/v1/health', indexRouter)

export default app
