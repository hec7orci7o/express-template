import express from 'express'
import * as indexCtrl from '@/api_server/controllers/health'

const router = express.Router()

router.get('/ping', indexCtrl.pong)
router.get('/ping-v2', indexCtrl.protectedPong)

export default router
