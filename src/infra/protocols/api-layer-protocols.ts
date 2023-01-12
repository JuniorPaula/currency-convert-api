export type ApiLayerParams = {
  originCurrency: string
  originAmount: number
  destinationCurrency: string
}

export type ApiLayerResult = {
  quote: number
  amount: number
}

export interface ApiLayerProtocols {
  execute({
    originCurrency,
    originAmount,
    destinationCurrency,
  }: ApiLayerParams): Promise<ApiLayerResult>
}
