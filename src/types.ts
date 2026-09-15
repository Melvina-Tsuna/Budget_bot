export type AuthMode = 'anonyme' | 'utilisateur'

export type WalletType = 'ESPECES' | 'VIRTUEL' | 'BANQUE'

export type LoginStatus = {
  loading: boolean
  message: string | null
  error: string | null
}

export type TransactionType = 'EXPENSE' | 'INCOME'

export type TransactionRecord = {
  id: string
  amount: number
  type: TransactionType
  category: string | null
  description: string | null
  occurredOn: string
  walletName: string
}
