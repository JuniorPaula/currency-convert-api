import { ConvertUsecase } from '../../domain/usecases/convert-usecase'
import { ConvertRepository } from '../../infra/repositories/conver-repository'
import { ApiLayerService } from '../../infra/services/api-layer'
import { ConventController } from '../../presentation/controllers/convert-controller'

export const convertCurrencyFactory = (): ConventController => {
  const convertRepository = new ConvertRepository()
  const apiLayerService = new ApiLayerService()
  const convertUsecase = new ConvertUsecase(apiLayerService, convertRepository)

  return new ConventController(convertUsecase)
}
