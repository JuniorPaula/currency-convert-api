import { HttpRequest } from '../protocols/http'
import { TransactionController } from './transactions-controller'

describe('TransactionController', () => {
  test('Should return 400 if userId is not provided', async () => {
    const sut = new TransactionController()

    const httpRequest: HttpRequest = {
      params: {},
    }

    const httpResponse = await sut.handle(httpRequest)
    console.log(httpResponse)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('missing param: userId')
  })
})
