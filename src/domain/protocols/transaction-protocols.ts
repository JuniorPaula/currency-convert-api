import { Transactions } from './convent-usecase-protocols'

export type TransactionParam = {
  userId: string
}

export interface TransactionProtocols {
  load({ userId }: TransactionParam): Promise<Transactions[]>
}
