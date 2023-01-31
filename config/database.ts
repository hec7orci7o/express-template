import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const CONNECTION_URI = process.env.DATABASE_URI ?? 'mongodb://127.0.0.1:27017/example'
mongoose.set('strictQuery', true)
mongoose
  .connect(CONNECTION_URI)
  .then(() => console.log('Database is succesfully connected'))
  .catch((err) => console.error(err))
