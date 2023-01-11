/**
 *  * ID do usu�rio;
 * Moeda origem;
 * Valor origem;
 * Moeda destino;
 * Taxa de convers�o utilizada;
 * Data/Hora UTC;
 */
import { HttpRequest } from '../../protocols/http'
import { ConventController } from './convert-controller'

describe('ConvertController', () => {
  test('Should return 400 if userId is not provided', async () => {
    const httpRequest: HttpRequest = {
      body: {
        originCurrency: 'BRL',
        originAmount: 123.5,
        destinationCurrency: 'USD',
      },
    }
    const sut = new ConventController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('missing param: userId')
  })
})
