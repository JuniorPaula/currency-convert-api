import MockDate from 'mockdate'
import { ServerError } from '../errors/server-error'
import { HttpRequest } from '../protocols/http'
import { ConventController } from './convert-controller'

const mockConvertUsecase = () => {
  class ConvertUsecaseStub {
    private userId: string
    private originCurrency: string
    private originAmount: string
    private destinationCurrency: string

    async convert({
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
    }) {
      this.userId = userId
      this.originCurrency = originCurrency
      this.originAmount = originAmount
      this.destinationCurrency = destinationCurrency

      return Promise.resolve({
        id: 'asdf-1234',
        userId: '1234',
        originCurrency: 'BRL',
        originAmount: 123.5,
        destinationCurrency: 'USD',
        destinationValue: 23.73,
        currencyTax: 0.191,
        timeConvert: new Date(),
      })
    }
  }

  return new ConvertUsecaseStub()
}

const makeSut = () => {
  const convertUsecaseStub = mockConvertUsecase()
  const sut = new ConventController(convertUsecaseStub)

  return {
    sut,
    convertUsecaseStub,
  }
}

describe('ConvertController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 400 if userId is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      body: {
        originCurrency: 'BRL',
        originAmount: 123.5,
        destinationCurrency: 'USD',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toBe('missing param: userId')
  })

  test('Should return 400 if originCurrency is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      body: {
        userId: '1234',
        originAmount: 123.5,
        destinationCurrency: 'USD',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toBe('missing param: originCurrency')
  })

  test('Should return 400 if originAmount is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      body: {
        userId: '1234',
        originCurrency: 'BRL',
        destinationCurrency: 'USD',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toBe('missing param: originAmount')
  })

  test('Should return 400 if destinationCurrency is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      body: {
        userId: '1234',
        originCurrency: 'BRL',
        originAmount: 123.5,
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toBe('missing param: destinationCurrency')
  })

  test('Should call ConvertUsecase with correct values', async () => {
    const { sut, convertUsecaseStub } = makeSut()
    const spy = jest.spyOn(convertUsecaseStub, 'convert')
    const httpRequest: HttpRequest = {
      body: {
        userId: '1234',
        originCurrency: 'BRL',
        originAmount: 123.5,
        destinationCurrency: 'USD',
      },
    }
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })
  })

  test('Should return 500 if ConvertUsecase throws', async () => {
    const { sut, convertUsecaseStub } = makeSut()
    jest
      .spyOn(convertUsecaseStub, 'convert')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => reject(new Error()))
      })

    const httpRequest: HttpRequest = {
      body: {
        userId: '1234',
        originCurrency: 'BRL',
        originAmount: 123.5,
        destinationCurrency: 'USD',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should returns 200 if transaction succeeds', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      body: {
        userId: '1234',
        originCurrency: 'BRL',
        originAmount: 123.5,
        destinationCurrency: 'USD',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'asdf-1234',
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
      destinationValue: 23.73,
      currencyTax: 0.191,
      timeConvert: new Date(),
    })
  })
})
