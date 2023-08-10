/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthHelper from '../../helpers/auth.helper'
import User from '../users/user.model'
import { ILoginPayload, ISignupPayload, ITokens } from './@types'
import Cache from '../../config/cache'

class AuthenticationService {
  async signUserUpAndReturnToken(payload: ISignupPayload): Promise<ITokens> {
    const hashedPassword = AuthHelper.passwordToHash(payload.password)
    const newUser = new User({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    })
    await newUser.save()
    await Cache.hSet(`user-${newUser._id}`, 'users', JSON.stringify(newUser))
    const token = AuthHelper.generateTokenFromPayload({
      _id: newUser._id,
    })
    const refreshToken = AuthHelper.generateTokenFromPayload(
      {
        _id: newUser._id,
      },
      true,
    )
    return {
      token,
      refreshToken,
    }
  }

  async logUserInAndReturnToken(payload: ILoginPayload): Promise<ITokens> {
    const { email, password } = payload
    const user = await User.findOne({ email }).select('+password')
    if (!user) throw new Error('Invalid Email Provided')
    const isValidCredentials: boolean = AuthHelper.compareBcryptPassword(
      password,
      user.password,
    )
    if (!isValidCredentials) throw new Error('Invalid credentials provided')
    const token = AuthHelper.generateTokenFromPayload({
      _id: user._id,
    })
    const refreshToken = AuthHelper.generateTokenFromPayload(
      {
        _id: user._id,
      },
      true,
    )
    return {
      token,
      refreshToken,
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const { _id } = AuthHelper.generatePayloadFromToken(refreshToken, true)
    const user = await User.findById(_id)
    if (!user) throw new Error('Invalid User in token')
    const token = AuthHelper.generateTokenFromPayload({
      _id: user._id,
    })
    return token
  }
}

export default AuthenticationService
