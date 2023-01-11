import { ConvertUsecase } from './convert-usecase'

const mockApiLayerService = () => {
  class ApiLayerService {
    async execute({ originCurrency, originAmount, destinationCurrency }) {
      return null
    }
  }

  return new ApiLayerService()
}

const makeSut = () => {
  const apiLayerService = mockApiLayerService()
  const sut = new ConvertUsecase(apiLayerService)

  return {
    sut,
    apiLayerService,
  }
}

describe('ConvertUsecase', () => {
  test('should call ApiLayerService with correct values', async () => {
    const { sut, apiLayerService } = makeSut()

    const spy = jest.spyOn(apiLayerService, 'execute')

    await sut.convert({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })

    expect(spy).toHaveBeenCalledWith({
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })
  })
})
