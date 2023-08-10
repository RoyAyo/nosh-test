import { Document } from 'mongoose'

export interface userDTO {
  _id: string
  email: string
  name?: string
  password: string
  balance: number
  roles: Array<string>
}

export interface IUserDocument extends Document {
  email: string
  name?: string
  password: string
  balance: number,
  roles: Array<string>
}
