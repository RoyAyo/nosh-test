/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import AuthenticationService from './auth.service'
import AuthenticationValidator from './auth.validator'
import { IAuthentication } from './@types/index'

const authenticationValidator = new AuthenticationValidator()
const authenticationService = new AuthenticationService()

class AuthenticationController implements IAuthentication {
  /*
    |--------------------------------------------------------------------------
    | Authentication Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles everything that has to do with authentication of users. 
    | 
    |
    */

  constructor() {}

  /**
   * @param {Request} req this is the request coming from the client
   * @param {Response} res this is the http response given back to the client
   */
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      authenticationValidator.userSignUp(req.body)
      const { token, refreshToken } =
        await authenticationService.signUserUpAndReturnToken(req.body)
      res
        .cookie('_refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 604800000,
        })
        .json({
          data: {
            _token: token,
          },
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {Request} req this is the request coming from the client
   * @param {Response} res this is the http response given back to the client
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      authenticationValidator.userLogin(req.body)
      const { token, refreshToken } =
        await authenticationService.logUserInAndReturnToken(req.body)
      res
        .cookie('_refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 604800000,
        })
        .json({
          data: {
            _token: token,
          },
        })
    } catch (error) {
      return next(error)
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies._refreshToken
      if (!refreshToken) throw new Error('Invalid Refresh token provided')
      const _token = await authenticationService.refreshToken(refreshToken)
      res.json({
        data: {
          _token,
        },
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthenticationController
