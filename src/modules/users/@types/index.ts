import { Document } from 'mongoose'

export interface userDTO {
  _id: string
  email: string
  name?: string
  password: string
  balance: number
}

export interface IUserDocument extends Document {
  email: string
  name?: string
  password: string
  balance: number
}
