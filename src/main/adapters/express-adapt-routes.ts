import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'

export const adapterRoutes = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
