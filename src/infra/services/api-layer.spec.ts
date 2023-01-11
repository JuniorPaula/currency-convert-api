import axios from 'axios'
import { ApiLayerService } from './api-layer'

describe('ApiLayerService', () => {
  test('Should return correct valeu when api layer to be called', async () => {
    const sut = new ApiLayerService()

    jest.spyOn(axios, 'get').mockReturnValueOnce(
      Promise.resolve({
        data: {
          success: true,
          query: {
            from: 'BRL',
            to: 'USD',
            amount: 123.5,
          },
          info: {
            timestamp: 1673465103,
            quote: 0.19289,
          },
          result: 23.821915,
        },
      }),
    )
    const result = await sut.execute({
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
    })

    expect(result).toEqual({
      quote: 0.19289,
      amount: 23.821915,
    })
  })
})
