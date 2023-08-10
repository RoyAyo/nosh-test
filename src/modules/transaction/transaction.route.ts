import express from 'express'

import TransactionController from './transaction.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { authorizeMiddleware } from '../../middlewares/authorization.middleware'

const transactionController = new TransactionController()
const router = express.Router()

router.use(authMiddleware);

router.post('/transfer', authorizeMiddleware('Transfer'), transactionController.initiateTransfer)

export default router
