import mongoose, { Schema } from 'mongoose'

import { IUserDocument } from './@types/index'

interface IUser extends IUserDocument {
  createToken(): string
  validatePassword(password: string): boolean
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Export the model and return your IUser interface
export default mongoose.model<IUser>('Users', UserSchema)
