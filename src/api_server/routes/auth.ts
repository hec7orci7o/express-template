import express from 'express'
import * as authCtrl from '@/api_server/controllers/auth'

const router = express.Router()

router.post('/sign-up', authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)

export default router
