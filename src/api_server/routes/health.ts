import express from 'express'
import * as indexCtrl from '@/api_server/controllers/main'

const router = express.Router()

router.get('/ping', indexCtrl.pong)
router.get('/ping-v2', indexCtrl.protectedPong)

export default router
