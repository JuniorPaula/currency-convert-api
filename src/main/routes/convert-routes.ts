import { Router } from 'express'
import { adapterRoutes } from '../adapters/express-adapt-routes'
import { convertCurrencyFactory } from '../factories/convert-currency'

export default (router: Router) => {
  router.post('/convert', adapterRoutes(convertCurrencyFactory()))
}
