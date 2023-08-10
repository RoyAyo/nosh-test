/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { userDTO } from '../modules/users/@types';

export const authorizeMiddleware = (role: string) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const user: userDTO = req.body.user;
          const roles = user.roles;
      
          if(!roles.includes(role)) {
            throw new Error('You are not authorized to perform operation')
          }
      
          next()
        } catch (error: any) {
          console.error(error.message)
          res.status(401).json({
            message: error.message,
          })
        }
      }
}
