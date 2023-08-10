import { userDTO } from "../../users/@types"

export interface ITransaction extends Document {
    senderId: string
    amount: number
    recipientId: string
    status: string
  }

export interface ITransfer {
  user: userDTO
  amount: number
  recipientId: string
  status: string
}