import express from 'express'
import * as authCtrl from '@/api_server/controllers/auth'
import { validateBody } from '@/api_server/middlewares/parser'

// ----- user input validation ---------------
import { object, string } from 'yup'

export const user = object().shape({
  username: string()
    .transform((username: string) => username.toLowerCase())
    .optional(),
  email: string()
    .email()
    .transform((email: string) => email.toLowerCase()),
  password: string().min(8)
})
// -------------------------------------------

const router = express.Router()

router.post('/sign-up', validateBody(user), authCtrl.signUp)
router.post('/sign-in', validateBody(user), authCtrl.signIn)

export default router
