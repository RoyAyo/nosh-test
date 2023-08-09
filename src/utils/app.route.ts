import express from 'express'

import AuthRoute from '../modules/auth/auth.route'
import TransactionRoute from '../modules/transaction/transaction.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/transaction',
    route: TransactionRoute,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
