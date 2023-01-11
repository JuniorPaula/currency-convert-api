import axios from 'axios'

export class ApiLayerService {
  async execute({ originCurrency, originAmount, destinationCurrency }) {
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
