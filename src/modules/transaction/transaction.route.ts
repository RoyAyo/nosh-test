import express from 'express'

import TransactionController from './transaction.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'

const transactionController = new TransactionController()
const router = express.Router()

router.post('/transfer', authMiddleware, transactionController.initiateTransfer)

export default router
