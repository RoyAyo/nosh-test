/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import Cache from '../config/cache'

import AuthHelper from '../helpers/auth.helper'
import userModel from '../modules/users/user.model'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    )
      throw new Error('You need to Login first To access this route')

    const token = req.headers.authorization.split(' ')[1]
    if (!token) throw new Error('Not authorized to access this route')

    const { _id } = AuthHelper.generatePayloadFromToken(token)

    const user = await Cache.hGet(`user-${_id}`, 'users')

    if (user) {
      req.body.user = JSON.parse(user)
    } else {
      const user = await userModel.findById(_id).lean()
      if (!user) throw new Error('Invalid token provided')
      req.body.user = user
    }

    next()
  } catch (error: any) {
    console.error(error.message)
    res.status(401).json({
      message: error.message,
    })
  }
}
