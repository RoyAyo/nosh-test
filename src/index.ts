import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

// configurations
dotenv.config()
import './config/database'
import './config/cache'
import AppRoutes from './utils/app.route'
import { handleError } from './utils/errorHandler'

// Boot express
const app: Application = express()
const port = process.env.PORT || 3000
const baseV1: string = process.env.base_url ?? '/api/v1'

// middlewares
app.use(limiter)
app.use(cors())
app.use(helmet())
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Application routing and versioning
app.get('/', (req: Request, res: Response) => {
	res.status(200).send({ data: 'Nosh HEALTH CHECK, OK!!' })
})
// version 1
app.use(baseV1, AppRoutes)

app.use(handleError)

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))

// Handle unhandled promise rejections and exceptions
process.on('unhandledRejection', (err: unknown) => {
  console.error(err)
})

process.on('uncaughtException', (err: unknown) => {
  console.error(err)
})
