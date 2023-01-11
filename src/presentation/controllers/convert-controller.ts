export class ConventController {
  async handle(httpRequest) {
    if (!httpRequest.body.userId) {
      return {
        statusCode: 400,
        error: {
          message: 'missing param: userId',
        },
      }
    }
  }
}
