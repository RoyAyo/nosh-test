import { NextFunction, Request, Response } from 'express'

export interface IAuthentication {
  signUp(req: Request, res: Response, next: NextFunction): Promise<void>
  login(req: Request, res: Response, next: NextFunction): Promise<void>
  refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface ITokens {
  token: string
  refreshToken: string
}
