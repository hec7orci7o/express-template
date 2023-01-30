import express from 'express'
import * as authCtrl from '../controllers/auth'
import * as userMiddleware from '../middlewares/user'
import passport from 'passport'

const router = express.Router()

router.post('/sign-in', authCtrl.signIn)
router.post('/sign-up', userMiddleware.userExists, authCtrl.signUp)
router.post('/sign-out', passport.authenticate('jwt', { session: false }), authCtrl.logout)

export default router
