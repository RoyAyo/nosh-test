/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi'
import { ITransfer } from './@types'

class TransactionValidator {
  initiateTransfer(requestData: ITransfer): void {
    const schema = Joi.object().keys({
      user: Joi.allow(),
      amount: Joi.number().min(10),
      recipientId: Joi.string().required(),
    })
    const isValidateResult: Joi.ValidationResult = schema.validate(requestData)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
  }
}

export default TransactionValidator
