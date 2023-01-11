export class ConvertUsecase {
  constructor(
    private readonly apiLayerService,
    private readonly convertRepository,
  ) {}

  async convert({ userId, originCurrency, originAmount, destinationCurrency }) {
    const response = await this.apiLayerService.execute({
      originCurrency,
      originAmount,
      destinationCurrency,
    })

    const result = await this.convertRepository.save({
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      currencyTax: response.quote,
      timeConvert: new Date(),
    })

    const amountConverted = {
      trasactionId: result._id,
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      destinationValue: response.amount,
      currencyTax: response.quote,
      timeConvert: new Date(),
    }

    return amountConverted
  }
}
