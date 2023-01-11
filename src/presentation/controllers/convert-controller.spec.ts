/**
 *  * ID do usu�rio;
 * Moeda origem;
 * Valor origem;
 * Moeda destino;
 * Taxa de convers�o utilizada;
 * Data/Hora UTC;
 */
import { HttpRequest } from '../protocols/http'
import { ConventController } from './convert-controller'

const makeSut = () => {
  const sut = new ConventController()

  return {
    sut,
  }
}

describe('ConvertController', () => {
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
})
