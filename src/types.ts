export type AuthMode = 'anonyme' | 'utilisateur'

export type WalletType = 'ESPECES' | 'VIRTUEL' | 'BANQUE'

export type LoginStatus = {
  loading: boolean
  message: string | null
  error: string | null
}
