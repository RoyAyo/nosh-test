/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
    let err = error
    let code = 400
    let message: string | any[]

    switch (err.name) {
        case 'TypeError':
        case 'URIError':
        case 'ReferenceError':
            (err = 'Server Error'), (code = 500)
            break
        case 'ValidationError':
            message = Object.values(err.errs).map((val: any) => val.message)
            err = message[0]
            code = 400
            break
        case 'MongoError':
        case 'MongoServerError':
            message = Object.keys(err.keyPattern)[0]
            message = `${
                message.includes('.')
                    ? message.split('.')[message.split('.').length - 1]
                    : message
            } already exists`
            err = message
            break
        default:
            message = err.message
            err = message
            code = 400
            break
    }

    // Mongoose duplicate err
    if (err.code === 11000) {
        const field: string = Object.keys(err.keyValue)[0]

        message = `${
            field.charAt(0).toUpperCase() + field.slice(1)
        } already exists.`

        err = message
    }

    // my custom typa err..
    if (error?.message?.split('//')?.length > 1) {
        err = error?.message?.split('//')[0]
        code = error?.message?.split('//')[1]
            ? Number(error?.message?.split('//')[1])
            : 422
    }

    if (typeof err === 'object' && !Array.isArray(err)) {
        const errEngine = []
        // ship engine err reformation
        for (const [key, value] of Object.entries(err)) {
            if (key === 'errs') {
                for (const errElement of value as [
                    { message: string; field_name: string }
                ]) {
                    errEngine.push({
                        param: errElement?.field_name ?? null,
                        msg: errElement?.message ?? null,
                    })
                }
            }
        }
        err = errEngine
    }

    if (typeof error === 'string' && error.startsWith('Value for argument'))
        err = 'Invalid arguments.'
    if (
        typeof error === 'string' &&
        error.startsWith("Cannot use 'in' operator to search for")
    )
        err = error.substring(49)

    if (typeof error === 'string' && error.startsWith('{')) {
        const messageError = JSON.parse(error)
        err = messageError?.message
        code = messageError?.code
    }

    res.status(code ?? 400).json({
        status: 'fail',
        code: code ?? 400,
        err: err ? true : false,
        message: err,
        data: null,
    })
    return 0
}