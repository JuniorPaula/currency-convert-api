export type ConvertUsecaseParams = {
  userId: string
  originCurrency: string
  originAmount: number
  destinationCurrency: string
}

export type AmountConvertedResult = {
  trasactionId: string
  destinationValue: number
  currencyTax: number
  timeConvert: Date
}

export type Transactions = ConvertUsecaseParams | AmountConvertedResult

export interface ConvertUsecaseProtocols {
  convert({
    userId,
    originCurrency,
    originAmount,
    destinationCurrency,
  }: ConvertUsecaseParams): Promise<Transactions>
}
