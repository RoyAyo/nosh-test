/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi'
import { ISignupPayload, ILoginPayload } from './@types'

class AuthValidator {
  userSignUp(requestData: ISignupPayload): void {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    })
    const isValidateResult: Joi.ValidationResult = schema.validate(requestData)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
  }

  userLogin(requestData: ILoginPayload): void {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    const isValidateResult: Joi.ValidationResult = schema.validate(requestData)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
  }
}

export default AuthValidator
