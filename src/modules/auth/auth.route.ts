import express from 'express'

import AuthController from './auth.controller'

const authController = new AuthController()
const router = express.Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/refresh', authController.refreshToken)

export default router
