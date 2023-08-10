import User from '../users/user.model'
import { ITransfer } from './@types'
import { updateTransferDetails } from '../../config/queue'
import Transaction from './transaction.model'

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

    const transaction = await (new Transaction({
      senderId: payload.user._id,
      recipientId: recipient?._id,
      amount: payload.amount,
    })).save();

    updateTransferDetails.add({ payload, recipient, transactionId: transaction.id })
  }
}

export default TransactionService
