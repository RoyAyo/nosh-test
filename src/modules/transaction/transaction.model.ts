import mongoose, { Schema } from 'mongoose'
import { ITransaction } from './@types'

const TransactionSchema = new Schema<ITransaction>(
  {
    senderId: {
      type: String,
    },
    amount: Number,
    recipientId: {
      type: String,
    },
    status: {
      type: String,
      default: 'Pending'
    }
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ITransaction>('Transaction', TransactionSchema)
