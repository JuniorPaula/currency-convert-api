export class ConvertUsecase {
  constructor(
    private readonly apiLayerService,
    private readonly convertRepository,
  ) {}

  async convert({ userId, originCurrency, originAmount, destinationCurrency }) {
    const result = await this.apiLayerService.execute({
      originCurrency,
      originAmount,
      destinationCurrency,
    })

    await this.convertRepository.save({
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      currencyTax: result.quote,
      timeConvert: new Date(),
    })

    const amountConverted = {
      id: 'asdf-1234',
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      destinationValue: result.amount,
      currencyTax: result.quote,
      timeConvert: new Date(),
    }

    return amountConverted
  }
}
