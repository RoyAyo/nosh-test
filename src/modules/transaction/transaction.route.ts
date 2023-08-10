import express from 'express'

import TransactionController from './transaction.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { authorizeMiddleware } from '../../middlewares/authorization.middleware'

const transactionController = new TransactionController()
const router = express.Router()

router.use(authMiddleware);

// this will accept as many roles
router.post('/transfer', authorizeMiddleware('TransferUser'), transactionController.initiateTransfer)

export default router
