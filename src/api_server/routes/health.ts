import express from 'express'
import { authenticate } from '@/api_server/middlewares/auth'
import * as indexCtrl from '@/api_server/controllers/health'

const router = express.Router()

router.get('/ping', indexCtrl.pong)
router.get('/secure-ping', authenticate, indexCtrl.protectedPong)

export default router
