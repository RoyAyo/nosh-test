import { NextFunction, Request, Response } from 'express'
import TransactionService from './transaction.service'
import TransactionValidator from './transaction.validation'

const transactionValidator = new TransactionValidator()
const transactionService = new TransactionService()

class TransactionController {
  async initiateTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      transactionValidator.initiateTransfer(req.body)
      await transactionService.initiateTransfer(req.body)
      res.json({
        message: 'Your transaction is processing',
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default TransactionController
