import axios from 'axios'
import {
  ApiLayerParams,
  ApiLayerProtocols,
  ApiLayerResult,
} from '../protocols/api-layer-protocols'

export class ApiLayerService implements ApiLayerProtocols {
  async execute({
    originCurrency,
    originAmount,
    destinationCurrency,
  }: ApiLayerParams): Promise<ApiLayerResult> {
    const response = await axios.get(
      `${process.env.API_LAYER_URL}/currency_data/convert?to=${destinationCurrency}&from=${originCurrency}&amount=${originAmount}`,
      {
        headers: {
          apikey: process.env.TOKEN_API_LAYER,
        },
      },
    )

    return {
      quote: response.data.info.quote,
      amount: response.data.result,
    }
  }
}
