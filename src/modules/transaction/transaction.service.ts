import { startSession } from 'mongoose'
import { userDTO } from '../users/@types'
import User from '../users/user.model'

interface ITransfer {
  user: userDTO
  amount: number
  recipientId: string
}

class TransactionService {
  async initiateTransfer(payload: ITransfer) {
    const recipient = await User.findById(payload.recipientId)
    if (!recipient) throw new Error('This recipient does not exist')

    if (payload.recipientId === payload.user._id.toString()) {
      throw new Error('You cannot make a transfer to yourself')
    }

    if (payload.user.balance < payload.amount) {
      throw new Error('Account balance is insufficient')
    }

    const session = await startSession()
    session.startTransaction()
    try {
      await User.findByIdAndUpdate(payload.user._id, {
        $inc: { balance: -payload.amount },
      })
      await User.findByIdAndUpdate(recipient._id, {
        $inc: { balance: payload.amount },
      })
      session.commitTransaction()
    } catch (error) {
      console.error(error)
      session.abortTransaction()
    } finally {
      session.endSession()
    }
  }
}

export default TransactionService
