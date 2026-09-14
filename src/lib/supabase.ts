import { createClient } from '@supabase/supabase-js'
import type { WalletType } from '../types'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export type WalletBalance = {
  wallet_id: string
  name: string
  type: WalletType
  balance: number
}