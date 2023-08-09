import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'

// configurations
dotenv.config()
import './config/database'
// import './config/redis'
import AppRoutes from './utils/app.route'

// Boot express
const app: Application = express()
const port = process.env.PORT || 3000
const base: string = process.env.base_url ?? '/api/v1'

// middlewares
app.use(cors())
app.use(helmet())
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Application routing
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'Nosh HEALTH CHECK, OK!!' })
})
app.use(base, AppRoutes)

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))

// Handle unhandled promise rejections and exceptions
process.on('unhandledRejection', (err: unknown) => {
  console.error(err)
})

process.on('uncaughtException', (err: unknown) => {
  console.error(err)
})
