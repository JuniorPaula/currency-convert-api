import { Router, Express } from 'express'
import convertRoutes from './convert-routes'

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use('/', router)

  convertRoutes(router)
}
