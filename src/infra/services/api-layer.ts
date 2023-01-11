import { AxiosInstance } from 'axios'

export class ApiLayerService {
  private apiUrl: string
  private httpClient: AxiosInstance

  constructor() {
    this.apiUrl = process.env.API_LAYER_URL
  }

  async execute({ originCurrency, originAmount, destinationCurrency }) {
    const response = await this.httpClient.get(
      `${this.apiUrl}/currency_data/convert?to=${destinationCurrency}&from=${originCurrency}&amount=${originAmount}`,
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
