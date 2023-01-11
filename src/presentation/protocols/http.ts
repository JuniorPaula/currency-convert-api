/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest {
  body?: any
  params?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
