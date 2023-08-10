import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

interface IPayload {
  _id: string
  password?: string
}

class AuthHelper {
  static generatePayloadFromToken(
    token: string,
    isRefresh: boolean = false,
  ): IPayload {
    const salt = isRefresh
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.TOKEN_SECRET
    const payload = jwt.verify(token, salt ?? '') as IPayload
    return payload
  }

  static generateTokenFromPayload(
    payload: { [key: string]: string },
    isRefresh: boolean = false,
  ): string {
    const salt = isRefresh
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.TOKEN_SECRET
    const token: string = jwt.sign(payload, salt ?? '', {
      expiresIn: isRefresh ? '7d' : '15m',
    })
    return token
  }

  static passwordToHash(password: string): string {
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    return hashedPassword
  }

  static compareBcryptPassword(
    suppliedPassword: string,
    storedPassword: string,
  ) {
    return bcrypt.compareSync(suppliedPassword, storedPassword)
  }
}

export default AuthHelper
