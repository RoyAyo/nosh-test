import { Request, Response } from 'express'

export interface IAuthentication {
  signUp(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
}

export interface ITokens {
  token: string
  refreshToken: string
}
