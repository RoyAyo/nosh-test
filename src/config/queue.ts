import Queue from 'bull'
import { startSession } from 'mongoose'
import Cache from '../config/cache'

import User from '../modules/users/user.model'
import Transaction from '../modules/transaction/transaction.model'

export const updateTransferDetails = new Queue('process transfer')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
updateTransferDetails.process(async (job: any, done: any) => { 

    const { payload, recipient, transactionId } = job.data

    const session = await startSession()
    session.startTransaction()
    try {
      const updatedSender = await User.findByIdAndUpdate(payload.user._id, {
        $inc: { balance: -payload.amount },
      }, { new: true }).lean()
      const updatedRecipient = await User.findByIdAndUpdate(recipient._id, {
        $inc: { balance: payload.amount },
      }, { new: true }).lean()

      await Transaction.findByIdAndUpdate(transactionId, { status: 'Successful' })

      session.commitTransaction()

      //update cache
      Cache.hSet(`user-${updatedSender?._id}`, 'users' ,JSON.stringify(updatedSender))
      Cache.hSet(`user-${updatedRecipient?._id}`, 'users' ,JSON.stringify(updatedRecipient))
      
    } catch (error) {
        console.error(error)
        await Transaction.findByIdAndUpdate(transactionId, { status: 'Failed' })
        session.abortTransaction()
    } finally {
        session.endSession()
        done();
    }

})