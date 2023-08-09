import mongoose, { Schema } from 'mongoose'

interface ITransaction extends Document {
  senderId: string
  amount: number
  recipientId: string
}

const TransactionSchema = new Schema<ITransaction>(
  {
    senderId: {
      type: String,
    },
    amount: Number,
    recipientId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ITransaction>('Transaction', TransactionSchema)
