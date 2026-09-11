import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export type WalletBalance = {
  wallet_id: string
  name: string
  type: 'ESPECES' | 'VIRTUEL' | 'BANQUE'
  balance: number
}