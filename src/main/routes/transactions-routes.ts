import { Router } from 'express'
import { adapterRoutes } from '../adapters/express-adapt-routes'
import { transactionFactory } from '../factories/transactions'

export default (router: Router) => {
  router.get('/transactions/:userId', adapterRoutes(transactionFactory()))
}
