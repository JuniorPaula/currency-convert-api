import { Router, Express } from 'express'
import convertRoutes from './convert-routes'
import transactionsRoutes from './transactions-routes'

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use('/', router)

  convertRoutes(router)
  transactionsRoutes(router)
}
