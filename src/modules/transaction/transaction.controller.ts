import { Request, Response } from 'express'
import TransactionService from './transaction.service'
import TransactionValidator from './transaction.validation'

const transactionValidator = new TransactionValidator()
const transactionService = new TransactionService()

class TransactionController {
  async initiateTransfer(req: Request, res: Response): Promise<void> {
    try {
      transactionValidator.initiateTransfer(req.body)
      await transactionService.initiateTransfer(req.body)
      res.json({
        message: 'Successfully sent',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      res.status(400).json({
        error: true,
        message: error.message,
      })
    }
  }
}

export default TransactionController
