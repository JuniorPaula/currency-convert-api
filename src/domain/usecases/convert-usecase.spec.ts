import MockDate from 'mockdate'
import { ConvertUsecase } from './convert-usecase'

const mockConvertRepository = () => {
  class ConvertRepository {
    async save({
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      currencyTax,
      timeConvert,
    }) {
      return null
    }
  }

  return new ConvertRepository()
}

const mockApiLayerService = () => {
  class ApiLayerService {
    async execute({ originCurrency, originAmount, destinationCurrency }) {
      return Promise.resolve({
        quote: 0.192385,
        amount: 23.759548,
      })
    }
  }

  return new ApiLayerService()
}

const makeSut = () => {
  const convertRepository = mockConvertRepository()
  const apiLayerService = mockApiLayerService()
  const sut = new ConvertUsecase(apiLayerService, convertRepository)

  return {
    sut,
    apiLayerService,
    convertRepository,
  }
}

describe('ConvertUsecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

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

  test('Should throw if ApiLayerService throws', async () => {
    const { sut, apiLayerService } = makeSut()
    jest
      .spyOn(apiLayerService, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.convert({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })
    await expect(promise).rejects.toThrow()
  })

  test('should call ConvertRepository with correct values', async () => {
    const { sut, convertRepository } = makeSut()
    const spy = jest.spyOn(convertRepository, 'save')

    await sut.convert({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })

    expect(spy).toHaveBeenCalledWith({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
      currencyTax: 0.192385,
      timeConvert: new Date(),
    })
  })

  test('Should throw if ConvertRepository throws', async () => {
    const { sut, convertRepository } = makeSut()
    jest
      .spyOn(convertRepository, 'save')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.convert({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })
    await expect(promise).rejects.toThrow()
  })
})
