export type ConvertRepositoryParams = {
  userId: string
  originCurrency: string
  originAmount: number
  destinationCurrency: string
  currencyTax: number
  timeConvert: Date
}

export interface ConvertRepositoryProtocols {
  save({
    userId,
    originCurrency,
    originAmount,
    destinationCurrency,
    currencyTax,
    timeConvert,
  }: ConvertRepositoryParams): Promise<any>
}
