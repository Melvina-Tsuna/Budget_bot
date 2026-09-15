import { supabase } from '../lib/supabase'
import type { TransactionRecord } from '../types'

type TransactionRow = {
  id: string
  amount: number
  type: 'EXPENSE' | 'INCOME'
  category: string | null
  description: string | null
  occurred_on: string
  from_wallet: { name: string } | null
  to_wallet: { name: string } | null
}

export async function fetchRecentTransactions(limit = 10): Promise<TransactionRecord[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      id, amount, type, category, description, occurred_on,
      from_wallet:wallets!transactions_from_wallet_id_fkey(name),
      to_wallet:wallets!transactions_to_wallet_id_fkey(name)
    `)
    .eq('is_deleted', false)
    .in('type', ['EXPENSE', 'INCOME'])
    .order('occurred_on', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return ((data ?? []) as unknown as TransactionRow[]).map(row => ({
    id: row.id,
    amount: Number(row.amount),
    type: row.type,
    category: row.category,
    description: row.description,
    occurredOn: row.occurred_on,
    walletName: row.from_wallet?.name ?? row.to_wallet?.name ?? '—',
  }))
}

async function currentUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  if (!user) throw new Error('Session invalide.')
  return user.id
}

export async function createExpense(params: {
  walletId: string
  amount: number
  category: string
  description: string | null
}): Promise<void> {
  const userId = await currentUserId()

  const { error } = await supabase.from('transactions').insert({
    user_id: userId,
    amount: params.amount,
    type: 'EXPENSE',
    category: params.category,
    from_wallet_id: params.walletId,
    description: params.description,
    source: 'FORM',
  })

  if (error) throw error
}

export async function createIncome(params: {
  walletId: string
  amount: number
  description: string | null
}): Promise<void> {
  const userId = await currentUserId()

  const { error } = await supabase.from('transactions').insert({
    user_id: userId,
    amount: params.amount,
    type: 'INCOME',
    to_wallet_id: params.walletId,
    description: params.description,
    source: 'FORM',
  })

  if (error) throw error
}
