export class ConvertUsecase {
  constructor(private readonly apiLayerService) {}

  async convert({ userId, originCurrency, originAmount, destinationCurrency }) {
    await this.apiLayerService.execute({
      originCurrency,
      originAmount,
      destinationCurrency,
    })
  }
}
