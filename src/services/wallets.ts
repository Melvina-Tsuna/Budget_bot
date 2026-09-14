import { supabase, type WalletBalance } from '../lib/supabase'
import { ensureUserRow } from './users'
import type { WalletType } from '../types'

export async function fetchWalletBalances(): Promise<WalletBalance[]> {
  const { data, error } = await supabase
    .from('wallet_balances')
    .select('*')
    .order('type')
    .order('name')

  if (error) throw error
  return data ?? []
}

export async function createWallet(name: string, type: WalletType): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Session invalide.')

  await ensureUserRow(user.id)

  const { error } = await supabase
    .from('wallets')
    .insert({ user_id: user.id, name, type })

  if (error) throw error
}
